# 使用 Google Apps Script 實作 API 將資料寫入 Google 文件
這是一個使用 Google Apps Script (GAS) 實現 API 接口的程式碼，它可以接收 HTTP POST 請求中的資料（標題、連結、摘要、標籤），並將其新增到您指定的 Google 文件中。

`code.gs` 的檔案，其中包含 `doPost(e)` 函式，這是 Apps Script 作為 Web App API 的入口點。

### 檔案說明

這個單一檔案包含了所有必要的邏輯：

1.  **`doPost(e)` 函式**: 處理傳入的 POST 請求。
2.  **授權檢查**: 使用一個簡單的秘密金鑰 (`AUTH_TOKEN`) 來確保只有授權的請求才能寫入文件。
3.  **資料解析**: 從 JSON 格式的請求主體中提取資料。
4.  **文件操作**: 開啟指定的 Google 文件 ID，並將格式化的內容新增到文件的末尾。

請注意：您需要在程式碼中替換 `DOCUMENT_ID` 和 `AUTH_TOKEN` 的兩個預留位置。

### 使用指南 (重要步驟)

1.  **建立 Apps Script 專案：**

      * 開啟 Google 文件，點選「擴充功能」 -\> 「Apps Script」。
      * 將上面的程式碼貼到 `Code.gs` 檔案中，取代所有內容。

2.  **設定 ID 和令牌：**

      * 在程式碼中修改以下兩行：
          * `const DOCUMENT_ID = 'YOUR_DOCUMENT_ID_HERE';`
          * `const AUTH_TOKEN = 'YOUR_AUTH_TOKEN_HERE';`

3.  **部署為 Web 應用程式：**

      * 點選 Apps Script 編輯器右上角的「部署」 -\> 「新增部署作業」。
      * 選擇類型為 **「網頁應用程式 (Web App)」**。
      * 「執行身份」請選擇 **「我的帳戶 (您自己的電子郵件地址)」**。
      * 「存取權」請選擇 **「任何人 (Anyone)」** (因為它是公開 API，但我們有 `AUTH_TOKEN` 保護)。
      * 點擊「部署」。首次部署時，您需要授權 Apps Script 存取您的 Google 文件。
      * 部署成功後，您將獲得一個 **「Web 應用程式 URL」**。

4.  **測試 API (使用方法)：**

    您需要向這個 Web 應用程式 URL 發送一個 **POST** 請求。

      * **完整的 API URL 格式 (請替換為您的實際值)：**
        https://script.google.com/macros/s/AKfyc.../exec?token=YOUR_AUTH_TOKEN_HERE

      * **POST 請求的主體 (Body) 必須是 JSON 格式：**

        ```json
        {
            "title": "人工智慧趨勢分析報告",
            "link": "https://www.example.com/ai-report",
            "summary": "這是一份關於 2024 年人工智慧市場發展和技術突破的簡要概述，重點討論了大型語言模型的商業應用。",
            "tags": ["AI", "LLM", "技術趨勢", "報告"]
        }
        ```
