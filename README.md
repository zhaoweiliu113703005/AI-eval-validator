# AI 臨場教練｜AI Practice Coach（前端示意版）

純前端，**尚未串接任何 AI 模型**，畫面中的分析結果都是範例資料。
Front-end only. **No AI model is connected yet**; all analysis results are sample data.

## 檔案 / Files

```
index.html   頁面骨架 / page shell
style.css    樣式（自動支援深色模式）/ styles (with dark mode)
app.js       畫面切換、中英文、鏡頭 / routing, i18n, camera
```

## 目前能用的功能 / What works now

- 五個畫面：首頁簡介 → 設定 → 面試進行中／課堂報告 → 回饋報告（網址 `#intro`、`#setup`、`#interview`、`#present`、`#report`）
- 右上角中文／English 切換，會記住選擇
- 「開啟鏡頭」顯示真的鏡頭畫面（只在瀏覽器裡，不上傳）
- 「聽 1 分鐘放鬆音樂」目前只有畫面和倒數，沒有聲音；之後接上組員測試的音樂 API
- 「再唸一次題目」用瀏覽器內建語音朗讀
- 職缺說明、履歷可以上傳 PDF／Word（.docx）／TXT／Markdown（.md）／JPG／PNG 或拖曳檔案；檔案原樣交給後端，再由後端送給 Gemini 讀取
  Job description and resume accept PDF / Word (.docx) / TXT / Markdown (.md) / JPG / PNG (upload or drag and drop). Files are sent as-is to the backend, which passes them to Gemini.

## 給後端 / For the backend: `/api/start`

前端用 `buildStartForm()`（app.js）組好 `multipart/form-data`，可以在瀏覽器 console 執行 `buildStartForm()` 查看。
The front end builds a `multipart/form-data` body with `buildStartForm()` in app.js (try it in the browser console).

| Field | Value |
|---|---|
| `mode` | `interview` or `present` |
| `track` | field name in English, e.g. `Finance`, `Software / Data` |
| `job` | position name in English, or `other` |
| `lang` | `zh` or `en` — language for questions, follow-ups, and the report |
| `jd_text`, `resume_text` | text typed or pasted by the user (may be empty) |
| `jd_file`, `resume_file` | optional uploaded file (max 10 MB) |

Gemini reads PDF, JPG/PNG, and plain text files directly (send .txt and .md as `text/plain`). **It does not read .docx**, so convert .docx to text on the backend first (for example with `python-docx`).

## 部署到 Vercel / Deploy to Vercel

**方法一：GitHub（建議，組員可以一起改）**
1. 到 vercel.com 用 GitHub 帳號登入，按「Add New… → Project」。
2. 選 `AI-eval-validator` 這個 repository，Framework Preset 選 **Other**，Root Directory 維持預設（根目錄），按 Deploy。
3. 完成後會拿到一個 `xxx.vercel.app` 網址。之後每次推新的程式到 `main`，網站會自動更新。

**方法二：指令列**（在 repository 根目錄執行）
```
npm i -g vercel
vercel
```
照提示登入、按 Enter 用預設值即可；正式網址用 `vercel --prod`。

## 之後要串模型時 / Next steps

- 面試題目、追問、評分：把 `app.js` 裡的範例資料換成呼叫後端 API 的結果
- Gemini API 金鑰**不能**寫在前端，要放在後端（例如 Vercel 的 `api/` 函式，或組員的 Python 伺服器）
- 表情、眼神、心率分析可以直接在瀏覽器裡跑（MediaPipe、TensorFlow.js）
