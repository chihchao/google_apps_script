
function doPost(e) {
  const DOCUMENT_ID = 'document_id';
  const AUTH_TOKEN = 'auth_token';

  // 授權檢查
  const incomingToken = e && e.parameter ? e.parameter.token : null;
  if (!incomingToken || incomingToken !== AUTH_TOKEN) {
    return createJsonResponse(401, '錯誤：未經授權。請檢查您的令牌。');
  }

  // 資料格式檢查（容忍帶 charset）
  if (!e.postData || String(e.postData.type || '').indexOf('application/json') !== 0) {
    return createJsonResponse(400, '錯誤：請求資料必須是 JSON 格式。');
  }

  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (error) {
    return createJsonResponse(400, '錯誤：無法解析 JSON 格式。');
  }

  if (!data.title || !data.link || !data.summary || !data.tags) {
    return createJsonResponse(400, '錯誤：缺少必要的欄位（title, link, summary, tags）。');
  }

  try {
    const doc = DocumentApp.openById(DOCUMENT_ID);
    const body = doc.getBody();

    const tz = Session.getScriptTimeZone(); // 或直接 'Asia/Taipei'
    const now = new Date();
    const dateTime = Utilities.formatDate(now, tz, 'yyyy/MM/dd HH:mm:ss');

    body.appendHorizontalRule();

    const titleParagraph = body.appendParagraph(data.title);
    titleParagraph.setHeading(DocumentApp.ParagraphHeading.HEADING1);

    const timeParagraph = body.appendParagraph('紀錄時間: ' + dateTime);
    timeParagraph.setFontSize(10).setForegroundColor('#666666');

    const linkParagraph = body.appendParagraph('連結: ');
    linkParagraph.appendText(data.link).setLinkUrl(data.link).setForegroundColor('#1155cc');

    body.appendParagraph('摘要：\n' + data.summary);

    const tagsText = Array.isArray(data.tags) ? data.tags.join(', ') : String(data.tags);
    body.appendParagraph('標籤：' + tagsText);

    doc.saveAndClose();

    return createJsonResponse(200, '成功新增內容至 Google 文件。', {
      title: data.title,
      date: dateTime
    });

  } catch (err) {
    Logger.log('文件寫入錯誤: ' + err.toString());
    return createJsonResponse(500, '伺服器錯誤：無法寫入 Google 文件。', { error: err.toString() });
  }
}

function createJsonResponse(code, message, additionalData = {}) {
  const output = { status: code, message, ...additionalData };
  return ContentService.createTextOutput(JSON.stringify(output))
                       .setMimeType(ContentService.MimeType.JSON);
}
