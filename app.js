/* AI 臨場教練 — front-end prototype (no model connected; all results are sample data) */
(function () {
  "use strict";

  // ---------- text ----------
  const I18N = {
    zh: {
      brand: "AI 臨場教練", home: "首頁",
      introTitle: "AI 模擬面試與課堂報告教練",
      introBody: "上場之前，先在這裡練一次。AI 扮演面試官或台下聽眾，依你的履歷或簡報提問；同時在瀏覽器裡分析你的表情、眼神、心率與聲音，結束後給你一份逐題回饋報告。中文、英文都能練。",
      introStart: "開始練習", introSample: "看範例報告",
      introAlt: "示意圖：電腦上的模擬面試畫面，以及手機上的回饋報告",
      introFeat: [
        ["模擬面試", "AI 面試官依你的履歷出題，回答太空泛會追問，每題最多 2 次。"],
        ["課堂報告", "完整講完你的報告，AI 全程不打斷，結束後依內容提出 2–3 個問題。"],
        ["即時分析", "表情、眼神、心率與語速，和你暖身時的狀態比較，找出哪一題最緊張。"],
        ["放鬆一下", "偵測到你很緊張時，可以選擇先聽一分鐘放鬆音樂，再繼續練習。"]
      ],
      title: "上場之前，先在這裡練一次。",
      lede: "AI 扮演面試官或台下聽眾，同時分析你的表情、眼神、聲音與心率，結束後給你一份具體的回饋報告。",
      step1: "1　選擇練習模式", interview: "模擬面試", interviewDesc: "AI 面試官依你的履歷出題，回答不夠具體會追問。",
      present: "課堂報告", presentDesc: "完整講完你的報告，AI 全程不打斷，結束後再提問。",
      step2: "2　練習內容", track: "應徵領域", job: "應徵職缺", otherJob: "其他（依職缺說明出題）",
      // Each track: [name, jobs]. Keep the same order and length in zh and en so the selection survives a language switch.
      tracks: [
        ["金融", ["投資銀行部暑期實習", "商業銀行儲備幹部實習", "投信研究部實習", "金融科技新創 BD 實習", "會計師事務所財務顧問實習"]],
        ["企管／顧問／行銷", ["管理顧問實習", "行銷企劃實習", "儲備幹部（MA）", "產品經理實習"]],
        ["軟體／資料", ["軟體工程實習", "資料分析實習", "機器學習工程實習", "前端工程實習"]],
        ["人資／使用者研究", ["人力資源實習", "使用者研究實習", "市場調查研究員", "社會企業專案助理"]],
        ["公共政策／國際組織", ["政策分析實習", "智庫研究助理", "國際組織實習", "公共事務實習"]],
        ["國際商務", ["跨國企業業務實習", "國際行銷實習", "供應鏈管理實習", "海外市場拓展實習"]]
      ],
      jd: "職缺說明（選填）", jdPh: "貼上職缺的工作內容、條件要求與加分條件。",
      jdHint: "貼了之後，AI 會挑出這個職缺最重視的能力來出題與評分；沒貼就依領域和職缺名稱出題。",
      uploadFile: "上傳檔案", fileTypes: "PDF、Word（.docx）、TXT，也可以直接拖曳到文字框",
      reading: "正在讀取 {name}…", readDone: "已從 {name} 讀入文字，可以直接修改。", cut: "內容較長，只保留前 {n} 字。",
      errType: "只支援 PDF、Word（.docx）、TXT。舊版 .doc 請先另存成 .docx。", errBig: "檔案超過 10 MB。",
      errEmpty: "讀不到文字，可能是掃描檔或圖片，請直接貼上內容。", errLoad: "讀取失敗，請檢查網路，或改成直接貼上內容。",
      resume: "你的履歷", resumePh: "貼上學歷、實習、社團、競賽經歷，面試官會從這裡挑題目深入追問。",
      course: "課程與報告主題", coursePh: "例：深度學習概論／期中專題報告", upload: "上傳簡報", uploadHint: "支援 .pptx、.pdf，AI 會依內容提問",
      qcount: "報告後提問數", speakLang: "練習語言", speakLangHint: "回饋報告也會使用這個語言。",
      step3: "3　分析項目", relaxOpt: "偵測到我很緊張時，提示我可以聽一段放鬆音樂",
      privacy: "鏡頭畫面只在你的瀏覽器裡分析，不會上傳；只有文字（履歷、職缺說明、逐字稿）會送給 AI 出題與評分。",
      startI: "開始模擬面試", startP: "開始報告練習",
      sensors: [["表情辨識", "自訓練 CNN"], ["眼神接觸", "MediaPipe 臉部偵測"], ["心率偵測", "rPPG，只用鏡頭"], ["語音分析", "語速、贅字、緊張程度"]],
      on: "已開啟",
      end: "結束並看報告",
      steps: ["自我介紹", "應徵動機", "行為題", "專業知識", "履歷深入"],
      local: "影像只在本機分析", hrTag: "額頭區域：心率偵測", recording: "作答中", camOn: "開啟鏡頭", camOff: "關閉鏡頭", camFail: "無法開啟鏡頭，請檢查瀏覽器權限。",
      followTag: "第 3 題・追問", question: "你提到期限很趕，最後的結果是什麼？你怎麼知道這個做法有效？",
      liveTx: "即時逐字稿", answer: "那時候離交件只剩兩天，我先把工作拆成三塊，然後……",
      stop: "停止作答", repeat: "再唸一次題目",
      alertTitle: "你好像有點緊張", alertBody: "心率比暖身時高出約 20%，聲音也偏急。要不要先聽一分鐘放鬆音樂，再繼續回答？",
      listen: "聽 1 分鐘放鬆音樂", keepGoing: "繼續面試",
      musicTitle: "放鬆一下", musicBody: "跟著音樂慢慢吸氣、吐氣。結束後系統會再量一次心率，看看有沒有降下來。", back: "回到面試", showAlert: "顯示緊張提示（展示用）",
      liveTitle: "即時分析", tension: "綜合緊張程度", high: "偏高", tensionNote: "綜合表情、心率與聲音，和你暖身時的狀態比較",
      metrics: [["眼神接觸", "72%", "看鏡頭的時間比例", 0], ["表情", "緊繃", "表情辨識 CNN", 1], ["心率", "96", "bpm・暖身時 78", 1], ["語速", "偏快", "每分鐘 268 字", 1]],
      courseName: "深度學習概論・期中專題報告", presentSub: "課堂報告模式",
      phase1: "報告中", phase2: "AI 提問",
      slideNo: "投影片 4 / 12", slideTitle: "系統架構：哪些是我們自己訓練的模型", slideBody: "表情辨識與語音情緒兩個 CNN 自行訓練，Gemini、Whisper、MediaPipe 則串接現成模型。",
      prev: "上一張", next: "下一張", elapsed: "已報告", suggest: "建議 8 分鐘",
      listenTitle: "AI 正在聆聽，不會打斷你", listenBody: "請把報告完整講完。AI 會記下你的內容和投影片重點，結束後再提問。",
      done: "我講完了，開始提問", qaTitle: "AI 根據你的報告提出 3 個問題", redo: "重新報告", answerBtn: "開始回答",
      qa: [["問題 1・目前", "你提到表情辨識是自己訓練的，訓練資料的「緊張」標籤是怎麼定義的？"], ["問題 2", "如果使用者在報告時一直移動，心率偵測的準確度會受到什麼影響？"], ["問題 3", "你們怎麼驗證放鬆音樂真的有效果？"]],
      pMetrics: [["眼神接觸", "64%"], ["照念投影片", "2 次"], ["語速", "適中"], ["心率", "91 bpm"]],
      pNote: "「照念投影片」比對你說的話和投影片文字的重複程度。",
      reportHead: "回饋報告", reportSub: "投資銀行部暑期實習・模擬面試", again: "再練一次",
      total: "總分", delta: "比上次 +0.8",
      summary: "內容有具體經驗，結構清楚；主要可以加強的是講出結果與數字，以及第 3 題開始的緊張感。",
      stats: [["眼神接觸", "71%", "目標 70% 以上"], ["平均語速", "偏快", "每分鐘 248 字"], ["贅字", "14 次", "「然後」最多"], ["平均心率", "89", "bpm・暖身 78"]],
      scoreAria: "總分 7.4 分（滿分 10 分），比上次進步 0.8 分", statOk: "達標", statWarn: "留意",
      curveTitle: "緊張程度與心率變化",
      chartHint: "滑過圖表，或點一下圖表後用鍵盤左右鍵，可以看每個時間點的數值。",
      chartTension: "綜合緊張程度", chartTensionSub: "0–100・綜合表情、心率與聲音，和暖身時比較",
      chartHr: "心率", chartHrSub: "bpm・虛線是暖身時的心率",
      peak: "最高", warmup: "暖身", musicShort: "音樂",
      tensionAlt: "緊張程度折線圖：第 3 題升到最高 88，聽完放鬆音樂後降到 44",
      hrAlt: "心率折線圖：第 3 題升到最高 98 bpm，聽完放鬆音樂後回到 86 bpm",
      tableShow: "查看資料表", tblTime: "時間", tblPhase: "階段",
      curveNote: "第 3 題（行為題）被追問時緊張程度最高，心率升到 98 bpm；聽完一分鐘放鬆音樂後，心率回到 86 bpm，後面兩題維持穩定。",
      perQ: "逐題回饋", good: "做得好的地方", fix: "可以改進", youSaid: "你說的原句", better: "改進版本參考",
      fillNote: "〔請填入〕的部分請換成你自己的真實經驗，系統不會替你編造數字。",
      qs: [
        ["第 1 題・自我介紹", "自我介紹", "7.8", "請簡單自我介紹。", "開場先講學校科系與想應徵的方向，條理清楚，時間控制得宜。", "我平常也滿喜歡投資的", "「喜歡投資」太籠統，可以換成一段具體經驗，讓面試官記得你。", "我在大二開始〔請填入：具體的投資或研究經驗〕，這讓我對〔請填入：產業或主題〕特別感興趣。", ["結構清楚", "可再具體"]],
        ["第 2 題・應徵動機", "為什麼選投資銀行", "7.2", "為什麼想走投資銀行？為什麼是我們？", "有提到喜歡高強度的團隊工作，也連結到過去的社團經驗。", "因為貴公司很有名", "沒有說明你對這間公司做過什麼研究，理由太容易套用到任何公司。", "我注意到貴公司近年在〔請填入：具體交易或業務〕的表現，這和我在〔請填入：經歷〕培養的能力相符。", ["缺少公司研究"]],
        ["第 3 題・行為題（追問 1 次）", "期限壓力下完成任務", "6.6", "分享一次你在很緊的期限下完成任務的經驗。", "情境交代清楚，也說明了你如何把工作拆成三個部分分工，行動描述具體。", "最後大家都覺得做得還不錯", "結果太模糊。面試官想知道具體成果：有沒有準時交件？品質如何被肯定？被追問後仍沒有補上數字。", "我們最後提前〔請填入：提前幾小時〕完成，報告拿到〔請填入：成績或評價〕。這次之後，我養成在期限前先排出檢查時間的習慣。", ["STAR：缺少結果（R）", "語速偏快", "心率高峰"]],
        ["第 4 題・財金專業", "三表連動", "7.5", "折舊增加 10 元，三張財務報表會怎麼變？", "正確說出淨利下降與現金流量表加回折舊，觀念正確。", "現金應該也會減少吧", "忽略了稅盾效果：折舊增加會讓所得稅減少，現金其實是增加的。", "淨利減少〔稅後金額〕，但折舊是非現金費用要加回，加上稅盾，現金反而增加〔折舊 × 稅率〕。", ["觀念大致正確", "漏掉稅盾"]],
        ["第 5 題・履歷深入", "個案競賽的貢獻", "7.9", "你在個案競賽中的具體貢獻是什麼？", "清楚說出自己負責財務模型，以及團隊最後的名次。", "我主要是幫忙做一些分析", "「幫忙」會讓貢獻聽起來很小，可以直接說明你負責的部分與成果。", "我負責建立〔請填入：模型或分析名稱〕，找出〔請填入：關鍵發現〕，成為我們提案的核心論點。", ["有成果", "用詞可更主動"]]
      ],
      demo: "示意版本：目前尚未串接 AI 模型，畫面中的分析結果皆為範例資料。"
    },
    en: {
      brand: "AI Practice Coach", home: "Home",
      introTitle: "AI coach for mock interviews and class presentations",
      introBody: "Practice here before the real thing. The AI plays your interviewer or your audience and asks questions based on your resume or slides. Meanwhile, your browser analyzes your expressions, eye contact, heart rate, and voice. At the end you get question-by-question feedback. Practice in Chinese or English.",
      introStart: "Start practicing", introSample: "See a sample report",
      introAlt: "Illustration: a mock interview screen on a computer and a feedback report on a phone",
      introFeat: [
        ["Mock interview", "An AI interviewer asks about your resume and follows up on vague answers, up to 2 times per question."],
        ["Class presentation", "Give your full talk without interruption. The AI then asks 2–3 questions about your content."],
        ["Live analysis", "Expression, eye contact, heart rate, and pace, compared with your warm-up to find where you got nervous."],
        ["Take a breath", "When you seem very nervous, you can choose a one-minute music break before you continue."]
      ],
      title: "Practice here before the real thing.",
      lede: "AI plays your interviewer or your audience while analyzing your expressions, eye contact, voice, and heart rate. You get a specific feedback report at the end.",
      step1: "1　Choose a mode", interview: "Mock interview", interviewDesc: "An AI interviewer asks questions based on your resume and follows up on vague answers.",
      present: "Class presentation", presentDesc: "Give your full presentation without interruption. The AI asks questions afterward.",
      step2: "2　Practice details", track: "Field", job: "Position", otherJob: "Other (questions based on the job description)",
      tracks: [
        ["Finance", ["Investment Banking Summer Intern", "Commercial Bank Management Associate", "Asset Management Research Intern", "Fintech Startup BD Intern", "Financial Advisory (Big Four) Intern"]],
        ["Business / Consulting / Marketing", ["Management Consulting Intern", "Marketing Planning Intern", "Management Associate (MA)", "Product Manager Intern"]],
        ["Software / Data", ["Software Engineering Intern", "Data Analyst Intern", "Machine Learning Engineering Intern", "Front-end Engineering Intern"]],
        ["HR / User Research", ["Human Resources Intern", "User Research Intern", "Market Research Analyst", "Social Enterprise Project Assistant"]],
        ["Public Policy / International Organizations", ["Policy Analyst Intern", "Think Tank Research Assistant", "International Organization Intern", "Public Affairs Intern"]],
        ["International Business", ["International Sales Intern", "Global Marketing Intern", "Supply Chain Management Intern", "Overseas Market Development Intern"]]
      ],
      jd: "Job description (optional)", jdPh: "Paste the responsibilities, requirements, and nice-to-haves from the job posting.",
      jdHint: "If you paste it, the AI focuses its questions and scoring on what this job values most. Otherwise it uses the field and position name.",
      uploadFile: "Upload file", fileTypes: "PDF, Word (.docx), or TXT. You can also drag a file onto the text box.",
      reading: "Reading {name}…", readDone: "Text loaded from {name}. You can edit it.", cut: "It was long, so only the first {n} characters were kept.",
      errType: "Only PDF, Word (.docx), and TXT are supported. Save old .doc files as .docx first.", errBig: "The file is larger than 10 MB.",
      errEmpty: "No text found. It may be a scanned file or an image, so please paste the text instead.", errLoad: "Couldn’t read the file. Check your connection, or paste the text instead.",
      resume: "Your resume", resumePh: "Paste your education, internships, clubs, and competitions. The interviewer will pick from these.",
      course: "Course and topic", coursePh: "e.g. Intro to Deep Learning / Midterm project", upload: "Upload slides", uploadHint: ".pptx or .pdf; the AI asks questions based on them",
      qcount: "Questions after presentation", speakLang: "Practice language", speakLangHint: "Your feedback report will be in this language too.",
      step3: "3　Analysis", relaxOpt: "When I seem very nervous, offer me a short relaxing music break",
      privacy: "Camera video is analyzed only in your browser and never uploaded. Only text (resume, job description, transcript) is sent to the AI for questions and scoring.",
      startI: "Start mock interview", startP: "Start presentation practice",
      sensors: [["Facial expression", "Self-trained CNN"], ["Eye contact", "MediaPipe face detection"], ["Heart rate", "rPPG, camera only"], ["Voice analysis", "Pace, fillers, nervousness"]],
      on: "On",
      end: "End and see report",
      steps: ["Intro", "Motivation", "Behavioral", "Technical", "Resume"],
      local: "Video analyzed on this device only", hrTag: "Forehead: heart rate", recording: "Answering", camOn: "Turn on camera", camOff: "Turn off camera", camFail: "Couldn’t open the camera. Check your browser permissions.",
      followTag: "Question 3 · Follow-up", question: "You mentioned a tight deadline. What was the final outcome, and how do you know it worked?",
      liveTx: "Live transcript", answer: "We only had two days left, so I first split the work into three parts, and then…",
      stop: "Stop answering", repeat: "Repeat question",
      alertTitle: "You seem a bit nervous", alertBody: "Your heart rate is about 20% above your warm-up level, and your voice sounds rushed. Want a one-minute music break before you continue?",
      listen: "Play 1 min of relaxing music", keepGoing: "Keep going",
      musicTitle: "Take a breath", musicBody: "Breathe slowly with the music. Afterward, the system checks your heart rate again to see if it came down.", back: "Back to interview", showAlert: "Show nervousness alert (demo)",
      liveTitle: "Live analysis", tension: "Overall nervousness", high: "High", tensionNote: "Combines expression, heart rate, and voice, compared with your warm-up",
      metrics: [["Eye contact", "72%", "Time looking at camera", 0], ["Expression", "Tense", "Expression CNN", 1], ["Heart rate", "96", "bpm · warm-up 78", 1], ["Pace", "Fast", "162 words per min", 1]],
      courseName: "Intro to Deep Learning · Midterm Project", presentSub: "Presentation mode",
      phase1: "Presenting", phase2: "AI questions",
      slideNo: "Slide 4 / 12", slideTitle: "System architecture: which models we trained ourselves", slideBody: "We trained two CNNs for facial expression and speech emotion, and integrated Gemini, Whisper, and MediaPipe.",
      prev: "Previous slide", next: "Next slide", elapsed: "Elapsed", suggest: "8 min suggested",
      listenTitle: "The AI is listening and won’t interrupt", listenBody: "Give your full presentation. The AI notes your content and slide highlights, then asks questions at the end.",
      done: "I’m done, start Q&A", qaTitle: "The AI has 3 questions about your presentation", redo: "Present again", answerBtn: "Start answering",
      qa: [["Question 1 · Current", "You said the expression model is self-trained. How did you define the “nervous” label in your data?"], ["Question 2", "If the user keeps moving while presenting, how does that affect heart rate accuracy?"], ["Question 3", "How will you verify that the relaxing music actually works?"]],
      pMetrics: [["Eye contact", "64%"], ["Reading slides", "2 times"], ["Pace", "Good"], ["Heart rate", "91 bpm"]],
      pNote: "“Reading slides” compares what you say with the text on your slides.",
      reportHead: "Feedback report", reportSub: "Investment Banking Summer Intern · Mock interview", again: "Practice again",
      total: "Overall", delta: "+0.8 vs. last time",
      summary: "Your answers include concrete experiences and clear structure. Focus on stating results with numbers, and on the nervousness that starts at question 3.",
      stats: [["Eye contact", "71%", "Target 70%+"], ["Avg. pace", "Fast", "158 words per min"], ["Fillers", "14", "“like” most often"], ["Avg. heart rate", "89", "bpm · warm-up 78"]],
      scoreAria: "Overall score 7.4 out of 10, up 0.8 from last time", statOk: "On target", statWarn: "Watch",
      curveTitle: "Nervousness and heart rate",
      chartHint: "Hover over a chart, or click it and use the left/right arrow keys, to see each moment.",
      chartTension: "Overall nervousness", chartTensionSub: "0–100 · expression, heart rate, and voice vs. warm-up",
      chartHr: "Heart rate", chartHrSub: "bpm · dashed line is your warm-up rate",
      peak: "Peak", warmup: "Warm-up", musicShort: "Music",
      tensionAlt: "Line chart of nervousness: peaks at 88 on question 3, drops to 44 after the music break",
      hrAlt: "Line chart of heart rate: peaks at 98 bpm on question 3, back to 86 bpm after the music break",
      tableShow: "Show data table", tblTime: "Time", tblPhase: "Stage",
      curveNote: "Nervousness peaked during the follow-up on question 3 (behavioral), with heart rate at 98 bpm. After a one-minute music break it returned to 86 bpm and stayed steady.",
      perQ: "Question by question", good: "What went well", fix: "What to improve", youSaid: "What you said", better: "Suggested version",
      fillNote: "Replace the [Fill in] parts with your own real experience. The system never invents numbers for you.",
      qs: [
        ["Q1 · Self-introduction", "Self-introduction", "7.8", "Please briefly introduce yourself.", "You opened with your school, major, and target role. Clear and well timed.", "I also kind of like investing", "“Like investing” is too general. Replace it with one concrete experience the interviewer will remember.", "In my second year I started [Fill in: a specific investing or research experience], which got me interested in [Fill in: industry or topic].", ["Clear structure", "Be more specific"]],
        ["Q2 · Motivation", "Why investment banking", "7.2", "Why investment banking, and why us?", "You mentioned enjoying intense teamwork and linked it to your club experience.", "because your company is famous", "No sign of research on this firm. The reason could apply to any company.", "I noticed your firm’s recent work on [Fill in: a specific deal or business], which matches the skills I built in [Fill in: experience].", ["No company research"]],
        ["Q3 · Behavioral (1 follow-up)", "Finishing under a tight deadline", "6.6", "Tell me about a time you finished a task under a very tight deadline.", "You set up the situation clearly and explained how you split the work into three parts. Your actions were specific.", "in the end everyone thought it went pretty well", "The result is vague. The interviewer wants concrete outcomes: did you deliver on time, and how was the quality recognized? You still didn’t add numbers after the follow-up.", "We finished [Fill in: how many hours] early, and the report received [Fill in: grade or feedback]. Since then, I always schedule review time before a deadline.", ["STAR: missing result (R)", "Fast pace", "Heart rate peak"]],
        ["Q4 · Finance", "Linking the three statements", "7.5", "If depreciation rises by 10, how do the three statements change?", "You correctly said net income falls and depreciation is added back in the cash flow statement.", "cash should go down too, right", "You missed the tax shield: higher depreciation lowers taxes, so cash actually increases.", "Net income falls by [after-tax amount], but depreciation is non-cash and added back; with the tax shield, cash rises by [depreciation × tax rate].", ["Mostly correct", "Missed tax shield"]],
        ["Q5 · Resume", "Your role in a case competition", "7.9", "What exactly did you contribute in the case competition?", "You clearly said you built the financial model and shared the team’s final ranking.", "I mainly helped with some analysis", "“Helped” makes your role sound small. State what you owned and what it achieved.", "I built [Fill in: model or analysis], which revealed [Fill in: key finding] and became the core of our pitch.", ["Has results", "Use stronger verbs"]]
      ],
      demo: "Prototype: no AI model is connected yet. All analysis results shown are sample data."
    }
  };

  // ---------- state ----------
  const state = {
    lang: loadLang(),
    mode: "interview",
    panel: "alert",       // alert | music | none
    phase: "talk",        // talk | qa
    sel: 2,
    // Setup form values, kept here so re-rendering (mode / language switch) doesn't wipe what the user typed.
    // These are what the backend /api/start call will need.
    form: { track: 0, job: 0, jd: "", resume: "", speakLang: "" },  // speakLang "" = follow UI language; report uses the same language
    camStream: null,
    camError: false
  };
  let t = I18N[state.lang];
  let timerId = null, seconds = 0;
  let music = null;

  function loadLang() {
    try { return localStorage.getItem("coach-lang") === "en" ? "en" : "zh"; } catch (e) { return "zh"; }
  }
  function saveLang(v) { try { localStorage.setItem("coach-lang", v); } catch (e) { /* ignore */ } }
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const route = () => (location.hash.replace("#", "") || "intro");
  const fmt = (s) => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");

  // ---------- shared pieces ----------
  const faceSvg = (small) => `
    <svg width="${small ? 110 : 220}" height="${small ? 130 : 260}" viewBox="0 0 220 260" fill="none" aria-hidden="true">
      <ellipse cx="110" cy="118" rx="70" ry="90" stroke="#5E7A94" stroke-width="${small ? 3 : 2}" stroke-dasharray="4 6"/>
      <circle cx="84" cy="104" r="6" stroke="#9CC3E0" stroke-width="2"/><circle cx="136" cy="104" r="6" stroke="#9CC3E0" stroke-width="2"/>
      <circle cx="84" cy="104" r="2" fill="#9CC3E0"/><circle cx="136" cy="104" r="2" fill="#9CC3E0"/>
      <path d="M92 160c10 8 26 8 36 0" stroke="#5E7A94" stroke-width="2" stroke-linecap="round"/>
      ${small ? "" : '<rect x="70" y="58" width="80" height="22" rx="4" stroke="#E0A458" stroke-width="2"/>'}
    </svg>`;

  function camBlock(small) {
    const live = !!state.camStream;
    return `
      <div class="cam ${small ? "small" : ""}">
        ${live ? '<video id="camVideo" autoplay playsinline muted></video>' : ""}
        <div class="overlay">${faceSvg(small)}</div>
        <div class="tags"><span class="tag">${esc(t.local)}</span>${small ? "" : `<span class="tag hr">${esc(t.hrTag)}</span>`}</div>
        ${small ? "" : `<div class="rec"><span class="rec-dot"></span>${esc(t.recording)}　<span id="timer">${fmt(seconds)}</span></div>`}
        <div class="cam-btn"><button type="button" class="btn small" data-action="cam">${esc(live ? t.camOff : t.camOn)}</button></div>
      </div>
      ${state.camError ? `<p class="note" role="alert">${esc(t.camFail)}</p>` : ""}`;
  }

  // ---------- views ----------
  // Landing illustration: interview screen on a monitor + feedback report on a phone.
  // Colors come from CSS classes (.ia-*) so it follows light/dark mode.
  const introArt = () => `
    <svg viewBox="0 0 560 400" role="img" aria-label="${esc(t.introAlt)}">
      <circle class="ia-blob" cx="250" cy="190" r="175"/>
      <path class="ia-stand" d="M222 310h56l14 48h-84z"/>
      <rect class="ia-stand" x="168" y="356" width="164" height="10" rx="5"/>
      <rect class="ia-body" x="20" y="20" width="460" height="292" rx="18"/>
      <rect class="ia-screen" x="36" y="36" width="428" height="256" rx="8"/>
      <rect class="ia-cam" x="52" y="52" width="262" height="160" rx="8"/>
      <ellipse cx="183" cy="128" rx="34" ry="44" fill="none" stroke="#5E7A94" stroke-width="2" stroke-dasharray="4 6"/>
      <circle cx="170" cy="120" r="3" fill="#9CC3E0"/><circle cx="196" cy="120" r="3" fill="#9CC3E0"/>
      <path d="M174 148c6 5 12 5 18 0" fill="none" stroke="#5E7A94" stroke-width="2" stroke-linecap="round"/>
      <rect x="62" y="62" width="74" height="14" rx="7" fill="rgba(255,255,255,.18)"/>
      <circle cx="296" cy="196" r="5" fill="#FF6B5E"/>
      <rect class="ia-card" x="52" y="222" width="262" height="54" rx="8"/>
      <circle class="ia-avatar" cx="72" cy="240" r="9"/>
      <rect class="ia-ink" x="88" y="234" width="150" height="7" rx="3.5"/>
      <rect class="ia-line" x="88" y="250" width="200" height="6" rx="3"/>
      <rect class="ia-line" x="88" y="262" width="120" height="6" rx="3"/>
      <rect class="ia-warn" x="326" y="52" width="122" height="64" rx="8"/>
      <rect class="ia-warn-ink" x="338" y="64" width="70" height="7" rx="3.5"/>
      <rect class="ia-line" x="338" y="80" width="98" height="5" rx="2.5"/>
      <rect class="ia-warn-bar" x="338" y="96" width="56" height="12" rx="4"/>
      <rect class="ia-card" x="326" y="126" width="122" height="150" rx="8"/>
      <rect class="ia-tile" x="336" y="136" width="48" height="32" rx="5"/>
      <rect class="ia-tile" x="390" y="136" width="48" height="32" rx="5"/>
      <rect class="ia-tile" x="336" y="176" width="48" height="32" rx="5"/>
      <rect class="ia-tile" x="390" y="176" width="48" height="32" rx="5"/>
      <rect class="ia-track" x="336" y="222" width="102" height="8" rx="4"/>
      <rect class="ia-warn-bar" x="336" y="222" width="78" height="8" rx="4"/>
      <rect class="ia-line" x="336" y="242" width="80" height="5" rx="2.5"/>
      <rect class="ia-line" x="336" y="254" width="60" height="5" rx="2.5"/>
      <rect class="ia-body" x="420" y="150" width="136" height="236" rx="20"/>
      <rect class="ia-screen" x="430" y="170" width="116" height="200" rx="10"/>
      <rect class="ia-ink" x="468" y="158" width="40" height="4" rx="2"/>
      <circle class="ia-ring-bg" cx="488" cy="214" r="26"/>
      <circle class="ia-ring" cx="488" cy="214" r="26" stroke-dasharray="121 164" transform="rotate(-90 488 214)"/>
      <text class="ia-score" x="488" y="220" text-anchor="middle">7.4</text>
      <rect class="ia-ink" x="440" y="252" width="96" height="6" rx="3"/>
      <rect class="ia-line" x="440" y="264" width="70" height="6" rx="3"/>
      <polyline class="ia-chart" points="440,302 456,296 472,290 488,274 504,288 520,292 536,290"/>
      <rect class="ia-card" x="440" y="316" width="44" height="26" rx="5"/>
      <rect class="ia-card" x="492" y="316" width="44" height="26" rx="5"/>
      <rect class="ia-avatar" x="440" y="350" width="96" height="8" rx="4"/>
    </svg>`;

  function viewIntro() {
    return `
    <div class="wrap">
      <section class="intro">
        <div class="intro-art">${introArt()}</div>
        <div class="intro-text">
          <h1>${esc(t.introTitle)}</h1>
          <p>${esc(t.introBody)}</p>
          <div class="intro-acts">
            <a class="btn" href="#report">${esc(t.introSample)}</a>
            <a class="btn dark" href="#setup">${esc(t.introStart)}</a>
          </div>
        </div>
      </section>
      <div class="grid4 intro-feats">
        ${t.introFeat.map((f) => `<div class="card"><b>${esc(f[0])}</b><p class="note">${esc(f[1])}</p></div>`).join("")}
      </div>
      <p class="demo-flag">${esc(t.demo)}</p>
    </div>`;
  }

  // ---------- file upload -> text (runs in the browser; only the extracted text is kept) ----------
  // pdf.js and mammoth.js are loaded from the CDN only when someone actually uploads a file.
  const LIBS = {
    pdf: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
    pdfWorker: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",
    docx: "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js"
  };
  const scriptCache = {};
  function loadScript(src) {
    if (!scriptCache[src]) {
      scriptCache[src] = new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.onload = resolve;
        s.onerror = () => { delete scriptCache[src]; reject(new Error("load")); };
        document.head.appendChild(s);
      });
    }
    return scriptCache[src];
  }

  async function fileToText(file) {
    const name = file.name.toLowerCase();
    if (name.endsWith(".txt") || name.endsWith(".md")) return file.text();
    if (name.endsWith(".pdf")) {
      await loadScript(LIBS.pdf);
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = LIBS.pdfWorker;
      const pdf = await window.pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      const pages = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const content = await (await pdf.getPage(i)).getTextContent();
        pages.push(content.items.map((it) => it.str + (it.hasEOL ? "\n" : "")).join(""));
      }
      return pages.join("\n\n");
    }
    if (name.endsWith(".docx")) {
      await loadScript(LIBS.docx);
      return (await window.mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })).value;
    }
    throw new Error("type");
  }

  async function handleUpload(key, file) {
    const st = $(key + "Status"), ta = document.querySelector(`textarea[data-field="${key}"]`);
    if (!file || !ta) return;
    const say = (msg, bad) => { if (st) { st.textContent = msg; st.classList.toggle("err", !!bad); } };
    if (file.size > 10 * 1024 * 1024) return say(t.errBig, true);
    say(t.reading.replace("{name}", file.name));
    try {
      let text = (await fileToText(file))
        .replace(/\r/g, "").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
      if (!text) return say(t.errEmpty, true);
      const max = Number(ta.getAttribute("maxlength")) || Infinity;
      const cut = text.length > max;
      text = text.slice(0, max);
      ta.value = text;
      state.form[key] = text;
      say(t.readDone.replace("{name}", file.name) + (cut ? " " + t.cut.replace("{n}", max) : ""));
    } catch (e) {
      say(e.message === "type" ? t.errType : t.errLoad, true);
    }
  }

  const uploadRow = (key) => `
    <div class="upl">
      <button type="button" class="btn small" data-action="pick" data-value="${key}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V4M7.5 8.5L12 4l4.5 4.5"/><path d="M4 15v4h16v-4"/></svg>${esc(t.uploadFile)}
      </button>
      <input type="file" id="${key}File" data-upload="${key}" accept=".pdf,.docx,.txt,.md" hidden>
      <span class="muted" id="${key}Status" role="status">${esc(t.fileTypes)}</span>
    </div>`;

  function jobOptions() {
    const f = state.form;
    return t.tracks[f.track][1].concat(t.otherJob)
      .map((j, i) => `<option value="${i}"${i === f.job ? " selected" : ""}>${esc(j)}</option>`).join("");
  }

  function viewSetup() {
    const isI = state.mode === "interview";
    const f = state.form;
    return `
    <div class="wrap">
      <div class="hero"><h1>${esc(t.title)}</h1><p>${esc(t.lede)}</p></div>
      <div class="row">
        <section class="col-main" style="gap:28px">
          <div class="stack" style="gap:12px">
            <h2 class="sec-title">${esc(t.step1)}</h2>
            <div class="grid2">
              <button type="button" class="mode ${isI ? "on" : ""}" data-action="mode" data-value="interview" aria-pressed="${isI}">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19c0-3 2.2-5 5-5s5 2 5 5"/><path d="M14 18.5c.3-2.3 1.6-3.8 3.5-3.8 1.9 0 3.2 1.5 3.5 3.8"/></svg>
                <b>${esc(t.interview)}</b><span>${esc(t.interviewDesc)}</span>
              </button>
              <button type="button" class="mode ${!isI ? "on" : ""}" data-action="mode" data-value="present" aria-pressed="${!isI}">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 20h8M7 12l3-3 2 2 4-4"/></svg>
                <b>${esc(t.present)}</b><span>${esc(t.presentDesc)}</span>
              </button>
            </div>
          </div>
          <div class="stack" style="gap:12px">
            <h2 class="sec-title">${esc(t.step2)}</h2>
            <div class="card stack">
              ${isI ? `
                <div class="grid2">
                  <label class="field">${esc(t.track)}<select data-field="track">${t.tracks.map((tr, i) => `<option value="${i}"${i === f.track ? " selected" : ""}>${esc(tr[0])}</option>`).join("")}</select></label>
                  <label class="field">${esc(t.job)}<select data-field="job" id="jobSel">${jobOptions()}</select></label>
                </div>
                <div class="field">
                  <label for="jdText">${esc(t.jd)}</label>
                  <textarea id="jdText" data-field="jd" data-drop rows="5" maxlength="6000" placeholder="${esc(t.jdPh)}">${esc(f.jd)}</textarea>
                  ${uploadRow("jd")}
                  <span class="note" style="font-weight:400">${esc(t.jdHint)}</span>
                </div>
                <div class="field">
                  <label for="resumeText">${esc(t.resume)}</label>
                  <textarea id="resumeText" data-field="resume" data-drop rows="5" maxlength="8000" placeholder="${esc(t.resumePh)}">${esc(f.resume)}</textarea>
                  ${uploadRow("resume")}
                </div>
              ` : `
                <label class="field">${esc(t.course)}<input placeholder="${esc(t.coursePh)}"></label>
                <div class="drop">
                  <label class="btn small" for="slideFile">${esc(t.upload)}</label>
                  <input type="file" id="slideFile" accept=".pptx,.pdf" hidden>
                  <span class="muted" id="slideName">${esc(t.uploadHint)}</span>
                </div>
                <label class="field">${esc(t.qcount)}<select><option>2</option><option selected>3</option><option>4</option></select></label>
              `}
              <div class="grid2">
                <label class="field">${esc(t.speakLang)}<select data-field="speakLang">${[["zh", "中文"], ["en", "English"]].map(([v, n]) => `<option value="${v}"${v === (f.speakLang || state.lang) ? " selected" : ""}>${n}</option>`).join("")}</select><span class="note" style="font-weight:400">${esc(t.speakLangHint)}</span></label>
              </div>
            </div>
          </div>
        </section>
        <aside class="col-side">
          <h2 class="sec-title">${esc(t.step3)}</h2>
          <div class="card" style="padding:6px 20px">
            ${t.sensors.map((s) => `<div class="sensor"><div><b>${esc(s[0])}</b><span class="muted">${esc(s[1])}</span></div><span class="state">${esc(t.on)}</span></div>`).join("")}
          </div>
          <label class="check"><input type="checkbox" checked><span>${esc(t.relaxOpt)}</span></label>
          <p class="note">${esc(t.privacy)}</p>
          <a class="btn dark big" href="${isI ? "#interview" : "#present"}">${esc(isI ? t.startI : t.startP)}</a>
        </aside>
      </div>
      <p class="demo-flag">${esc(t.demo)}</p>
    </div>`;
  }

  function viewInterview() {
    const side =
      state.panel === "alert" ? `
        <div class="alert" role="status">
          <b>${esc(t.alertTitle)}</b><p>${esc(t.alertBody)}</p>
          <div class="acts"><button type="button" class="btn warn small" data-action="music">${esc(t.listen)}</button><button type="button" class="btn small" data-action="dismiss">${esc(t.keepGoing)}</button></div>
        </div>` :
      state.panel === "music" ? `
        <div class="music">
          <b style="font-size:16px">${esc(t.musicTitle)}</b><p>${esc(t.musicBody)}</p>
          <div class="bar"><div id="musicBar"></div></div>
          <div style="display:flex;justify-content:space-between;font-size:13px;color:#DCE8F1"><span id="musicTime">0:00 / 1:00</span></div>
          <button type="button" class="btn small" data-action="dismiss">${esc(t.back)}</button>
        </div>` :
      `<button type="button" class="btn small" data-action="showAlert">${esc(t.showAlert)}</button>`;
    return `
    <div class="wrap" style="padding-top:24px">
      <div class="page-head">
        <div class="pills">${t.steps.map((s, i) => `<span class="pill ${i < 2 ? "done" : i === 2 ? "now" : ""}">${i + 1} ${esc(s)}</span>`).join("")}</div>
        <a class="btn small" href="#report">${esc(t.end)}</a>
      </div>
      <div class="row">
        <section class="col-main">
          ${camBlock(false)}
          <div class="card stack">
            <div class="ask"><span class="avatar">AI</span><div><span class="muted">${esc(t.followTag)}</span><p>${esc(t.question)}</p></div></div>
            <div class="tx"><span class="muted" style="display:block">${esc(t.liveTx)}</span>${esc(t.answer)}</div>
            <div class="acts"><button type="button" class="btn dark"><span class="rec-dot"></span>${esc(t.stop)}</button><button type="button" class="btn" data-action="speak">${esc(t.repeat)}</button></div>
          </div>
        </section>
        <aside class="col-side">
          ${side}
          <div class="card stack">
            <h2 style="font-size:15px">${esc(t.liveTitle)}</h2>
            <div class="grid2" style="gap:10px">
              ${t.metrics.map((m) => `<div class="metric"><span class="muted">${esc(m[0])}</span><span class="v ${m[3] ? "warn" : ""}">${esc(m[1])}</span><span class="muted" style="font-size:12px">${esc(m[2])}</span></div>`).join("")}
            </div>
            <div class="stack" style="gap:6px">
              <div style="display:flex;justify-content:space-between;font-size:13px"><span class="muted">${esc(t.tension)}</span><b style="color:var(--warn)">${esc(t.high)}</b></div>
              <div class="meter"><div style="width:78%"></div></div>
              <span class="muted" style="font-size:12px">${esc(t.tensionNote)}</span>
            </div>
          </div>
        </aside>
      </div>
      <p class="demo-flag">${esc(t.demo)}</p>
    </div>`;
  }

  function viewPresent() {
    const talk = state.phase === "talk";
    return `
    <div class="wrap" style="padding-top:24px">
      <div class="page-head">
        <div class="pills"><span class="pill ${talk ? "now" : "done"}">1 ${esc(t.phase1)}</span><span class="pill ${talk ? "" : "now"}">2 ${esc(t.phase2)}</span></div>
        <a class="btn small" href="#report">${esc(t.end)}</a>
      </div>
      <div class="row">
        <section class="col-main">
          <div class="slide">
            <div class="slide-body"><small>${esc(t.slideNo)}</small><strong>${esc(t.slideTitle)}</strong><span>${esc(t.slideBody)}</span></div>
            <div class="slide-foot">
              <div class="acts">
                <button type="button" class="icon-btn" aria-label="${esc(t.prev)}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg></button>
                <button type="button" class="icon-btn" aria-label="${esc(t.next)}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></button>
              </div>
              <span class="muted" style="font-size:14px">${esc(t.elapsed)} <span id="timer">${fmt(seconds)}</span>・${esc(t.suggest)}</span>
            </div>
          </div>
          ${talk ? `
            <div class="card" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:16px">
              <div style="max-width:520px"><b style="font-size:16px">${esc(t.listenTitle)}</b><p class="note" style="font-size:14px;color:var(--ink-2)">${esc(t.listenBody)}</p></div>
              <button type="button" class="btn dark" data-action="toQa">${esc(t.done)}</button>
            </div>` : `
            <div class="card stack">
              <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px"><b style="font-size:16px">${esc(t.qaTitle)}</b><button type="button" class="btn small" data-action="toTalk">${esc(t.redo)}</button></div>
              ${t.qa.map((q, i) => `<div class="q ${i === 0 ? "on" : ""}"><span class="muted">${esc(q[0])}</span><span>${esc(q[1])}</span></div>`).join("")}
              <div><button type="button" class="btn dark"><span class="rec-dot"></span>${esc(t.answerBtn)}</button></div>
            </div>`}
        </section>
        <aside class="col-side">
          ${camBlock(true)}
          <div class="card stack" style="gap:12px">
            <h2 style="font-size:15px">${esc(t.liveTitle)}</h2>
            ${t.pMetrics.map((m) => `<div class="kv"><span style="color:var(--ink-2)">${esc(m[0])}</span><b>${esc(m[1])}</b></div>`).join("")}
            <p class="note" style="font-size:12px">${esc(t.pNote)}</p>
          </div>
        </aside>
      </div>
      <p class="demo-flag">${esc(t.demo)}</p>
    </div>`;
  }

  // ---------- report charts (sample data until the backend is connected) ----------
  // One sample every 30 s. PHASE: 1–5 = question number, 0 = relax-music break.
  const SERIES = {
    stepSec: 30,
    tension: [30, 34, 40, 46, 72, 88, 84, 60, 44, 46, 49, 52, 50],
    hr: [80, 82, 85, 88, 95, 98, 97, 91, 86, 86, 87, 88, 87],
    music: [6, 8],
    segs: [[1, 0, 2], [2, 2, 4], [3, 4, 6], [0, 6, 8], [4, 8, 10], [5, 10, 12]]
  };
  const PHASE = [1, 1, 2, 2, 3, 3, 0, 0, 4, 4, 5, 5, 5];
  const phaseName = (p) => (p ? "Q" + p : t.musicShort);
  // Two separate charts on purpose: never put two different units on one y-axis.
  const CHARTS = [
    { key: "tension", min: 0, max: 100, ticks: [0, 50, 100] },
    { key: "hr", min: 70, max: 100, ticks: [70, 85, 100], baseline: 78 }
  ];
  // [icon, status] for each entry in t.stats; status 0 = on target, 1 = watch
  const STAT_META = [["eye", 0], ["pace", 1], ["filler", 1], ["heart", 1]];
  const ICONS = {
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    pace: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 18l4-5"/>',
    filler: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    ok: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    warn: '<path d="M12 6v8M12 18.5h.01"/>'
  };
  const icon = (k, size) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${size < 16 ? 3 : 1.8}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k]}</svg>`;

  // Ticked radial gauge: 270° arc, filled ticks go light -> dark in the accent hue (one hue, no rainbow).
  function gaugeSvg(score) {
    const N = 45, on = Math.round((score / 10) * N), c = 110;
    let ticks = "";
    for (let k = 0; k < N; k++) {
      const a = ((135 + (k * 270) / (N - 1)) * Math.PI) / 180;
      const p = (r) => `${(c + r * Math.cos(a)).toFixed(1)}`;
      const q = (r) => `${(c + r * Math.sin(a)).toFixed(1)}`;
      const mix = k < on ? ` style="stroke:color-mix(in oklab, var(--accent) ${Math.round(30 + (70 * k) / Math.max(1, on - 1))}%, var(--accent-ring))"` : "";
      ticks += `<line class="${k < on ? "g-on" : "g-off"}" x1="${p(86)}" y1="${q(86)}" x2="${p(104)}" y2="${q(104)}"${mix}/>`;
    }
    return `<svg viewBox="0 0 220 220" aria-hidden="true">${ticks}</svg>`;
  }

  function statTile(s, meta) {
    const warn = meta[1] === 1;
    return `
      <div class="stat">
        <div class="stat-top">
          <span class="stat-ic">${icon(meta[0], 20)}</span>
          <span class="status ${warn ? "warn" : "ok"}">${icon(warn ? "warn" : "ok", 12)}${esc(warn ? t.statWarn : t.statOk)}</span>
        </div>
        <span class="stat-v">${esc(s[1])}</span>
        <span class="stat-l">${esc(s[0])}</span>
        <span class="muted" style="font-size:12px">${esc(s[2])}</span>
      </div>`;
  }

  const chartCard = (key, title, sub) => `
    <div class="ch-card">
      <div><b>${esc(title)}</b><span class="muted" style="display:block">${esc(sub)}</span></div>
      <div class="ch-box" data-chart="${key}"><div class="ch-plot"></div><div class="ch-tip" hidden></div></div>
    </div>`;

  // Charts are drawn after render at the container's real pixel width, so text never scales down.
  let charts = [], cur = -1;
  function drawReportCharts() {
    charts = [];
    document.querySelectorAll("[data-chart]").forEach((box) => {
      const c = CHARTS.find((k) => k.key === box.dataset.chart);
      if (c) charts.push(drawChart(box, c));
    });
  }

  function drawChart(box, c) {
    const plot = box.querySelector(".ch-plot"), tip = box.querySelector(".ch-tip");
    const w = Math.max(260, Math.floor(plot.clientWidth)), h = 210, L = 34, R = 12, T = 28, B = 30;
    const vals = SERIES[c.key], n = vals.length;
    const x = (i) => L + (i * (w - L - R)) / (n - 1);
    const y = (v) => T + (1 - (v - c.min) / (c.max - c.min)) * (h - T - B);
    const pk = vals.indexOf(Math.max(...vals));
    const line = vals.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
    const [m0, m1] = SERIES.music;
    plot.innerHTML = `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" tabindex="0" role="img" aria-label="${esc(c.key === "hr" ? t.hrAlt : t.tensionAlt)}">
        <rect class="ch-music" x="${x(m0)}" y="${T - 12}" width="${x(m1) - x(m0)}" height="${h - B - T + 12}" rx="6"/>
        ${c.ticks.map((v) => `<line class="ch-gl" x1="${L}" x2="${w - R}" y1="${y(v)}" y2="${y(v)}"/><text class="ch-tick" x="${L - 8}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join("")}
        ${c.baseline ? `<line class="ch-base" x1="${L}" x2="${w - R}" y1="${y(c.baseline)}" y2="${y(c.baseline)}"/><text class="ch-tick ch-halo" x="${w - R}" y="${y(c.baseline) - 6}" text-anchor="end">${esc(t.warmup)} ${c.baseline}</text>` : ""}
        ${SERIES.segs.map(([p, a, b]) => `<text class="ch-tick" x="${(x(a) + x(b)) / 2}" y="${h - 8}" text-anchor="middle">${esc(phaseName(p))}</text>`).join("")}
        <path class="ch-area" d="M${x(0)},${y(c.min)} L${line.replace(/ /g, " L")} L${x(n - 1)},${y(c.min)} Z"/>
        <polyline class="ch-line" points="${line}"/>
        <circle class="ch-dot" cx="${x(pk)}" cy="${y(vals[pk])}" r="4.5"/>
        <text class="ch-label ch-halo" x="${x(pk)}" y="${y(vals[pk]) - 12}" text-anchor="middle">${esc(t.peak)} ${vals[pk]}</text>
        <g class="ch-cross" style="display:none"><line y1="${T - 12}" y2="${h - B}"/><circle class="ch-dot" r="5"/></g>
      </svg>`;
    const svg = plot.querySelector("svg");
    const ch = { svg, tip, x, y, c, w };
    const clampI = (i) => Math.max(0, Math.min(n - 1, i));
    svg.addEventListener("pointermove", (e) => {
      const px = e.clientX - svg.getBoundingClientRect().left;
      showAt(clampI(Math.round(((px - L) * (n - 1)) / (w - L - R))), ch);
    });
    svg.addEventListener("pointerleave", hideCross);
    svg.addEventListener("focus", () => showAt(cur < 0 ? pk : cur, ch));
    svg.addEventListener("blur", hideCross);
    svg.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      showAt(clampI((cur < 0 ? pk : cur) + (e.key === "ArrowRight" ? 1 : -1)), ch);
    });
    return ch;
  }

  // Crosshair moves in both charts together; one tooltip (in the hovered chart) lists both values.
  function showAt(i, owner) {
    cur = i;
    charts.forEach((ch) => {
      const g = ch.svg.querySelector(".ch-cross"), cx = ch.x(i);
      g.style.display = "";
      const l = g.querySelector("line");
      l.setAttribute("x1", cx); l.setAttribute("x2", cx);
      const d = g.querySelector("circle");
      d.setAttribute("cx", cx); d.setAttribute("cy", ch.y(SERIES[ch.c.key][i]));
      ch.tip.hidden = ch !== owner;
    });
    const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
    const row = (val, name) => { const r = el("div", "ch-tip-r"); r.append(el("i"), el("b", null, val), el("span", null, name)); return r; };
    const tip = owner.tip;
    tip.replaceChildren(
      el("div", "ch-tip-h", `${phaseName(PHASE[i])} · ${fmt(i * SERIES.stepSec)}`),
      row(String(SERIES.tension[i]), t.chartTension),
      row(SERIES.hr[i] + " bpm", t.chartHr)
    );
    let left = owner.x(i) + 14;
    if (left + tip.offsetWidth > owner.w) left = owner.x(i) - 14 - tip.offsetWidth;
    tip.style.left = Math.max(0, left) + "px";
  }
  function hideCross() {
    charts.forEach((ch) => { ch.svg.querySelector(".ch-cross").style.display = "none"; ch.tip.hidden = true; });
  }

  function viewReport() {
    const q = t.qs[state.sel];
    const rows = SERIES.tension.map((v, i) => `<tr><td>${fmt(i * SERIES.stepSec)}</td><td>${esc(phaseName(PHASE[i]))}</td><td>${v}</td><td>${SERIES.hr[i]}</td></tr>`).join("");
    return `
    <div class="wrap stack report" style="gap:24px">
      <div class="page-head">
        <div><h1 class="page-title">${esc(t.reportHead)}</h1><span class="muted" style="font-size:14px">${esc(t.reportSub)}</span></div>
        <a class="btn dark small" href="#setup">${esc(t.again)}</a>
      </div>
      <section class="card verdict">
        <div class="gauge" role="img" aria-label="${esc(t.scoreAria)}">
          ${gaugeSvg(7.4)}
          <div class="gauge-c" aria-hidden="true">
            <div><span class="n">7.4</span><span class="of">/10</span></div>
            <span class="muted">${esc(t.total)}</span>
            <span class="delta">${esc(t.delta)}</span>
          </div>
        </div>
        <div class="stack" style="flex:1 1 420px;min-width:0;gap:18px">
          <p class="summary">${esc(t.summary)}</p>
          <div class="grid4">${t.stats.map((s, i) => statTile(s, STAT_META[i])).join("")}</div>
        </div>
      </section>

      <section class="card stack" style="gap:18px">
        <div class="stack" style="gap:4px"><h2 style="font-size:18px">${esc(t.curveTitle)}</h2><p class="note">${esc(t.chartHint)}</p></div>
        <div class="ch-pair">
          ${chartCard("tension", t.chartTension, t.chartTensionSub)}
          ${chartCard("hr", t.chartHr, t.chartHrSub)}
        </div>
        <p class="note" style="font-size:14px;color:var(--ink-2)">${esc(t.curveNote)}</p>
        <details class="tbl">
          <summary>${esc(t.tableShow)}</summary>
          <div class="tbl-scroll"><table>
            <thead><tr><th>${esc(t.tblTime)}</th><th>${esc(t.tblPhase)}</th><th>${esc(t.chartTension)}</th><th>${esc(t.chartHr)} (bpm)</th></tr></thead>
            <tbody>${rows}</tbody>
          </table></div>
        </details>
      </section>

      <section class="stack" style="gap:12px">
        <h2 style="font-size:18px">${esc(t.perQ)}</h2>
        <div class="row" style="gap:20px">
          <div class="stack" style="flex:1 1 300px;min-width:0;gap:8px">
            ${t.qs.map((x, i) => `<button type="button" class="qbtn ${i === state.sel ? "on" : ""}" data-action="sel" data-value="${i}" aria-pressed="${i === state.sel}"><span class="qbtn-l"><span class="muted" style="display:block">${esc(x[0])}</span><span style="font-weight:600">${esc(x[1])}</span><span class="qbar" aria-hidden="true"><i style="width:${Number(x[2]) * 10}%"></i></span></span><b>${esc(x[2])}</b></button>`).join("")}
          </div>
          <div class="card stack" style="flex:999 1 520px;min-width:0;padding:24px;gap:18px">
            <div><span class="muted">${esc(q[0])}</span><h3 style="font-size:18px;line-height:1.5">${esc(q[3])}</h3></div>
            <div class="stack" style="gap:6px"><h4 class="h-ok" style="margin:0">${esc(t.good)}</h4><p style="margin:0">${esc(q[4])}</p></div>
            <div class="stack" style="gap:6px"><h4 class="h-warn" style="margin:0">${esc(t.fix)}</h4>
              <div class="box stack" style="gap:6px"><span class="muted" style="font-size:14px">${esc(t.youSaid)}</span><span style="font-weight:500">「${esc(q[5])}」</span><span>${esc(q[6])}</span></div>
            </div>
            <div class="stack" style="gap:6px"><h4 class="h-blue" style="margin:0">${esc(t.better)}</h4><p class="box blue" style="margin:0;line-height:1.8">${esc(q[7])}</p><span class="muted" style="font-size:12px">${esc(t.fillNote)}</span></div>
            <div class="chips">${q[8].map((c) => `<span class="chip">${esc(c)}</span>`).join("")}</div>
          </div>
        </div>
      </section>
      <p class="demo-flag">${esc(t.demo)}</p>
    </div>`;
  }

  // ---------- top bar: logo, an explicit Home button (hidden on the home page), language switch ----------
  function renderTopbar() {
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t[el.dataset.i18n]; });
    $("homeBtn").hidden = route() === "intro";
    document.querySelectorAll("[data-lang]").forEach((b) => {
      b.classList.toggle("on", b.dataset.lang === state.lang);
      b.setAttribute("aria-pressed", b.dataset.lang === state.lang);
    });
  }

  // ---------- render ----------
  function render() {
    const r = route();
    const views = { intro: viewIntro, setup: viewSetup, interview: viewInterview, present: viewPresent, report: viewReport };
    const view = views[r] || viewIntro;
    document.documentElement.lang = state.lang === "en" ? "en" : "zh-Hant";
    renderTopbar();
    $("app").innerHTML = view();
    const v = $("camVideo");
    if (v && state.camStream) v.srcObject = state.camStream;
    const f = $("slideFile");
    if (f) f.addEventListener("change", () => { if (f.files[0]) $("slideName").textContent = f.files[0].name; });
    if (r === "report") drawReportCharts();
  }

  let resizeId = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeId);
    resizeId = setTimeout(() => { if (route() === "report") drawReportCharts(); }, 150);
  });

  function onRouteChange() {
    const r = route();
    stopMusic();
    if (r !== "interview" && r !== "present") stopCamera();
    clearInterval(timerId);
    seconds = 0;
    if (r === "interview" || r === "present") {
      if (r === "interview") state.panel = "alert";
      if (r === "present") state.phase = "talk";
      timerId = setInterval(() => { seconds++; const el = $("timer"); if (el) el.textContent = fmt(seconds); }, 1000);
    }
    render();
    window.scrollTo(0, 0);
  }

  // ---------- camera ----------
  async function toggleCamera() {
    if (state.camStream) { stopCamera(); render(); return; }
    try {
      state.camStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      state.camError = false;
    } catch (e) {
      state.camError = true;
    }
    render();
  }
  function stopCamera() {
    if (state.camStream) state.camStream.getTracks().forEach((tr) => tr.stop());
    state.camStream = null;
  }

  // ---------- relax break (visual only; music will come from the team's music API later) ----------
  function startMusic() {
    stopMusic();
    let s = 0;
    const tick = setInterval(() => {
      s++;
      const bar = $("musicBar"), tm = $("musicTime");
      if (bar) bar.style.width = Math.min(100, (s / 60) * 100) + "%";
      if (tm) tm.textContent = fmt(s) + " / 1:00";
      if (s >= 60) { stopMusic(); state.panel = "none"; render(); }
    }, 1000);
    music = { tick };
  }
  function stopMusic() {
    if (!music) return;
    clearInterval(music.tick);
    music = null;
  }

  // ---------- read question aloud ----------
  function speak() {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t.question);
    u.lang = state.lang === "en" ? "en-US" : "zh-TW";
    speechSynthesis.speak(u);
  }

  // ---------- events ----------
  document.addEventListener("click", (e) => {
    const langBtn = e.target.closest("[data-lang]");
    if (langBtn) {
      state.lang = langBtn.dataset.lang;
      t = I18N[state.lang];
      saveLang(state.lang);
      render();
      return;
    }
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const a = el.dataset.action;
    if (a === "mode") { state.mode = el.dataset.value; render(); }
    else if (a === "cam") toggleCamera();
    else if (a === "music") { state.panel = "music"; render(); startMusic(); }
    else if (a === "dismiss") { stopMusic(); state.panel = "none"; render(); }
    else if (a === "showAlert") { state.panel = "alert"; render(); }
    else if (a === "toQa") { state.phase = "qa"; render(); }
    else if (a === "toTalk") { state.phase = "talk"; render(); }
    else if (a === "sel") { state.sel = Number(el.dataset.value); render(); }
    else if (a === "speak") speak();
    else if (a === "pick") { const inp = $(el.dataset.value + "File"); if (inp) inp.click(); }
  });

  // File chosen with the upload button
  document.addEventListener("change", (e) => {
    const key = e.target.dataset && e.target.dataset.upload;
    if (!key) return;
    const file = e.target.files[0];
    e.target.value = "";  // allow choosing the same file again
    handleUpload(key, file);
  });

  // Drag a file onto the job description / resume text box (plain text drops still work normally)
  const dropTarget = (e) => (e.target.closest ? e.target.closest("textarea[data-drop]") : null);
  document.addEventListener("dragover", (e) => {
    const ta = dropTarget(e);
    if (ta) { e.preventDefault(); ta.classList.add("dragging"); }
  });
  document.addEventListener("dragleave", (e) => { const ta = dropTarget(e); if (ta) ta.classList.remove("dragging"); });
  document.addEventListener("drop", (e) => {
    const ta = dropTarget(e);
    if (!ta) return;
    ta.classList.remove("dragging");
    if (!e.dataTransfer.files.length) return;
    e.preventDefault();
    handleUpload(ta.dataset.field, e.dataTransfer.files[0]);
  });

  // Setup form: remember values; changing the field swaps the position list in place (no re-render).
  document.addEventListener("input", (e) => {
    const k = e.target.dataset && e.target.dataset.field;
    if (!k) return;
    if (k === "track") {
      state.form.track = Number(e.target.value);
      state.form.job = 0;
      const js = $("jobSel");
      if (js) js.innerHTML = jobOptions();
    } else if (k === "job") state.form.job = Number(e.target.value);
    else state.form[k] = e.target.value;
  });

  window.addEventListener("hashchange", onRouteChange);
  onRouteChange();
})();
