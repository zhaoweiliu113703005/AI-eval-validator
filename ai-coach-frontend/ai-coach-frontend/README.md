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

- 四個畫面：設定 → 面試進行中／課堂報告 → 回饋報告（網址 `#setup`、`#interview`、`#present`、`#report`）
- 右上角中文／English 切換，會記住選擇
- 「開啟鏡頭」顯示真的鏡頭畫面（只在瀏覽器裡，不上傳）
- 「聽 1 分鐘放鬆音樂」目前只有畫面和倒數，沒有聲音；之後接上組員測試的音樂 API
- 「再唸一次題目」用瀏覽器內建語音朗讀

## 部署到 Vercel / Deploy to Vercel

**方法一：GitHub（建議，組員可以一起改）**
1. 在 GitHub 建一個新的 repository，把這三個檔案（和 README）上傳上去。
2. 到 vercel.com 用 GitHub 帳號登入，按「Add New… → Project」。
3. 選剛剛的 repository，Framework Preset 選 **Other**，其他設定都不用改，按 Deploy。
4. 完成後會拿到一個 `xxx.vercel.app` 網址。之後每次推新的程式到 GitHub，網站會自動更新。

**方法二：指令列**
```
npm i -g vercel
cd ai-coach-frontend
vercel
```
照提示登入、按 Enter 用預設值即可；正式網址用 `vercel --prod`。

## 本機預覽 / Local preview

鏡頭需要 HTTPS 或 localhost，直接雙擊 index.html 可能打不開鏡頭。可以用：
```
python -m http.server 8000
```
再打開 http://localhost:8000

## 之後要串模型時 / Next steps

- 面試題目、追問、評分：把 `app.js` 裡的範例資料換成呼叫後端 API 的結果
- Gemini API 金鑰**不能**寫在前端，要放在後端（例如 Vercel 的 `api/` 函式，或組員的 Python 伺服器）
- 表情、眼神、心率分析可以直接在瀏覽器裡跑（MediaPipe、TensorFlow.js）
