這是一個使用 Google Apps Script 建立 API，並透過 POST 請求將 JSON 資料寫入 Google 試算表的腳本。

請在 Google 試算表中建立一個新的 Apps Script 專案，在一個名為 `Code.gs` 的腳本檔案將內容貼入。

**重要步驟：**

1.  **準備試算表：** 請確保您的 Google 試算表中有一個名為 **`紀錄`** 的工作表，並且第一列（A1 到 G1）的標題與 JSON 欄位順序一致（`Date`, `Item`, `Amount`, `Payment`, `Category`, `Store`, `Memo`）。
2.  **部署腳本：** 完成貼上腳本後，您需要將此腳本部署為網路應用程式 (Web App) 才能獲得 API 網址。

### 後續步驟：部署為 Web App

1.  **儲存腳本：** 點擊 Apps Script 編輯器上方的儲存圖標。
2.  **部署：**
    * 點擊右上角的 **「部署」** (Deploy) 按鈕。
    * 選擇 **「新增部署作業」** (New deployment)。
3.  **配置部署設定：**
    * 選擇類型為 **「網路應用程式」** (Web app)。
    * **執行身分 (Execute as)**：選擇 **「我」** (My self) (這是預設值)。
    * **存取權限 (Who has access)**：選擇 **「任何人」** (Anyone)。
4.  **部署與授權：**
    * 點擊 **「部署」**。
    * 第一次部署時，系統會要求您授權腳本存取 Google 試算表。請點擊 **「授權存取」** 並完成授權流程。
5.  **取得 URL：**
    * 部署完成後，會出現一個彈出視窗，其中包含 **「網址」** (Web app URL)。複製這個 URL。
    * 這個 URL 就是您 API 的終端點 (Endpoint)，您可以使用任何 HTTP 客戶端（如 Postman、cURL 或您自己的程式碼）向其發送 POST 請求。

現在您就可以使用複製的網址，以 POST 方式傳送您提供的 JSON 資料來寫入試算表了！
