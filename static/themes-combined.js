/**
 * themes-1.js
 * 极简风格渲染函数（3种）：swiss / zen / scandi
 * 用于税务知识竞答SPA
 * 每个函数: (screen, state, QUESTIONS, hooks) => { html, css }
 */

/* ============================================================
 * 风格1: Swiss — 瑞士极简主义
 * 12列网格 · 8px数学间距 · 超大编号 · 纯文字选项 · 方块进度条
 * ============================================================ */

function render_swiss(screen, state, QUESTIONS, hooks) {
  const q = QUESTIONS[state.currentIdx] || QUESTIONS[0];
  const total = QUESTIONS.length;
  const progressCount = 12; // 12 small squares
  const filledSquares = Math.round((state.currentIdx / total) * progressCount);

  /* ---------- CSS ---------- */
  const css = `
.swiss-root{
  --sw-bg:#fafaf8; --sw-fg:#1a1a1a; --sw-accent:#2d6a4f;
  --sw-muted:#888; --sw-border:#e0ddd8; --sw-correct:#2d6a4f; --sw-wrong:#c0392b;
  --sw-gap:8px;
  font-family:'Inter','Noto Serif SC',sans-serif;
  background:var(--sw-bg); color:var(--sw-fg);
  min-height:100vh; margin:0;
}
.swiss-grid{max-width:960px;margin:0 auto;padding:48px 24px;}

/* Header */
.swiss-header{display:flex;align-items:stretch;gap:0;margin-bottom:40px;}
.swiss-header-bar{width:3px;background:var(--sw-fg);margin-right:24px;}
.swiss-header-text{display:flex;flex-direction:column;justify-content:center;}
.swiss-title{font-size:32px;font-weight:800;letter-spacing:-0.5px;line-height:1.1;}
.swiss-subtitle{font-size:13px;color:var(--sw-muted);margin-top:6px;font-family:'Noto Serif SC',serif;letter-spacing:1px;}

/* Progress — 12 squares */
.swiss-progress{display:flex;gap:var(--sw-gap);margin-bottom:48px;}
.swiss-sq{width:calc((100% - 11 * 8px) / 12);height:6px;background:var(--sw-border);}
.swiss-sq.on{background:var(--sw-fg);}
.swiss-progress-label{font-size:11px;color:var(--sw-muted);margin-left:12px;letter-spacing:2px;text-transform:uppercase;}

/* Start screen */
.swiss-start-hero{margin-bottom:56px;}
.swiss-start-num{font-size:96px;font-weight:800;line-height:1;letter-spacing:-4px;margin-bottom:16px;}
.swiss-start-desc{font-size:18px;line-height:1.6;max-width:520px;color:#333;font-family:'Noto Serif SC',serif;}
.swiss-start-meta{display:flex;gap:48px;margin-bottom:40px;}
.swiss-start-meta-item{display:flex;flex-direction:column;}
.swiss-start-meta-num{font-size:24px;font-weight:700;}
.swiss-start-meta-label{font-size:11px;color:var(--sw-muted);text-transform:uppercase;letter-spacing:2px;margin-top:4px;}

/* Button */
.swiss-btn{
  display:inline-block;padding:14px 40px;background:var(--sw-fg);color:#fff;
  font-family:'Inter',sans-serif;font-size:14px;font-weight:600;letter-spacing:1px;
  text-transform:uppercase;border:none;cursor:pointer;transition:background .15s;
  text-decoration:none;
}
.swiss-btn:hover{background:var(--sw-accent);}
.swiss-btn.outline{background:transparent;color:var(--sw-fg);border:2px solid var(--sw-fg);padding:12px 38px;}
.swiss-btn.outline:hover{background:var(--sw-fg);color:#fff;}
.swiss-btn:disabled{background:#ccc;cursor:not-allowed;}

/* Quiz screen */
.swiss-quiz-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:32px;}
.swiss-qnum{font-size:80px;font-weight:800;line-height:.9;letter-spacing:-3px;}
.swiss-qnum-sub{font-size:14px;color:var(--sw-muted);margin-top:4px;letter-spacing:2px;text-transform:uppercase;}
.swiss-qtype{font-size:12px;color:var(--sw-accent);font-weight:600;letter-spacing:2px;text-transform:uppercase;text-align:right;}
.swiss-qtype-pill{display:inline-block;border:1.5px solid var(--sw-accent);padding:4px 12px;margin-bottom:8px;}

.swiss-question{font-size:24px;font-weight:600;line-height:1.5;margin-bottom:40px;font-family:'Noto Serif SC',serif;}

/* Options — pure text + underline hover, A/B/C/D superscript */
.swiss-options{list-style:none;padding:0;margin:0 0 40px;}
.swiss-option{
  display:flex;align-items:baseline;gap:16px;padding:16px 0;
  border-bottom:1px solid var(--sw-border);cursor:pointer;transition:padding-left .2s;
}
.swiss-option:hover{padding-left:8px;}
.swiss-option:last-child{border-bottom:none;}
.swiss-option-label{font-size:11px;font-weight:700;color:var(--sw-muted);vertical-align:super;}
.swiss-option-text{font-size:18px;line-height:1.4;flex:1;border-bottom:1px solid transparent;transition:border-color .2s;}
.swiss-option:hover .swiss-option-text{border-bottom-color:var(--sw-fg);}
.swiss-option.selected .swiss-option-text{border-bottom-color:var(--sw-accent);color:var(--sw-accent);}
.swiss-option.selected .swiss-option-label{color:var(--sw-accent);}

/* revealed states */
.swiss-option.correct .swiss-option-text{color:var(--sw-correct);font-weight:600;}
.swiss-option.correct .swiss-option-label{color:var(--sw-correct);}
.swiss-option.wrong .swiss-option-text{color:var(--sw-wrong);text-decoration:line-through;}
.swiss-option.wrong .swiss-option-label{color:var(--sw-wrong);}
.swiss-option .swiss-option-mark{font-size:14px;font-weight:700;margin-left:auto;}
.swiss-option.correct .swiss-option-mark::after{content:'✓';color:var(--sw-correct);}
.swiss-option.wrong .swiss-option-mark::after{content:'✗';color:var(--sw-wrong);}

.swiss-explanation{
  border-left:3px solid var(--sw-accent);padding:12px 24px;margin:0 0 32px;
  font-size:15px;line-height:1.7;color:#444;background:rgba(45,106,79,.04);
  font-family:'Noto Serif SC',serif;
}
.swiss-explanation-label{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--sw-accent);margin-bottom:6px;display:block;}

.swiss-actions{display:flex;gap:16px;align-items:center;margin-top:24px;}
.swiss-back-link{font-size:13px;color:var(--sw-muted);cursor:pointer;text-decoration:underline;text-transform:uppercase;letter-spacing:1px;}
.swiss-back-link:hover{color:var(--sw-fg);}

/* Result screen */
.swiss-result-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-bottom:48px;}
.swiss-score-ring{position:relative;width:200px;height:200px;margin:0 auto;}
.swiss-score-ring svg{transform:rotate(-90deg);}
.swiss-score-ring-bg{fill:none;stroke:var(--sw-border);stroke-width:6;}
.swiss-score-ring-fg{fill:none;stroke:var(--sw-accent);stroke-width:6;stroke-linecap:square;transition:stroke-dashoffset 1s;}
.swiss-score-ring-text{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;}
.swiss-score-ring-num{font-size:48px;font-weight:800;line-height:1;}
.swiss-score-ring-label{font-size:11px;color:var(--sw-muted);letter-spacing:2px;text-transform:uppercase;margin-top:4px;}

.swiss-result-stats{display:flex;flex-direction:column;gap:20px;}
.swiss-stat-row{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid var(--sw-border);padding-bottom:12px;}
.swiss-stat-label{font-size:13px;color:var(--sw-muted);letter-spacing:1px;text-transform:uppercase;}
.swiss-stat-val{font-size:24px;font-weight:700;}

.swiss-result-review{margin-top:40px;}
.swiss-review-title{font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;}
.swiss-review-item{display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid var(--sw-border);font-size:14px;}
.swiss-review-item-num{font-size:18px;font-weight:700;width:32px;}
.swiss-review-item-q{flex:1;color:#555;}
.swiss-review-item-mark{font-size:16px;font-weight:700;}
.swiss-review-item-mark.ok{color:var(--sw-accent);}
.swiss-review-item-mark.no{color:var(--sw-wrong);}

@keyframes swiss-fade{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
.swiss-animate{animation:swiss-fade .3s ease;}
`;

  /* ---------- HTML per screen ---------- */
  let html = '';

  if (screen === 'start') {
    html = `
<div class="swiss-root">
  <div class="swiss-grid swiss-animate">
    <div class="swiss-header">
      <div class="swiss-header-bar"></div>
      <div class="swiss-header-text">
        <div class="swiss-title">税务知识竞答</div>
        <div class="swiss-subtitle">Tax Knowledge Quiz · 瑞士极简</div>
      </div>
    </div>

    <div class="swiss-start-hero">
      <div class="swiss-start-num">00</div>
      <div class="swiss-start-desc">通过精确的题目设计，检验你对税务法规的理解。每道题都有详尽解析，帮助你查漏补缺。</div>
    </div>

    <div class="swiss-start-meta">
      <div class="swiss-start-meta-item">
        <div class="swiss-start-meta-num">${total}</div>
        <div class="swiss-start-meta-label">题目总数</div>
      </div>
      <div class="swiss-start-meta-item">
        <div class="swiss-start-meta-num">∞</div>
        <div class="swiss-start-meta-label">答题时长</div>
      </div>
      <div class="swiss-start-meta-item">
        <div class="swiss-start-meta-num">12</div>
        <div class="swiss-start-meta-label">进度区块</div>
      </div>
    </div>

    <button class="swiss-btn" onclick="${hooks.startQuiz}">开始竞答 →</button>
  </div>
</div>`;
  }

  else if (screen === 'quiz') {
    const squares = Array.from({length: progressCount}, (_, i) =>
      `<div class="swiss-sq ${i < filledSquares ? 'on' : ''}"></div>`
    ).join('');

    const numStr = String(state.currentIdx + 1).padStart(2, '0');

    let optionsHtml = q.options.map((opt, i) => {
      const letter = String.fromCharCode(65 + i);
      let cls = 'swiss-option';
      if (state.selected === i) cls += ' selected';
      if (state.revealed) {
        if (q.answer.includes(i)) cls += ' correct';
        if (state.selected === i && !q.answer.includes(i)) cls += ' wrong';
      }
      return `<li class="${cls}" onclick="${state.revealed ? '' : hooks.selectOption(i)}">
        <span class="swiss-option-label">${letter}</span>
        <span class="swiss-option-text">${opt}</span>
        <span class="swiss-option-mark"></span>
      </li>`;
    }).join('');

    let explanationHtml = '';
    if (state.revealed) {
      explanationHtml = `
        <div class="swiss-explanation">
          <span class="swiss-explanation-label">解析</span>
          ${q.explanation}
        </div>`;
    }

    let actionHtml = '';
    if (state.revealed) {
      const isLast = state.currentIdx >= total - 1;
      actionHtml = `<button class="swiss-btn" onclick="${isLast ? 'showResult()' : hooks.nextQuestion}">${isLast ? '查看结果 →' : '下一题 →'}</button>`;
    } else {
      actionHtml = `<button class="swiss-btn" onclick="${hooks.submitAnswer}" ${state.selected === null ? 'disabled' : ''}>确认答案</button>`;
    }

    html = `
<div class="swiss-root">
  <div class="swiss-grid swiss-animate">
    <div class="swiss-progress">
      ${squares}
      <span class="swiss-progress-label">${state.currentIdx + 1} / ${total}</span>
    </div>

    <div class="swiss-quiz-top">
      <div>
        <div class="swiss-qnum">${numStr}</div>
        <div class="swiss-qnum-sub">Question</div>
      </div>
      <div class="swiss-qtype">
        <span class="swiss-qtype-pill">${hooks.typeLabel(q.type)}</span>
      </div>
    </div>

    <div class="swiss-question">${q.q}</div>

    <ul class="swiss-options">
      ${optionsHtml}
    </ul>

    ${explanationHtml}

    <div class="swiss-actions">
      ${actionHtml}
      <span class="swiss-back-link" onclick="${hooks.goBack}">返回</span>
    </div>
  </div>
</div>`;
  }

  else if (screen === 'result') {
    const pct = Math.round((state.score / total) * 100);
    const correctCount = state.score;
    const wrongCount = total - correctCount;
    const circumference = 2 * Math.PI * 90;
    const dashOffset = circumference * (1 - pct / 100);

    let reviewHtml = state.answers.map((ans, i) => {
      const qq = QUESTIONS[i];
      const isCorrect = qq.answer.includes(ans) || (Array.isArray(ans) && ans.every(a => qq.answer.includes(a)));
      return `<div class="swiss-review-item">
        <span class="swiss-review-item-num">${String(i+1).padStart(2,'0')}</span>
        <span class="swiss-review-item-q">${qq.q.slice(0,40)}${qq.q.length>40?'…':''}</span>
        <span class="swiss-review-item-mark ${isCorrect ? 'ok' : 'no'}">${isCorrect ? '✓' : '✗'}</span>
      </div>`;
    }).join('');

    html = `
<div class="swiss-root">
  <div class="swiss-grid swiss-animate">
    <div class="swiss-header">
      <div class="swiss-header-bar"></div>
      <div class="swiss-header-text">
        <div class="swiss-title">竞答结果</div>
        <div class="swiss-subtitle">Result · ${pct >= 60 ? '通过' : '未通过'}</div>
      </div>
    </div>

    <div class="swiss-result-grid">
      <div class="swiss-score-ring">
        <svg width="200" height="200">
          <circle class="swiss-score-ring-bg" cx="100" cy="100" r="90"/>
          <circle class="swiss-score-ring-fg" cx="100" cy="100" r="90"
            stroke-dasharray="${circumference}" stroke-dashoffset="${dashOffset}"/>
        </svg>
        <div class="swiss-score-ring-text">
          <div class="swiss-score-ring-num">${pct}<span style="font-size:20px">%</span></div>
          <div class="swiss-score-ring-label">正确率</div>
        </div>
      </div>

      <div class="swiss-result-stats">
        <div class="swiss-stat-row">
          <span class="swiss-stat-label">答对</span>
          <span class="swiss-stat-val" style="color:var(--sw-accent)">${correctCount}</span>
        </div>
        <div class="swiss-stat-row">
          <span class="swiss-stat-label">答错</span>
          <span class="swiss-stat-val" style="color:var(--sw-wrong)">${wrongCount}</span>
        </div>
        <div class="swiss-stat-row">
          <span class="swiss-stat-label">总题数</span>
          <span class="swiss-stat-val">${total}</span>
        </div>
      </div>
    </div>

    <div class="swiss-result-review">
      <div class="swiss-review-title">题目回顾</div>
      ${reviewHtml}
    </div>

    <div class="swiss-actions" style="margin-top:40px;">
      <button class="swiss-btn" onclick="${hooks.startQuiz}">再试一次</button>
      <span class="swiss-back-link" onclick="${hooks.goBack}">返回首页</span>
    </div>
  </div>
</div>`;
  }

  return { html, css };
}


/* ============================================================
 * 风格2: Zen — 禅意极简
 * 垂直居中 · 超大留白 · 中文序号 · 横线分隔列表 · 极细进度线
 * ============================================================ */

function render_zen(screen, state, QUESTIONS, hooks) {
  const q = QUESTIONS[state.currentIdx] || QUESTIONS[0];
  const total = QUESTIONS.length;
  const cnNums = ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十'];
  const progressPct = ((state.currentIdx) / total) * 100;

  /* ---------- CSS ---------- */
  const css = `
.zen-root{
  --zen-bg:#f7f5f0; --zen-fg:#2b2825; --zen-accent:#7a6f5c;
  --zen-line:#d9d4ca; --zen-correct:#5a7a5a; --zen-wrong:#9a6a5a;
  font-family:'Noto Serif SC','Inter',serif;
  background:var(--zen-bg); color:var(--zen-fg);
  min-height:100vh; margin:0;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
}
.zen-container{max-width:600px;width:100%;padding:80px 32px;text-align:center;}

/* Progress — 1px line */
.zen-progress-wrap{width:100%;margin-bottom:72px;}
.zen-progress-line{width:100%;height:1px;background:var(--zen-line);position:relative;}
.zen-progress-fill{position:absolute;top:0;left:0;height:1px;background:var(--zen-accent);transition:width .6s ease;}
.zen-progress-text{font-size:12px;color:var(--zen-accent);letter-spacing:6px;margin-top:12px;font-family:'Inter',sans-serif;}

/* Title */
.zen-title{font-size:28px;font-weight:300;letter-spacing:12px;margin-bottom:8px;font-family:'Noto Serif SC',serif;}
.zen-title-en{font-size:12px;color:var(--zen-accent);letter-spacing:4px;font-family:'Inter',sans-serif;text-transform:uppercase;margin-bottom:0;}

/* Start */
.zen-start-divider{width:40px;height:1px;background:var(--zen-accent);margin:40px auto;}
.zen-start-desc{font-size:16px;line-height:2;color:#4a4640;letter-spacing:2px;margin-bottom:48px;font-weight:300;}
.zen-start-meta{display:flex;justify-content:center;gap:60px;margin-bottom:64px;}
.zen-start-meta-item{text-align:center;}
.zen-start-meta-num{font-size:32px;font-weight:300;color:var(--zen-accent);font-family:'Inter',sans-serif;}
.zen-start-meta-label{font-size:12px;color:#999;letter-spacing:3px;margin-top:8px;}

/* Button — transparent + thin border, large letter-spacing */
.zen-btn{
  display:inline-block;padding:14px 48px;background:transparent;color:var(--zen-fg);
  font-family:'Noto Serif SC',serif;font-size:15px;letter-spacing:8px;
  border:1px solid var(--zen-fg);cursor:pointer;transition:all .3s;text-decoration:none;
  padding-left:56px; /* compensate letter-spacing */
}
.zen-btn:hover{background:var(--zen-fg);color:var(--zen-bg);}
.zen-btn:disabled{border-color:var(--zen-line);color:var(--zen-line);cursor:not-allowed;background:transparent;}
.zen-btn.solid{background:var(--zen-fg);color:var(--zen-bg);}
.zen-btn.solid:hover{background:var(--zen-accent);}

/* Quiz */
.zen-qnum{font-size:18px;font-weight:300;letter-spacing:6px;color:var(--zen-accent);margin-bottom:48px;font-family:'Noto Serif SC',serif;}
.zen-qtype{font-size:11px;color:var(--zen-accent);letter-spacing:4px;margin-bottom:24px;font-family:'Inter',sans-serif;text-transform:uppercase;}
.zen-question{font-size:22px;font-weight:400;line-height:2;letter-spacing:1px;margin-bottom:56px;font-family:'Noto Serif SC',serif;}

/* Options — minimal line-separated list, left bar on selected */
.zen-options{list-style:none;padding:0;margin:0 0 48px;text-align:left;}
.zen-option{
  display:flex;align-items:center;padding:20px 0 20px 20px;
  border-bottom:1px solid var(--zen-line);cursor:pointer;transition:all .3s;
  position:relative;font-size:17px;letter-spacing:1px;font-family:'Noto Serif SC',serif;font-weight:300;
}
.zen-option::before{
  content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);
  width:0;height:24px;background:var(--zen-accent);transition:width .3s;
}
.zen-option.selected::before{width:3px;}
.zen-option.selected{color:var(--zen-accent);padding-left:28px;}
.zen-option:hover{color:var(--zen-accent);}
.zen-option-letter{font-size:12px;color:var(--zen-accent);margin-right:16px;font-family:'Inter',sans-serif;letter-spacing:2px;}
.zen-option-text{flex:1;}

.zen-option.correct{color:var(--zen-correct);}
.zen-option.correct::before{width:3px;background:var(--zen-correct);}
.zen-option.wrong{color:var(--zen-wrong);text-decoration:line-through;text-decoration-color:var(--zen-wrong);}
.zen-option.wrong::before{width:3px;background:var(--zen-wrong);}
.zen-option .zen-option-mark{margin-left:16px;font-size:14px;}
.zen-option.correct .zen-option-mark::after{content:'○';color:var(--zen-correct);}
.zen-option.wrong .zen-option-mark::after{content:'×';color:var(--zen-wrong);}

.zen-explanation{
  text-align:left;padding:24px 32px;margin:0 auto 48px;max-width:520px;
  border-top:1px solid var(--zen-line);border-bottom:1px solid var(--zen-line);
  font-size:15px;line-height:2;color:#5a564f;letter-spacing:1px;font-weight:300;
}
.zen-explanation-label{font-size:11px;color:var(--zen-accent);letter-spacing:6px;text-transform:uppercase;display:block;margin-bottom:12px;font-family:'Inter',sans-serif;}

.zen-actions{display:flex;flex-direction:column;align-items:center;gap:24px;}
.zen-back-link{font-size:13px;color:var(--zen-accent);cursor:pointer;letter-spacing:4px;font-family:'Inter',sans-serif;text-transform:uppercase;border-bottom:1px solid transparent;transition:border-color .3s;}
.zen-back-link:hover{border-bottom-color:var(--zen-accent);}

/* Result */
.zen-result-score{margin-bottom:48px;}
.zen-result-score-num{font-size:72px;font-weight:300;color:var(--zen-accent);line-height:1;font-family:'Inter',sans-serif;}
.zen-result-score-pct{font-size:24px;color:var(--zen-accent);}
.zen-result-score-label{font-size:14px;color:#999;letter-spacing:6px;margin-top:16px;font-family:'Noto Serif SC',serif;}

.zen-result-divider{width:40px;height:1px;background:var(--zen-accent);margin:0 auto 48px;}

.zen-result-stats{display:flex;justify-content:center;gap:48px;margin-bottom:64px;}
.zen-stat{text-align:center;}
.zen-stat-num{font-size:28px;font-weight:300;color:var(--zen-fg);font-family:'Inter',sans-serif;}
.zen-stat-label{font-size:12px;color:#999;letter-spacing:4px;margin-top:8px;}

.zen-result-review{text-align:left;margin-bottom:48px;}
.zen-review-item{display:flex;align-items:center;gap:20px;padding:16px 0;border-bottom:1px solid var(--zen-line);font-size:15px;font-weight:300;letter-spacing:1px;}
.zen-review-item-num{color:var(--zen-accent);font-family:'Noto Serif SC',serif;min-width:28px;}
.zen-review-item-q{flex:1;color:#5a564f;font-size:14px;}
.zen-review-item-mark{font-size:14px;}
.zen-review-item-mark.ok{color:var(--zen-correct);}
.zen-review-item-mark.no{color:var(--zen-wrong);}

@keyframes zen-fade{from{opacity:0;}to{opacity:1;}}
.zen-animate{animation:zen-fade .6s ease;}
`;

  /* ---------- HTML per screen ---------- */
  let html = '';

  if (screen === 'start') {
    html = `
<div class="zen-root">
  <div class="zen-container zen-animate">
    <div class="zen-title">税务知识</div>
    <div class="zen-title-en">Tax Knowledge Quiz</div>

    <div class="zen-start-divider"></div>

    <div class="zen-start-desc">
      静心凝神<br>
      以题会友　以知修身<br>
      检验你对税务法规的理解
    </div>

    <div class="zen-start-meta">
      <div class="zen-start-meta-item">
        <div class="zen-start-meta-num">${total}</div>
        <div class="zen-start-meta-label">题</div>
      </div>
      <div class="zen-start-meta-item">
        <div class="zen-start-meta-num">∞</div>
        <div class="zen-start-meta-label">无时限</div>
      </div>
    </div>

    <div class="zen-actions">
      <button class="zen-btn solid" onclick="${hooks.startQuiz}">开　始</button>
    </div>
  </div>
</div>`;
  }

  else if (screen === 'quiz') {
    let optionsHtml = q.options.map((opt, i) => {
      const letter = String.fromCharCode(65 + i);
      let cls = 'zen-option';
      if (state.selected === i) cls += ' selected';
      if (state.revealed) {
        if (q.answer.includes(i)) cls += ' correct';
        if (state.selected === i && !q.answer.includes(i)) cls += ' wrong';
      }
      return `<li class="${cls}" onclick="${state.revealed ? '' : hooks.selectOption(i)}">
        <span class="zen-option-letter">${letter}</span>
        <span class="zen-option-text">${opt}</span>
        <span class="zen-option-mark"></span>
      </li>`;
    }).join('');

    let explanationHtml = '';
    if (state.revealed) {
      explanationHtml = `
        <div class="zen-explanation">
          <span class="zen-explanation-label">解　析</span>
          ${q.explanation}
        </div>`;
    }

    let actionHtml = '';
    if (state.revealed) {
      const isLast = state.currentIdx >= total - 1;
      actionHtml = `<button class="zen-btn solid" onclick="${isLast ? 'showResult()' : hooks.nextQuestion}">${isLast ? '查看结果' : '下　一　题'}</button>`;
    } else {
      actionHtml = `<button class="zen-btn" onclick="${hooks.submitAnswer}" ${state.selected === null ? 'disabled' : ''}>确　认</button>`;
    }

    html = `
<div class="zen-root">
  <div class="zen-container zen-animate">
    <div class="zen-progress-wrap">
      <div class="zen-progress-line">
        <div class="zen-progress-fill" style="width:${progressPct}%"></div>
      </div>
      <div class="zen-progress-text">${state.currentIdx + 1} ／ ${total}</div>
    </div>

    <div class="zen-qtype">${hooks.typeLabel(q.type)}</div>
    <div class="zen-qnum">${cnNums[state.currentIdx] || (state.currentIdx+1)}</div>

    <div class="zen-question">${q.q}</div>

    <ul class="zen-options">
      ${optionsHtml}
    </ul>

    ${explanationHtml}

    <div class="zen-actions">
      ${actionHtml}
      <span class="zen-back-link" onclick="${hooks.goBack}">返回</span>
    </div>
  </div>
</div>`;
  }

  else if (screen === 'result') {
    const pct = Math.round((state.score / total) * 100);
    const correctCount = state.score;
    const wrongCount = total - correctCount;

    let reviewHtml = state.answers.map((ans, i) => {
      const qq = QUESTIONS[i];
      const isCorrect = qq.answer.includes(ans) || (Array.isArray(ans) && ans.every(a => qq.answer.includes(a)));
      return `<div class="zen-review-item">
        <span class="zen-review-item-num">${cnNums[i] || (i+1)}</span>
        <span class="zen-review-item-q">${qq.q.slice(0,36)}${qq.q.length>36?'…':''}</span>
        <span class="zen-review-item-mark ${isCorrect ? 'ok' : 'no'}">${isCorrect ? '○' : '×'}</span>
      </div>`;
    }).join('');

    let comment = '';
    if (pct >= 80) comment = '心境通明　学有所成';
    else if (pct >= 60) comment = '渐入佳境　仍需精进';
    else comment = '道阻且长　再接再厉';

    html = `
<div class="zen-root">
  <div class="zen-container zen-animate">
    <div class="zen-result-score">
      <div class="zen-result-score-num">${pct}<span class="zen-result-score-pct">%</span></div>
      <div class="zen-result-score-label">${comment}</div>
    </div>

    <div class="zen-result-divider"></div>

    <div class="zen-result-stats">
      <div class="zen-stat">
        <div class="zen-stat-num">${correctCount}</div>
        <div class="zen-stat-label">悟</div>
      </div>
      <div class="zen-stat">
        <div class="zen-stat-num">${wrongCount}</div>
        <div class="zen-stat-label">惑</div>
      </div>
      <div class="zen-stat">
        <div class="zen-stat-num">${total}</div>
        <div class="zen-stat-label">总</div>
      </div>
    </div>

    <div class="zen-result-review">
      ${reviewHtml}
    </div>

    <div class="zen-actions">
      <button class="zen-btn solid" onclick="${hooks.startQuiz}">再　试　一　次</button>
      <span class="zen-back-link" onclick="${hooks.goBack}">返回首页</span>
    </div>
  </div>
</div>`;
  }

  return { html, css };
}


/* ============================================================
 * 风格3: Scandi — 北欧极简
 * 柔和圆角卡片 · 淡阴影 · hover上浮 · 胶囊进度条 · 圆形徽章
 * ============================================================ */

function render_scandi(screen, state, QUESTIONS, hooks) {
  const q = QUESTIONS[state.currentIdx] || QUESTIONS[0];
  const total = QUESTIONS.length;
  const progressPct = Math.round(((state.currentIdx) / total) * 100);

  /* ---------- CSS ---------- */
  const css = `
.scandi-root{
  --sc-bg:#f4f2ee; --sc-card:#ffffff; --sc-fg:#3a3631; --sc-accent:#8a7a5c;
  --sc-line:#e8e4dc; --sc-correct:#6a8a5a; --sc-wrong:#b06a5a;
  --sc-shadow:0 2px 12px rgba(58,54,49,.06);
  --sc-shadow-hover:0 8px 28px rgba(58,54,49,.12);
  --sc-radius:16px;
  font-family:'Inter','Cormorant Garamond',sans-serif;
  background:var(--sc-bg); color:var(--sc-fg);
  min-height:100vh; margin:0;
}
.scandi-wrap{max-width:680px;margin:0 auto;padding:48px 24px;}

/* Header card */
.scandi-header{
  background:var(--sc-card);border-radius:var(--sc-radius);box-shadow:var(--sc-shadow);
  padding:28px 32px;margin-bottom:24px;display:flex;align-items:center;gap:16px;
}
.scandi-header-icon{
  width:44px;height:44px;border-radius:50%;background:var(--sc-accent);
  display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;flex-shrink:0;
}
.scandi-header-text{flex:1;}
.scandi-title{font-size:22px;font-weight:600;color:var(--sc-fg);}
.scandi-subtitle{font-size:13px;color:var(--sc-accent);margin-top:4px;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;}

/* Progress — pill shape */
.scandi-progress-card{
  background:var(--sc-card);border-radius:var(--sc-radius);box-shadow:var(--sc-shadow);
  padding:20px 24px;margin-bottom:24px;display:flex;align-items:center;gap:16px;
}
.scandi-progress-bar{flex:1;height:10px;background:var(--sc-line);border-radius:999px;overflow:hidden;}
.scandi-progress-fill{height:100%;background:linear-gradient(90deg,var(--sc-accent),#a08a6a);border-radius:999px;transition:width .5s ease;}
.scandi-progress-pct{font-size:14px;font-weight:600;color:var(--sc-accent);min-width:42px;text-align:right;}

/* Start */
.scandi-start-card{
  background:var(--sc-card);border-radius:var(--sc-radius);box-shadow:var(--sc-shadow);
  padding:48px 40px;margin-bottom:24px;text-align:center;
}
.scandi-start-title{font-size:36px;font-weight:700;letter-spacing:-0.5px;margin-bottom:8px;}
.scandi-start-deco{font-family:'Cormorant Garamond',serif;font-size:20px;font-style:italic;color:var(--sc-accent);margin-bottom:24px;}
.scandi-start-desc{font-size:16px;line-height:1.7;color:#6a6660;margin-bottom:32px;}

.scandi-badges{display:flex;justify-content:center;gap:20px;margin-bottom:32px;}
.scandi-badge{
  width:64px;height:64px;border-radius:50%;background:var(--sc-bg);
  border:2px solid var(--sc-line);display:flex;flex-direction:column;align-items:center;justify-content:center;
}
.scandi-badge-num{font-size:20px;font-weight:700;color:var(--sc-accent);}
.scandi-badge-label{font-size:10px;color:#999;margin-top:2px;}

/* Button — pill with shadow */
.scandi-btn{
  display:inline-flex;align-items:center;gap:8px;padding:14px 36px;
  background:var(--sc-accent);color:#fff;border:none;border-radius:999px;
  font-family:'Inter',sans-serif;font-size:15px;font-weight:600;cursor:pointer;
  box-shadow:0 4px 14px rgba(138,122,92,.25);transition:all .25s;text-decoration:none;
}
.scandi-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(138,122,92,.35);}
.scandi-btn:disabled{background:var(--sc-line);color:#aaa;cursor:not-allowed;box-shadow:none;transform:none;}
.scandi-btn.outline{background:transparent;color:var(--sc-fg);border:2px solid var(--sc-line);box-shadow:none;}
.scandi-btn.outline:hover{border-color:var(--sc-accent);color:var(--sc-accent);transform:translateY(-1px);}

/* Quiz */
.scandi-quiz-card{
  background:var(--sc-card);border-radius:var(--sc-radius);box-shadow:var(--sc-shadow);
  padding:36px 32px;margin-bottom:24px;
}
.scandi-quiz-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;}
.scandi-quiz-num-row{display:flex;align-items:center;gap:12px;}
.scandi-quiz-num-circle{
  width:40px;height:40px;border-radius:50%;background:var(--sc-accent);color:#fff;
  display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;
}
.scandi-quiz-num-label{font-size:13px;color:#999;font-family:'Cormorant Garamond',serif;font-size:15px;font-style:italic;}
.scandi-quiz-type-pill{
  font-size:12px;padding:6px 14px;border-radius:999px;background:rgba(138,122,92,.1);
  color:var(--sc-accent);font-weight:600;
}
.scandi-question{font-size:20px;font-weight:600;line-height:1.6;margin-bottom:28px;}

/* Options — cards with hover lift */
.scandi-options{display:flex;flex-direction:column;gap:12px;margin-bottom:24px;}
.scandi-option{
  display:flex;align-items:center;gap:14px;padding:16px 20px;
  background:var(--sc-bg);border-radius:12px;border:2px solid transparent;
  cursor:pointer;transition:all .25s;
}
.scandi-option:hover{transform:translateY(-2px);box-shadow:var(--sc-shadow-hover);background:#fff;}
.scandi-option.selected{border-color:var(--sc-accent);background:#fff;}
.scandi-option-letter{
  width:28px;height:28px;border-radius:50%;background:var(--sc-line);
  display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--sc-fg);flex-shrink:0;
  transition:all .25s;
}
.scandi-option.selected .scandi-option-letter{background:var(--sc-accent);color:#fff;}
.scandi-option-text{flex:1;font-size:16px;line-height:1.4;}

.scandi-option.correct{border-color:var(--sc-correct);background:rgba(106,138,90,.06);}
.scandi-option.correct .scandi-option-letter{background:var(--sc-correct);color:#fff;}
.scandi-option.wrong{border-color:var(--sc-wrong);background:rgba(176,106,90,.06);}
.scandi-option.wrong .scandi-option-letter{background:var(--sc-wrong);color:#fff;}
.scandi-option .scandi-option-mark{font-size:16px;margin-left:auto;}
.scandi-option.correct .scandi-option-mark::after{content:'✓';color:var(--sc-correct);}
.scandi-option.wrong .scandi-option-mark::after{content:'✕';color:var(--sc-wrong);}

.scandi-explanation{
  background:rgba(138,122,92,.06);border-radius:12px;padding:20px 24px;margin-bottom:24px;
  font-size:15px;line-height:1.7;color:#5a564f;
}
.scandi-explanation-label{
  font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
  color:var(--sc-accent);margin-bottom:8px;display:flex;align-items:center;gap:6px;
}
.scandi-explanation-label::before{content:'📖';}

.scandi-actions{display:flex;align-items:center;gap:16px;}
.scandi-back-link{font-size:14px;color:#999;cursor:pointer;text-decoration:none;transition:color .2s;}
.scandi-back-link:hover{color:var(--sc-accent);}

/* Result */
.scandi-result-card{
  background:var(--sc-card);border-radius:var(--sc-radius);box-shadow:var(--sc-shadow);
  padding:48px 40px;margin-bottom:24px;text-align:center;
}
.scandi-result-ring{position:relative;width:180px;height:180px;margin:0 auto 24px;}
.scandi-result-ring svg{transform:rotate(-90deg);}
.scandi-result-ring-bg{fill:none;stroke:var(--sc-line);stroke-width:8;}
.scandi-result-ring-fg{fill:none;stroke:var(--sc-accent);stroke-width:8;stroke-linecap:round;transition:stroke-dashoffset 1s;}
.scandi-result-ring-text{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;}
.scandi-result-ring-num{font-size:40px;font-weight:700;color:var(--sc-fg);}
.scandi-result-ring-label{font-size:12px;color:var(--sc-accent);letter-spacing:2px;margin-top:4px;text-transform:uppercase;}

.scandi-result-comment{font-family:'Cormorant Garamond',serif;font-size:22px;font-style:italic;color:var(--sc-accent);margin-bottom:32px;}

.scandi-result-stats{display:flex;justify-content:center;gap:24px;margin-bottom:32px;}
.scandi-stat-badge{
  width:72px;height:72px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;
}
.scandi-stat-badge.ok{background:rgba(106,138,90,.1);}
.scandi-stat-badge.no{background:rgba(176,106,90,.1);}
.scandi-stat-badge.total{background:rgba(138,122,92,.1);}
.scandi-stat-badge-num{font-size:22px;font-weight:700;}
.scandi-stat-badge-label{font-size:10px;color:#999;margin-top:2px;letter-spacing:1px;}

.scandi-review-card{
  background:var(--sc-card);border-radius:var(--sc-radius);box-shadow:var(--sc-shadow);
  padding:24px 28px;margin-bottom:24px;
}
.scandi-review-title{font-size:14px;font-weight:700;margin-bottom:16px;color:var(--sc-fg);}
.scandi-review-item{display:flex;align-items:center;gap:14px;padding:10px 0;border-bottom:1px solid var(--sc-line);font-size:14px;}
.scandi-review-item:last-child{border-bottom:none;}
.scandi-review-item-dot{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;}
.scandi-review-item-dot.ok{background:rgba(106,138,90,.15);color:var(--sc-correct);}
.scandi-review-item-dot.no{background:rgba(176,106,90,.15);color:var(--sc-wrong);}
.scandi-review-item-q{flex:1;color:#6a6660;font-size:13px;}

@keyframes scandi-fade{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
.scandi-animate{animation:scandi-fade .4s ease;}
`;

  /* ---------- HTML per screen ---------- */
  let html = '';

  if (screen === 'start') {
    html = `
<div class="scandi-root">
  <div class="scandi-wrap scandi-animate">
    <div class="scandi-header">
      <div class="scandi-header-icon">🧾</div>
      <div class="scandi-header-text">
        <div class="scandi-title">税务知识竞答</div>
        <div class="scandi-subtitle">Tax Knowledge Quiz · 北欧极简</div>
      </div>
    </div>

    <div class="scandi-start-card">
      <div class="scandi-start-title">测试你的税务知识</div>
      <div class="scandi-start-deco">— Learn · Practice · Master —</div>
      <div class="scandi-start-desc">通过精心设计的题目，检验你对税务法规的理解程度。每道题附有详尽解析，助你查漏补缺，巩固知识。</div>

      <div class="scandi-badges">
        <div class="scandi-badge">
          <div class="scandi-badge-num">${total}</div>
          <div class="scandi-badge-label">题目</div>
        </div>
        <div class="scandi-badge">
          <div class="scandi-badge-num">∞</div>
          <div class="scandi-badge-label">无时限</div>
        </div>
        <div class="scandi-badge">
          <div class="scandi-badge-num">✓</div>
          <div class="scandi-badge-label">有解析</div>
        </div>
      </div>

      <button class="scandi-btn" onclick="${hooks.startQuiz}">开始竞答 →</button>
    </div>
  </div>
</div>`;
  }

  else if (screen === 'quiz') {
    let optionsHtml = q.options.map((opt, i) => {
      const letter = String.fromCharCode(65 + i);
      let cls = 'scandi-option';
      if (state.selected === i) cls += ' selected';
      if (state.revealed) {
        if (q.answer.includes(i)) cls += ' correct';
        if (state.selected === i && !q.answer.includes(i)) cls += ' wrong';
      }
      return `<div class="${cls}" onclick="${state.revealed ? '' : hooks.selectOption(i)}">
        <div class="scandi-option-letter">${letter}</div>
        <span class="scandi-option-text">${opt}</span>
        <span class="scandi-option-mark"></span>
      </div>`;
    }).join('');

    let explanationHtml = '';
    if (state.revealed) {
      explanationHtml = `
        <div class="scandi-explanation">
          <div class="scandi-explanation-label">解析</div>
          ${q.explanation}
        </div>`;
    }

    let actionHtml = '';
    if (state.revealed) {
      const isLast = state.currentIdx >= total - 1;
      actionHtml = `<button class="scandi-btn" onclick="${isLast ? 'showResult()' : hooks.nextQuestion}">${isLast ? '查看结果 →' : '下一题 →'}</button>`;
    } else {
      actionHtml = `<button class="scandi-btn" onclick="${hooks.submitAnswer}" ${state.selected === null ? 'disabled' : ''}>确认答案</button>`;
    }

    html = `
<div class="scandi-root">
  <div class="scandi-wrap scandi-animate">
    <div class="scandi-progress-card">
      <div class="scandi-progress-bar">
        <div class="scandi-progress-fill" style="width:${progressPct}%"></div>
      </div>
      <span class="scandi-progress-pct">${progressPct}%</span>
    </div>

    <div class="scandi-quiz-card">
      <div class="scandi-quiz-top">
        <div class="scandi-quiz-num-row">
          <div class="scandi-quiz-num-circle">${state.currentIdx + 1}</div>
          <span class="scandi-quiz-num-label">Question ${state.currentIdx + 1} of ${total}</span>
        </div>
        <span class="scandi-quiz-type-pill">${hooks.typeLabel(q.type)}</span>
      </div>

      <div class="scandi-question">${q.q}</div>

      <div class="scandi-options">
        ${optionsHtml}
      </div>

      ${explanationHtml}

      <div class="scandi-actions">
        ${actionHtml}
        <span class="scandi-back-link" onclick="${hooks.goBack}">← 返回</span>
      </div>
    </div>
  </div>
</div>`;
  }

  else if (screen === 'result') {
    const pct = Math.round((state.score / total) * 100);
    const correctCount = state.score;
    const wrongCount = total - correctCount;
    const circumference = 2 * Math.PI * 80;
    const dashOffset = circumference * (1 - pct / 100);

    let reviewHtml = state.answers.map((ans, i) => {
      const qq = QUESTIONS[i];
      const isCorrect = qq.answer.includes(ans) || (Array.isArray(ans) && ans.every(a => qq.answer.includes(a)));
      return `<div class="scandi-review-item">
        <div class="scandi-review-item-dot ${isCorrect ? 'ok' : 'no'}">${isCorrect ? '✓' : '✕'}</div>
        <span class="scandi-review-item-q">${qq.q.slice(0,42)}${qq.q.length>42?'…':''}</span>
      </div>`;
    }).join('');

    let comment = '';
    if (pct >= 80) comment = 'Excellent! 税务达人';
    else if (pct >= 60) comment = 'Good! 继续努力';
    else comment = 'Keep practicing! 多加练习';

    html = `
<div class="scandi-root">
  <div class="scandi-wrap scandi-animate">
    <div class="scandi-result-card">
      <div class="scandi-result-ring">
        <svg width="180" height="180">
          <circle class="scandi-result-ring-bg" cx="90" cy="90" r="80"/>
          <circle class="scandi-result-ring-fg" cx="90" cy="90" r="80"
            stroke-dasharray="${circumference}" stroke-dashoffset="${dashOffset}"/>
        </svg>
        <div class="scandi-result-ring-text">
          <div class="scandi-result-ring-num">${pct}%</div>
          <div class="scandi-result-ring-label">正确率</div>
        </div>
      </div>

      <div class="scandi-result-comment">${comment}</div>

      <div class="scandi-result-stats">
        <div class="scandi-stat-badge ok">
          <div class="scandi-stat-badge-num" style="color:var(--sc-correct)">${correctCount}</div>
          <div class="scandi-stat-badge-label">正确</div>
        </div>
        <div class="scandi-stat-badge no">
          <div class="scandi-stat-badge-num" style="color:var(--sc-wrong)">${wrongCount}</div>
          <div class="scandi-stat-badge-label">错误</div>
        </div>
        <div class="scandi-stat-badge total">
          <div class="scandi-stat-badge-num" style="color:var(--sc-accent)">${total}</div>
          <div class="scandi-stat-badge-label">总计</div>
        </div>
      </div>

      <button class="scandi-btn" onclick="${hooks.startQuiz}">再试一次 ↻</button>
    </div>

    <div class="scandi-review-card">
      <div class="scandi-review-title">📋 题目回顾</div>
      ${reviewHtml}
    </div>

    <div style="text-align:center;">
      <span class="scandi-back-link" onclick="${hooks.goBack}">← 返回首页</span>
    </div>
  </div>
</div>`;
  }

  return { html, css };
}


/* Export */

// themes-2.js — 3 minimalist render styles for tax-knowledge quiz SPA
// Style 4: editorial (magazine), Style 5: brutalist, Style 6: flat
// Each function: (screen, state, QUESTIONS, hooks) → { html, css }

/* ================================================================ *
 *  Style 4 — EDITORIAL (杂志排版)
 *  Newspaper / publication aesthetic: serif headlines, article-style
 *  question body, inline lettered options, page-number progress,
 *  text-link buttons with underlines. Zero color.
 * ================================================================ */

function render_editorial(screen, state, QUESTIONS, hooks) {
  const prefix = 'ed-';
  const total = QUESTIONS.length;

  let html = '';

  // ---- START SCREEN ------------------------------------------------
  if (screen === 'start') {
    html += `
<div class="${prefix}wrap">
  <header class="${prefix}masthead">
    <div class="${prefix}masthead-top">
      <span class="${prefix}edition">第 CXLVII 期 · 税务知识专刊</span>
      <span class="${prefix}date">${new Date().toLocaleDateString('zh-CN',{year:'numeric',month:'long',day:'numeric'})}</span>
    </div>
    <div class="${prefix}rule"></div>
    <div class="${prefix}rule"></div>
    <div class="${prefix}masthead-main">
      <h1 class="${prefix}title">税法竞答</h1>
      <p class="${prefix}subtitle">一次关于中国税收制度的知识检验</p>
    </div>
    <div class="${prefix}rule"></div>
  </header>

  <article class="${prefix}article">
    <div class="${prefix}article-head">
      <span class="${prefix}kicker">编者按</span>
      <h2 class="${prefix}article-h">致读者</h2>
    </div>
    <p class="${prefix}body">
      本期竞答收录 ${total} 道税务知识题目，涵盖增值税、个人所得税、企业所得税及税收征管等核心领域。每题设四个选项，部分为多选题。答题结束后将给出评分与详细解析。
    </p>
    <p class="${prefix}body ${prefix}body-deck">
      建议在安静环境中独立完成，限时建议二十分钟。准备好了，请翻至下一页。
    </p>
  </article>

  <footer class="${prefix}footer">
    <a class="${prefix}link" onclick="${hooks.startQuiz}">开始答题 →</a>
  </footer>
</div>`;

  // ---- QUIZ SCREEN -------------------------------------------------
  } else if (screen === 'quiz') {
    const idx = state.currentIdx;
    const q = QUESTIONS[idx];
    const pageNum = String(idx + 1).padStart(2, '0');
    const totalPages = String(total).padStart(2, '0');

    html += `
<div class="${prefix}wrap">
  <header class="${prefix}masthead-sm">
    <span class="${prefix}edition">税法竞答 · 答题中</span>
    <span class="${prefix}date">第 ${pageNum} / ${totalPages} 题</span>
  </header>
  <div class="${prefix}rule"></div>

  <article class="${prefix}article">
    <div class="${prefix}article-head">
      <span class="${prefix}kicker">${hooks.typeLabel ? hooks.typeLabel(q.type) : q.type}</span>
      <h2 class="${prefix}article-q">${q.q}</h2>
    </div>

    <div class="${prefix}options-inline">`;

    q.options.forEach((opt, i) => {
      const letter = String.fromCharCode(65 + i);
      const isSel = state.selected && state.selected.includes(i);
      const isCorrect = state.revealed && q.answer.includes(i);
      const isWrongSel = state.revealed && isSel && !q.answer.includes(i);
      let mark = '';
      if (isCorrect) mark = ' ◆';
      else if (isWrongSel) mark = ' ✕';
      html += `
      <p class="${prefix}opt ${isSel ? prefix+'opt-sel' : ''} ${isCorrect ? prefix+'opt-correct' : ''} ${isWrongSel ? prefix+'opt-wrong' : ''}" onclick="${state.revealed ? '' : hooks.selectOption(i)}">
        <span class="${prefix}letter">(${letter})</span> ${opt}${mark}
      </p>`;
    });

    html += `
    </div>`;

    if (state.revealed && q.explanation) {
      html += `
    <div class="${prefix}rule ${prefix}rule-light"></div>
    <p class="${prefix}body ${prefix}body-note">
      <span class="${prefix}kicker">解析</span> ${q.explanation}
    </p>`;
    }

    html += `
  </article>

  <footer class="${prefix}footer">
    <a class="${prefix}link" onclick="${hooks.goBack}">← 返回</a>
    <span class="${prefix}footer-spacer"></span>`;
    if (!state.revealed) {
      html += `
    <a class="${prefix}link" onclick="${hooks.submitAnswer}">提交答案</a>`;
    } else {
      html += `
    <a class="${prefix}link" onclick="${hooks.nextQuestion}">${idx + 1 < total ? '下一题 →' : '查看结果 →'}</a>`;
    }
    html += `
  </footer>

  <div class="${prefix}pagination">P.${pageNum} / ${totalPages}</div>
</div>`;

  // ---- RESULT SCREEN ----------------------------------------------
  } else if (screen === 'result') {
    const score = state.score;
    const pct = Math.round((score / total) * 100);
    let headline, deck;
    if (pct >= 80) { headline = '成绩优异'; deck = '读者对税务知识掌握扎实，可向同行推荐本文。'; }
    else if (pct >= 60) { headline = '尚可，仍需努力'; deck = '基础题已过关，部分重难点建议重读解析。'; }
    else { headline = '仍需研习'; deck = '建议查阅《税法基础》相关章节后重新作答。'; }

    html += `
<div class="${prefix}wrap">
  <header class="${prefix}masthead">
    <div class="${prefix}masthead-top">
      <span class="${prefix}edition">税法竞答 · 终刊</span>
      <span class="${prefix}date">${new Date().toLocaleDateString('zh-CN',{year:'numeric',month:'long',day:'numeric'})}</span>
    </div>
    <div class="${prefix}rule"></div>
    <div class="${prefix}rule"></div>
    <div class="${prefix}masthead-main">
      <h1 class="${prefix}title-lg">${headline}</h1>
      <p class="${prefix}subtitle">${deck}</p>
    </div>
    <div class="${prefix}rule"></div>
  </header>

  <article class="${prefix}article">
    <div class="${prefix}result-stats">
      <div class="${prefix}stat">
        <span class="${prefix}stat-num">${score}</span>
        <span class="${prefix}stat-lbl">正确</span>
      </div>
      <div class="${prefix}stat">
        <span class="${prefix}stat-num">${total - score}</span>
        <span class="${prefix}stat-lbl">错误</span>
      </div>
      <div class="${prefix}stat">
        <span class="${prefix}stat-num">${pct}%</span>
        <span class="${prefix}stat-lbl">得分率</span>
      </div>
    </div>
    <div class="${prefix}rule ${prefix}rule-light"></div>
    <p class="${prefix}body">
      本次竞答共 ${total} 题，答对 ${score} 题。感谢您参与本期税务知识竞答，如需复习全部题目与解析，请返回答题页面逐一查看。
    </p>
    <p class="${prefix}body ${prefix}body-deck">
      ——编辑部
    </p>
  </article>

  <footer class="${prefix}footer">
    <a class="${prefix}link" onclick="${hooks.goBack}">← 返回首页</a>
    <span class="${prefix}footer-spacer"></span>
    <a class="${prefix}link" onclick="${hooks.startQuiz}">重新答题 →</a>
  </footer>
</div>`;
  }

  const css = `
/* ===== editorial ===== */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Noto+Serif+SC:wght@400;700;900&display=swap');

.${prefix}wrap {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 32px 80px;
  background: #fff;
  color: #111;
  font-family: 'Inter', 'Noto Serif SC', serif;
  font-size: 16px;
  line-height: 1.75;
}
.${prefix}masthead, .${prefix}masthead-sm {
  padding-top: 28px;
}
.${prefix}masthead-top, .${prefix}masthead-sm {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.${prefix}edition, .${prefix}date {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: #999;
}
.${prefix}rule {
  border: none;
  border-top: 1px solid #111;
  margin: 6px 0;
}
.${prefix}rule-light {
  border-top: 1px solid #ddd;
}
.${prefix}masthead-main {
  padding: 20px 0 16px;
}
.${prefix}title {
  font-family: 'Noto Serif SC', serif;
  font-weight: 900;
  font-size: 52px;
  line-height: 1.05;
  letter-spacing: -.01em;
  text-align: left;
  margin: 0;
}
.${prefix}title-lg {
  font-family: 'Noto Serif SC', serif;
  font-weight: 900;
  font-size: 44px;
  line-height: 1.1;
  text-align: left;
  margin: 0;
}
.${prefix}subtitle {
  font-family: 'Noto Serif SC', serif;
  font-size: 18px;
  color: #555;
  margin: 6px 0 0;
  text-align: left;
}
.${prefix}article {
  padding: 28px 0;
}
.${prefix}article-head {
  margin-bottom: 18px;
}
.${prefix}kicker {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 6px;
}
.${prefix}article-h {
  font-family: 'Noto Serif SC', serif;
  font-weight: 700;
  font-size: 28px;
  margin: 0;
  text-align: left;
}
.${prefix}article-q {
  font-family: 'Noto Serif SC', serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.5;
  margin: 0;
  text-align: left;
}
.${prefix}body {
  font-family: 'Noto Serif SC', serif;
  font-size: 17px;
  line-height: 1.85;
  color: #222;
  margin: 0 0 14px;
  text-align: justify;
}
.${prefix}body-deck {
  color: #888;
  font-style: italic;
}
.${prefix}body-note {
  font-size: 15px;
  color: #555;
  background: #f6f6f6;
  padding: 16px 20px;
  border-left: 3px solid #111;
}
.${prefix}options-inline {
  margin: 20px 0 8px;
}
.${prefix}opt {
  font-family: 'Noto Serif SC', serif;
  font-size: 17px;
  line-height: 2;
  margin: 0;
  padding: 4px 0;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: border-color .15s;
}
.${prefix}opt:hover {
  border-bottom-color: #999;
}
.${prefix}letter {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #999;
  margin-right: 6px;
}
.${prefix}opt-sel .${prefix}letter {
  color: #111;
}
.${prefix}opt-sel {
  text-decoration: underline;
  text-decoration-color: #111;
  text-underline-offset: 4px;
}
.${prefix}opt-correct {
  color: #111;
  font-weight: 700;
}
.${prefix}opt-wrong {
  color: #999;
  text-decoration: line-through;
}
.${prefix}footer {
  display: flex;
  align-items: center;
  padding-top: 24px;
}
.${prefix}footer-spacer { flex: 1; }
.${prefix}link {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #111;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}
.${prefix}link:hover {
  color: #999;
}
.${prefix}pagination {
  position: fixed;
  bottom: 24px;
  right: 32px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  letter-spacing: .1em;
  color: #999;
}
.${prefix}result-stats {
  display: flex;
  gap: 48px;
  padding: 8px 0 24px;
}
.${prefix}stat {
  display: flex;
  flex-direction: column;
}
.${prefix}stat-num {
  font-family: 'Noto Serif SC', serif;
  font-weight: 900;
  font-size: 42px;
  line-height: 1;
  color: #111;
}
.${prefix}stat-lbl {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: #999;
  margin-top: 6px;
}
`;

  return { html, css };
}


/* ================================================================ *
 *  Style 5 — BRUTALIST (粗野极简)
 *  Raw HTML feel, monospace everything, massive bold headings
 *  pinned to corner, thick black borders, yellow highlight on
 *  selection, ASCII progress bar. Deliberately unpolished.
 * ================================================================ */

function render_brutalist(screen, state, QUESTIONS, hooks) {
  const prefix = 'bru-';
  const total = QUESTIONS.length;

  let html = '';

  // ---- START SCREEN ------------------------------------------------
  if (screen === 'start') {
    html += `
<div class="${prefix}root">
  <div class="${prefix}corner-tag">[ INIT ]</div>
  <div class="${prefix}head-block">
    <pre class="${prefix}ascii-art">┌──────────────────────┐
│  TAX QUIZ  v1.0      │
│  N=${total} Qs            │
└──────────────────────┘</pre>
    <h1 class="${prefix}title">TAX<br>QUIZ.</h1>
    <p class="${prefix}meta">// 税务知识竞答系统<br>// monospace only<br>// no design. just data.</p>
  </div>

  <div class="${prefix}border-block">
    <p class="${prefix}desc">
      ${total} QUESTIONS. MULTIPLE CHOICE. SOME ARE MULTI-SELECT. <br>
      SUBMIT BEFORE MOVING ON. SCORE AT END. <br>
      THATS IT.
    </p>
    <div class="${prefix}border-block-inner">
      <button class="${prefix}btn" onclick="${hooks.startQuiz}">[ START ]</button>
    </div>
  </div>
</div>`;

  // ---- QUIZ SCREEN -------------------------------------------------
  } else if (screen === 'quiz') {
    const idx = state.currentIdx;
    const q = QUESTIONS[idx];
    const progress = Math.round(((idx + 1) / total) * 100);
    const filled = Math.round((progress / 100) * 10);
    const bar = '#'.repeat(filled) + '-'.repeat(10 - filled);

    html += `
<div class="${prefix}root">
  <div class="${prefix}corner-tag">[ Q${String(idx + 1).padStart(2,'0')} ]</div>

  <div class="${prefix}prog-block">
    <span class="${prefix}prog-ascii">[${bar}]</span>
    <span class="${prefix}prog-pct">${progress}%</span>
  </div>

  <div class="${prefix}type-line">>> TYPE: ${q.type.toUpperCase()}</div>

  <h2 class="${prefix}question">${q.q}</h2>

  <div class="${prefix}options">`;

    q.options.forEach((opt, i) => {
      const letter = String.fromCharCode(65 + i);
      const isSel = state.selected && state.selected.includes(i);
      const isCorrect = state.revealed && q.answer.includes(i);
      const isWrongSel = state.revealed && isSel && !q.answer.includes(i);
      let cls = prefix + 'opt';
      if (isSel) cls += ' ' + prefix + 'opt-sel';
      if (isCorrect) cls += ' ' + prefix + 'opt-correct';
      if (isWrongSel) cls += ' ' + prefix + 'opt-wrong';
      let tag = '   ';
      if (isCorrect) tag = ' OK';
      else if (isWrongSel) tag = ' NO';
      html += `
    <div class="${prefix}opt-row ${cls}" onclick="${state.revealed ? '' : hooks.selectOption(i)}">
      <span class="${prefix}opt-letter">[${letter}]</span>
      <span class="${prefix}opt-text">${opt}</span>
      <span class="${prefix}opt-tag">${tag}</span>
    </div>`;
    });

    html += `
  </div>`;

    if (state.revealed && q.explanation) {
      html += `
  <div class="${prefix}explain">
    <div class="${prefix}explain-label">-- EXPLANATION --</div>
    <p class="${prefix}explain-text">${q.explanation}</p>
  </div>`;
    }

    html += `
  <div class="${prefix}action-row">`;

    if (!state.revealed) {
      html += `
    <button class="${prefix}btn" onclick="${hooks.submitAnswer}">[ SUBMIT ]</button>`;
    } else {
      html += `
    <button class="${prefix}btn" onclick="${hooks.nextQuestion}">[ ${idx + 1 < total ? 'NEXT' : 'RESULT'} >> ]</button>`;
    }
    html += `
    <button class="${prefix}btn ${prefix}btn-ghost" onclick="${hooks.goBack}">[ EXIT ]</button>
  </div>
</div>`;

  // ---- RESULT SCREEN ----------------------------------------------
  } else if (screen === 'result') {
    const score = state.score;
    const pct = Math.round((score / total) * 100);
    const filled = Math.round((pct / 100) * 10);
    const bar = '#'.repeat(filled) + '-'.repeat(10 - filled);

    html += `
<div class="${prefix}root">
  <div class="${prefix}corner-tag">[ DONE ]</div>

  <div class="${prefix}head-block">
    <h1 class="${prefix}title">SCORE<br>${pct}%</h1>
  </div>

  <div class="${prefix}border-block">
    <pre class="${prefix}result-bar">┌────────────────────────┐
│  [${bar}]  ${pct}%${pct < 100 ? ' ' : ''}     │
└────────────────────────┘</pre>

    <div class="${prefix}stat-grid">
      <div class="${prefix}stat-cell">
        <span class="${prefix}stat-num">${score}</span>
        <span class="${prefix}stat-lbl">CORRECT</span>
      </div>
      <div class="${prefix}stat-cell">
        <span class="${prefix}stat-num">${total - score}</span>
        <span class="${prefix}stat-lbl">WRONG</span>
      </div>
      <div class="${prefix}stat-cell">
        <span class="${prefix}stat-num">${total}</span>
        <span class="${prefix}stat-lbl">TOTAL</span>
      </div>
    </div>

    <div class="${prefix}border-block-inner">
      <button class="${prefix}btn" onclick="${hooks.startQuiz}">[ RETRY ]</button>
      <button class="${prefix}btn ${prefix}btn-ghost" onclick="${hooks.goBack}">[ HOME ]</button>
    </div>
  </div>
</div>`;
  }

  const css = `
/* ===== brutalist ===== */
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

.${prefix}root {
  font-family: 'Space Mono', monospace;
  background: #fff;
  color: #000;
  padding: 12px;
  min-height: 100vh;
  position: relative;
}
.${prefix}corner-tag {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 11px;
  font-weight: 700;
  color: #000;
  border: 2px solid #000;
  padding: 2px 6px;
}
.${prefix}head-block {
  padding: 8px 0 20px;
  margin-bottom: 16px;
  border-bottom: 4px solid #000;
}
.${prefix}ascii-art {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  line-height: 1.3;
  margin: 0 0 12px;
  white-space: pre;
}
.${prefix}title {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 72px;
  line-height: .9;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -.04em;
}
.${prefix}meta {
  font-size: 13px;
  line-height: 1.6;
  color: #555;
  margin: 12px 0 0;
}
.${prefix}prog-block {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #000;
}
.${prefix}prog-ascii {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: .05em;
}
.${prefix}prog-pct {
  font-size: 14px;
  font-weight: 700;
  color: #000;
}
.${prefix}type-line {
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #000;
}
.${prefix}question {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 22px;
  line-height: 1.5;
  margin: 0 0 20px;
  padding: 12px;
  border: 2px solid #000;
}
.${prefix}options {
  margin-bottom: 20px;
}
.${prefix}opt-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  border: 2px solid #000;
  padding: 12px 14px;
  margin-bottom: 8px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.6;
  transition: background .08s, color .08s;
}
.${prefix}opt-row:hover {
  background: #f0f0f0;
}
.${prefix}opt-sel {
  background: #ffff00 !important;
}
.${prefix}opt-sel:hover {
  background: #ffff00;
}
.${prefix}opt-correct {
  border-width: 3px;
  background: #ffff00;
}
.${prefix}opt-wrong {
  border-width: 3px;
  background: #000;
  color: #fff;
  text-decoration: line-through;
}
.${prefix}opt-letter {
  font-weight: 700;
  flex-shrink: 0;
}
.${prefix}opt-text {
  flex: 1;
}
.${prefix}opt-tag {
  font-weight: 700;
  font-size: 12px;
  flex-shrink: 0;
}
.${prefix}explain {
  border: 2px solid #000;
  padding: 12px 14px;
  margin-bottom: 20px;
  background: #f9f9f9;
}
.${prefix}explain-label {
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 6px;
}
.${prefix}explain-text {
  font-size: 13px;
  line-height: 1.7;
  margin: 0;
}
.${prefix}action-row {
  display: flex;
  gap: 8px;
}
.${prefix}btn {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 14px;
  background: #fff;
  color: #000;
  border: 2px solid #000;
  padding: 10px 18px;
  cursor: pointer;
  transition: background .1s, color .1s;
}
.${prefix}btn:hover {
  background: #000;
  color: #fff;
}
.${prefix}btn-ghost {
  background: transparent;
}
.${prefix}border-block {
  border: 4px solid #000;
  padding: 16px;
  margin-top: 4px;
}
.${prefix}border-block-inner {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid #000;
}
.${prefix}desc {
  font-size: 14px;
  line-height: 1.8;
  margin: 0;
}
.${prefix}result-bar {
  font-size: 14px;
  line-height: 1.4;
  margin: 0 0 16px;
  white-space: pre;
}
.${prefix}stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 2px solid #000;
  margin-bottom: 4px;
}
.${prefix}stat-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  border-right: 2px solid #000;
}
.${prefix}stat-cell:last-child { border-right: none; }
.${prefix}stat-num {
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
}
.${prefix}stat-lbl {
  font-size: 11px;
  font-weight: 700;
  margin-top: 8px;
  letter-spacing: .05em;
}
`;

  return { html, css };
}


/* ================================================================ *
 *  Style 6 — FLAT (扁平极简)
 *  iOS 7–era flat design: large color blocks, no shadows or
 *  gradients, colored accent bar beside headings, flat card
 *  options that fill on select, thick progress bar, pill buttons.
 * ================================================================ */

function render_flat(screen, state, QUESTIONS, hooks) {
  const prefix = 'flat-';
  const ACCENT = '#3b82f6';
  const ACCENT_LIGHT = '#dbeafe';
  const BG = '#f8f9fb';
  const TEXT = '#1e2a3a';
  const total = QUESTIONS.length;

  let html = '';

  // ---- START SCREEN ------------------------------------------------
  if (screen === 'start') {
    html += `
<div class="${prefix}page">
  <div class="${prefix}hero">
    <div class="${prefix}hero-bar"></div>
    <div class="${prefix}hero-content">
      <h1 class="${prefix}hero-title">税务知识<br>竞答</h1>
      <p class="${prefix}hero-desc">${total} 道题目 · 涵盖增值税、个税、企税等核心知识</p>
    </div>
  </div>

  <div class="${prefix}card-area">
    <div class="${prefix}info-card">
      <div class="${prefix}info-icon">${total}</div>
      <div class="${prefix}info-text">
        <span class="${prefix}info-label">题目数量</span>
        <span class="${prefix}info-val">单选 & 多选混合</span>
      </div>
    </div>
    <div class="${prefix}info-card">
      <div class="${prefix}info-icon">⏱</div>
      <div class="${prefix}info-text">
        <span class="${prefix}info-label">建议用时</span>
        <span class="${prefix}info-val">约 20 分钟</span>
      </div>
    </div>
    <div class="${prefix}info-card">
      <div class="${prefix}info-icon">★</div>
      <div class="${prefix}info-text">
        <span class="${prefix}info-label">评分方式</span>
        <span class="${prefix}info-val">即时反馈 + 终评</span>
      </div>
    </div>
  </div>

  <button class="${prefix}btn-primary" onclick="${hooks.startQuiz}">开始答题</button>
</div>`;

  // ---- QUIZ SCREEN -------------------------------------------------
  } else if (screen === 'quiz') {
    const idx = state.currentIdx;
    const q = QUESTIONS[idx];
    const progress = ((idx + 1) / total) * 100;

    html += `
<div class="${prefix}page">
  <div class="${prefix}topbar">
    <div class="${prefix}topbar-left">
      <span class="${prefix}back-btn" onclick="${hooks.goBack}">‹</span>
      <span class="${prefix}topbar-title">第 ${idx + 1} 题 / 共 ${total} 题</span>
    </div>
    <span class="${prefix}pill">${hooks.typeLabel ? hooks.typeLabel(q.type) : q.type}</span>
  </div>

  <div class="${prefix}progress-track">
    <div class="${prefix}progress-fill" style="width:${progress}%"></div>
  </div>

  <div class="${prefix}q-section">
    <div class="${prefix}q-bar"></div>
    <h2 class="${prefix}q-text">${q.q}</h2>
  </div>

  <div class="${prefix}opt-list">`;

    q.options.forEach((opt, i) => {
      const isSel = state.selected && state.selected.includes(i);
      const isCorrect = state.revealed && q.answer.includes(i);
      const isWrongSel = state.revealed && isSel && !q.answer.includes(i);
      let cls = prefix + 'opt';
      if (isSel && !state.revealed) cls += ' ' + prefix + 'opt-selected';
      if (isCorrect) cls += ' ' + prefix + 'opt-correct';
      if (isWrongSel) cls += ' ' + prefix + 'opt-wrong';
      const letter = String.fromCharCode(65 + i);
      html += `
    <div class="${cls}" onclick="${state.revealed ? '' : hooks.selectOption(i)}">
      <span class="${prefix}opt-letter">${letter}</span>
      <span class="${prefix}opt-content">${opt}</span>`;
      if (isCorrect) {
        html += `<span class="${prefix}opt-badge">${prefix === 'flat-' ? '✓' : ''}✓</span>`;
      } else if (isWrongSel) {
        html += `<span class="${prefix}opt-badge ${prefix}opt-badge-wrong">✕</span>`;
      }
      html += `
    </div>`;
    });

    html += `
  </div>`;

    if (state.revealed && q.explanation) {
      html += `
  <div class="${prefix}explain-box">
    <span class="${prefix}explain-tag">解析</span>
    <p class="${prefix}explain-body">${q.explanation}</p>
  </div>`;
    }

    html += `
  <div class="${prefix}action-bar">`;
    if (!state.revealed) {
      html += `
    <button class="${prefix}btn-primary ${prefix}btn-block" onclick="${hooks.submitAnswer}">提交答案</button>`;
    } else {
      html += `
    <button class="${prefix}btn-primary ${prefix}btn-block" onclick="${hooks.nextQuestion}">${idx + 1 < total ? '下一题' : '查看结果'}</button>`;
    }
    html += `
  </div>
</div>`;

  // ---- RESULT SCREEN ----------------------------------------------
  } else if (screen === 'result') {
    const score = state.score;
    const pct = Math.round((score / total) * 100);
    const wrong = total - score;

    html += `
<div class="${prefix}page">
  <div class="${prefix}result-hero">
    <div class="${prefix}result-bar-deco"></div>
    <span class="${prefix}result-score">${pct}<small>%</small></span>
    <span class="${prefix}result-label">最终得分</span>
  </div>

  <div class="${prefix}stat-row">
    <div class="${prefix}stat-block">
      <span class="${prefix}stat-big" style="color:${ACCENT}">${score}</span>
      <span class="${prefix}stat-tag">答对</span>
    </div>
    <div class="${prefix}stat-divider"></div>
    <div class="${prefix}stat-block">
      <span class="${prefix}stat-big" style="color:#ef4444">${wrong}</span>
      <span class="${prefix}stat-tag">答错</span>
    </div>
    <div class="${prefix}stat-divider"></div>
    <div class="${prefix}stat-block">
      <span class="${prefix}stat-big">${total}</span>
      <span class="${prefix}stat-tag">总题数</span>
    </div>
  </div>

  <div class="${prefix}msg-box">
    <p class="${prefix}msg-title">${pct >= 80 ? '表现出色！' : pct >= 60 ? '继续加油！' : '需要复习'}</p>
    <p class="${prefix}msg-desc">${pct >= 80 ? '你对税务知识有扎实的理解。' : pct >= 60 ? '基础不错，部分知识点需巩固。' : '建议系统学习税法基础知识后重试。'}</p>
  </div>

  <div class="${prefix}action-bar ${prefix}action-row-gap">
    <button class="${prefix}btn-secondary ${prefix}btn-block" onclick="${hooks.goBack}">返回首页</button>
    <button class="${prefix}btn-primary ${prefix}btn-block" onclick="${hooks.startQuiz}">重新答题</button>
  </div>
</div>`;
  }

  const css = `
/* ===== flat ===== */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.${prefix}page {
  font-family: 'Inter', -apple-system, sans-serif;
  background: ${BG};
  color: ${TEXT};
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
}

/* ---- start ---- */
.${prefix}hero {
  display: flex;
  align-items: stretch;
  background: #fff;
  padding: 48px 28px 40px;
}
.${prefix}hero-bar {
  width: 4px;
  background: ${ACCENT};
  border-radius: 2px;
  margin-right: 20px;
  flex-shrink: 0;
}
.${prefix}hero-content { flex: 1; }
.${prefix}hero-title {
  font-size: 38px;
  font-weight: 800;
  line-height: 1.15;
  margin: 0;
  color: ${TEXT};
}
.${prefix}hero-desc {
  font-size: 15px;
  color: #6b7d8f;
  margin: 12px 0 0;
  font-weight: 400;
}
.${prefix}card-area {
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.${prefix}info-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  padding: 18px 20px;
  border-radius: 12px;
}
.${prefix}info-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${ACCENT_LIGHT};
  color: ${ACCENT};
  border-radius: 10px;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
}
.${prefix}info-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.${prefix}info-label {
  font-size: 13px;
  font-weight: 600;
  color: ${TEXT};
}
.${prefix}info-val {
  font-size: 13px;
  color: #8a9aaa;
}

/* ---- shared buttons ---- */
.${prefix}btn-primary {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  background: ${ACCENT};
  border: none;
  border-radius: 10px;
  padding: 16px 32px;
  cursor: pointer;
  transition: opacity .15s;
}
.${prefix}btn-primary:hover { opacity: .88; }
.${prefix}btn-secondary {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: ${TEXT};
  background: #e2e8f0;
  border: none;
  border-radius: 10px;
  padding: 16px 32px;
  cursor: pointer;
  transition: opacity .15s;
}
.${prefix}btn-secondary:hover { opacity: .85; }
.${prefix}btn-block {
  width: 100%;
  display: block;
}
.${prefix}page > .${prefix}btn-primary {
  margin: 8px 20px 32px;
  width: calc(100% - 40px);
}

/* ---- quiz ---- */
.${prefix}topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 12px;
  background: #fff;
}
.${prefix}topbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.${prefix}back-btn {
  font-size: 28px;
  color: ${TEXT};
  cursor: pointer;
  line-height: 1;
  padding: 0 4px;
}
.${prefix}topbar-title {
  font-size: 15px;
  font-weight: 600;
  color: ${TEXT};
}
.${prefix}pill {
  font-size: 12px;
  font-weight: 600;
  color: ${ACCENT};
  background: ${ACCENT_LIGHT};
  padding: 6px 14px;
  border-radius: 20px;
}
.${prefix}progress-track {
  height: 8px;
  background: #e8ecf1;
  position: relative;
}
.${prefix}progress-fill {
  height: 100%;
  background: ${ACCENT};
  transition: width .3s ease;
}
.${prefix}q-section {
  display: flex;
  align-items: flex-start;
  padding: 32px 20px 20px;
}
.${prefix}q-bar {
  width: 4px;
  min-height: 56px;
  background: ${ACCENT};
  border-radius: 2px;
  margin-right: 16px;
  flex-shrink: 0;
}
.${prefix}q-text {
  font-size: 21px;
  font-weight: 700;
  line-height: 1.5;
  margin: 0;
  color: ${TEXT};
}
.${prefix}opt-list {
  padding: 4px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.${prefix}opt {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #fff;
  border-radius: 12px;
  padding: 16px 18px;
  cursor: pointer;
  transition: background .15s, transform .1s;
  border: 2px solid transparent;
}
.${prefix}opt:hover {
  background: #f0f4f8;
}
.${prefix}opt-letter {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${BG};
  color: #8a9aaa;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
  transition: background .15s, color .15s;
}
.${prefix}opt-content {
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.5;
}
.${prefix}opt-badge {
  color: ${ACCENT};
  font-weight: 700;
  font-size: 18px;
}
.${prefix}opt-badge-wrong {
  color: #ef4444;
}
.${prefix}opt-selected {
  background: ${ACCENT_LIGHT};
  border-color: ${ACCENT};
}
.${prefix}opt-selected .${prefix}opt-letter {
  background: ${ACCENT};
  color: #fff;
}
.${prefix}opt-selected .${prefix}opt-content {
  color: ${ACCENT};
  font-weight: 600;
}
.${prefix}opt-correct {
  background: ${ACCENT};
  border-color: ${ACCENT};
}
.${prefix}opt-correct .${prefix}opt-letter {
  background: #fff;
  color: ${ACCENT};
}
.${prefix}opt-correct .${prefix}opt-content {
  color: #fff;
  font-weight: 600;
}
.${prefix}opt-correct .${prefix}opt-badge {
  color: #fff;
}
.${prefix}opt-wrong {
  background: #fef2f2;
  border-color: #ef4444;
}
.${prefix}opt-wrong .${prefix}opt-letter {
  background: #ef4444;
  color: #fff;
}
.${prefix}opt-wrong .${prefix}opt-content {
  color: #ef4444;
  text-decoration: line-through;
}
.${prefix}explain-box {
  margin: 0 20px 20px;
  background: #fff;
  border-radius: 12px;
  padding: 18px 20px;
  border-left: 4px solid ${ACCENT};
}
.${prefix}explain-tag {
  font-size: 12px;
  font-weight: 700;
  color: ${ACCENT};
  text-transform: uppercase;
  letter-spacing: .05em;
}
.${prefix}explain-body {
  font-size: 14px;
  line-height: 1.7;
  color: #4a5a6a;
  margin: 8px 0 0;
}
.${prefix}action-bar {
  padding: 0 20px 32px;
  margin-top: auto;
}
.${prefix}action-row-gap {
  display: flex;
  gap: 12px;
}
.${prefix}action-row-gap .${prefix}btn-block {
  width: auto;
  flex: 1;
  margin: 0;
}

/* ---- result ---- */
.${prefix}result-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 56px 28px 48px;
  position: relative;
}
.${prefix}result-bar-deco {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: ${ACCENT};
}
.${prefix}result-score {
  font-size: 80px;
  font-weight: 800;
  color: ${ACCENT};
  line-height: 1;
}
.${prefix}result-score small {
  font-size: 36px;
  font-weight: 700;
}
.${prefix}result-label {
  font-size: 15px;
  color: #8a9aaa;
  margin-top: 12px;
  font-weight: 500;
}
.${prefix}stat-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 32px 20px;
  background: #fff;
  margin-top: 8px;
}
.${prefix}stat-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.${prefix}stat-big {
  font-size: 36px;
  font-weight: 800;
  color: ${TEXT};
  line-height: 1;
}
.${prefix}stat-tag {
  font-size: 12px;
  font-weight: 500;
  color: #8a9aaa;
}
.${prefix}stat-divider {
  width: 1px;
  height: 40px;
  background: #e2e8f0;
}
.${prefix}msg-box {
  margin: 12px 20px 0;
  background: #fff;
  border-radius: 12px;
  padding: 24px 20px;
  text-align: center;
}
.${prefix}msg-title {
  font-size: 20px;
  font-weight: 700;
  color: ${TEXT};
  margin: 0 0 8px;
}
.${prefix}msg-desc {
  font-size: 14px;
  color: #6b7d8f;
  margin: 0;
  line-height: 1.6;
}
.${prefix}action-bar.${prefix}action-row-gap {
  margin-top: auto;
  padding-bottom: 32px;
}
`;

  return { html, css };
}


/**
 * themes-3.js
 * 风格7: neobrutal（新粗野主义）
 * 风格8: notion（Notion文档风）
 *
 * 每个函数签名: (screen, state, QUESTIONS, hooks) → { html, css }
 * screen: 'start' | 'quiz' | 'result'
 * state: { screen, currentIdx, answers, selected, revealed, score }
 * QUESTIONS: [{ type, q, options[], answer[], explanation }]
 * hooks: { startQuiz, goBack, submitAnswer, nextQuestion (strings),
 *           selectOption: (i)=>string, typeLabel: fn, typePill: fn }
 */

// ═══════════════════════════════════════════════════════════════
//  风格7: neobrutal（新粗野主义）
// ═══════════════════════════════════════════════════════════════

function render_neobrutal(screen, state, QUESTIONS, hooks) {
  const css = `
    .nb-app {
      --nb-yellow: #fef9c3;
      --nb-purple: #7c3aed;
      --nb-black: #000000;
      --nb-green: #22c55e;
      --nb-red: #ef4444;
      --nb-pink: #ec4899;
      --nb-blue: #3b82f6;
      --nb-orange: #f97316;
      --nb-cream: #fffbeb;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      font-weight: 700;
      background: var(--nb-yellow);
      min-height: 100vh;
      padding: 24px 16px;
      box-sizing: border-box;
      color: var(--nb-black);
    }
    .nb-app * { box-sizing: border-box; }

    /* ---------- Start Screen ---------- */
    .nb-start {
      max-width: 560px;
      margin: 40px auto;
      text-align: center;
    }
    .nb-hero {
      position: relative;
      display: inline-block;
      margin-bottom: 24px;
    }
    .nb-hero-bg {
      position: absolute;
      inset: 0;
      background: var(--nb-pink);
      border: 3px solid var(--nb-black);
      border-radius: 12px;
      transform: rotate(3deg) translate(6px, 6px);
      z-index: 1;
    }
    .nb-title-block {
      position: relative;
      z-index: 2;
      font-size: 44px;
      font-weight: 900;
      line-height: 1.15;
      padding: 24px 36px;
      background: var(--nb-purple);
      color: var(--nb-yellow);
      border: 3px solid var(--nb-black);
      border-radius: 12px;
      box-shadow: 6px 6px 0 var(--nb-black);
      transform: rotate(-2deg);
    }
    .nb-tag {
      display: inline-block;
      margin-top: 20px;
      font-size: 15px;
      font-weight: 800;
      padding: 6px 18px;
      background: #fff;
      border: 3px solid var(--nb-black);
      border-radius: 12px;
      box-shadow: 4px 4px 0 var(--nb-black);
      transform: rotate(1.5deg);
      letter-spacing: 0.05em;
    }
    .nb-desc {
      font-size: 17px;
      font-weight: 600;
      margin: 28px auto 28px;
      max-width: 440px;
      line-height: 1.6;
      background: #fff;
      border: 3px solid var(--nb-black);
      border-radius: 12px;
      padding: 18px 22px;
      box-shadow: 4px 4px 0 var(--nb-black);
    }
    .nb-start-stats {
      display: flex;
      gap: 14px;
      justify-content: center;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .nb-stat {
      border: 3px solid var(--nb-black);
      border-radius: 12px;
      padding: 12px 20px;
      box-shadow: 4px 4px 0 var(--nb-black);
      font-size: 13px;
      font-weight: 800;
      text-align: center;
      min-width: 90px;
    }
    .nb-stat strong {
      font-size: 26px;
      display: block;
      margin-bottom: 2px;
    }
    .nb-stat-pink   { background: var(--nb-pink);   color: #fff; }
    .nb-stat-blue   { background: var(--nb-blue);   color: #fff; }
    .nb-stat-orange { background: var(--nb-orange); color: #fff; }

    /* ---------- Buttons ---------- */
    .nb-btn {
      font-family: 'Inter', system-ui, sans-serif;
      font-weight: 800;
      font-size: 17px;
      padding: 13px 30px;
      border: 3px solid var(--nb-black);
      border-radius: 12px;
      box-shadow: 4px 4px 0 var(--nb-black);
      cursor: pointer;
      transition: transform 0.1s ease, box-shadow 0.1s ease;
      background: #fff;
      color: var(--nb-black);
      user-select: none;
    }
    .nb-btn:hover {
      box-shadow: 0 0 0 var(--nb-black);
      transform: translate(4px, 4px);
    }
    .nb-btn:active {
      box-shadow: 0 0 0 var(--nb-black);
      transform: translate(4px, 4px);
    }
    .nb-btn-primary { background: var(--nb-purple); color: #fff; }
    .nb-btn-green   { background: var(--nb-green);  color: #fff; }
    .nb-btn-blue    { background: var(--nb-blue);   color: #fff; }
    .nb-btn:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      box-shadow: 4px 4px 0 var(--nb-black);
      transform: none;
    }
    .nb-btn:disabled:hover {
      box-shadow: 4px 4px 0 var(--nb-black);
      transform: none;
    }

    /* ---------- Quiz Screen ---------- */
    .nb-quiz {
      max-width: 680px;
      margin: 0 auto;
    }
    .nb-progress-wrap {
      margin-bottom: 28px;
    }
    .nb-progress-bar {
      height: 28px;
      border: 3px solid var(--nb-black);
      border-radius: 12px;
      background: #fff;
      overflow: hidden;
      position: relative;
      box-shadow: 4px 4px 0 var(--nb-black);
    }
    .nb-progress-fill {
      height: 100%;
      background: var(--nb-purple);
      transition: width 0.35s ease;
    }
    .nb-progress-text {
      text-align: center;
      font-size: 14px;
      font-weight: 800;
      margin-top: 10px;
    }
    .nb-question-card {
      background: #fff;
      border: 3px solid var(--nb-black);
      border-radius: 12px;
      padding: 26px;
      box-shadow: 4px 4px 0 var(--nb-black);
      margin-bottom: 24px;
    }
    .nb-q-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 18px;
      flex-wrap: wrap;
    }
    .nb-q-num {
      font-size: 14px;
      font-weight: 900;
      padding: 4px 14px;
      background: var(--nb-yellow);
      border: 3px solid var(--nb-black);
      border-radius: 12px;
    }
    .nb-q-type {
      font-size: 13px;
      font-weight: 800;
      padding: 4px 14px;
      background: var(--nb-pink);
      color: #fff;
      border: 3px solid var(--nb-black);
      border-radius: 12px;
    }
    .nb-q-text {
      font-size: 22px;
      font-weight: 800;
      line-height: 1.5;
      margin-bottom: 6px;
    }
    .nb-q-hint {
      font-size: 14px;
      font-weight: 600;
      color: #6b7280;
      margin-bottom: 18px;
    }

    /* ---------- Options ---------- */
    .nb-options {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .nb-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      background: var(--nb-yellow);
      border: 3px solid var(--nb-black);
      border-radius: 12px;
      box-shadow: 4px 4px 0 var(--nb-black);
      cursor: pointer;
      transition: transform 0.1s ease, box-shadow 0.1s ease, border-color 0.1s;
      font-weight: 700;
      font-size: 16px;
      user-select: none;
    }
    .nb-option:hover {
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0 var(--nb-black);
    }
    .nb-option-selected {
      border-color: var(--nb-purple);
      box-shadow: none;
      background: #fff;
      transform: translate(4px, 4px);
    }
    .nb-option-selected:hover {
      transform: translate(4px, 4px);
      box-shadow: none;
    }
    .nb-option-correct {
      border-color: var(--nb-green);
      box-shadow: none;
      background: #d1fae5;
      cursor: default;
    }
    .nb-option-correct:hover {
      transform: none;
      box-shadow: none;
    }
    .nb-option-wrong {
      border-color: var(--nb-red);
      box-shadow: none;
      background: #fee2e2;
      cursor: default;
    }
    .nb-option-wrong:hover {
      transform: none;
      box-shadow: none;
    }
    .nb-option-letter {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: var(--nb-black);
      color: #fff;
      border-radius: 8px;
      font-weight: 900;
      font-size: 15px;
      flex-shrink: 0;
    }
    .nb-option-correct  .nb-option-letter { background: var(--nb-green); }
    .nb-option-wrong    .nb-option-letter { background: var(--nb-red); }
    .nb-option-selected .nb-option-letter { background: var(--nb-purple); }
    .nb-option-text { flex: 1; }
    .nb-option-mark {
      font-size: 22px;
      font-weight: 900;
      flex-shrink: 0;
    }
    .nb-option-correct .nb-option-mark { color: var(--nb-green); }
    .nb-option-wrong   .nb-option-mark { color: var(--nb-red); }

    /* ---------- Explanation ---------- */
    .nb-explanation {
      margin-top: 18px;
      padding: 18px;
      background: var(--nb-yellow);
      border: 3px solid var(--nb-black);
      border-radius: 12px;
      box-shadow: 4px 4px 0 var(--nb-black);
      font-size: 15px;
      font-weight: 600;
      line-height: 1.6;
    }
    .nb-explanation-title {
      font-size: 16px;
      font-weight: 900;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* ---------- Actions ---------- */
    .nb-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-top: 24px;
      flex-wrap: wrap;
    }

    /* ---------- Result Screen ---------- */
    .nb-result {
      max-width: 680px;
      margin: 20px auto;
      text-align: center;
    }
    .nb-score-card {
      display: inline-block;
      padding: 36px 52px;
      background: #fff;
      border: 3px solid var(--nb-black);
      border-radius: 12px;
      box-shadow: 6px 6px 0 var(--nb-black);
      margin-bottom: 28px;
    }
    .nb-score-row {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 4px;
    }
    .nb-score-num {
      font-size: 64px;
      font-weight: 900;
      color: var(--nb-purple);
      line-height: 1;
    }
    .nb-score-total {
      font-size: 26px;
      font-weight: 800;
    }
    .nb-score-label {
      font-size: 18px;
      font-weight: 800;
      margin-top: 10px;
    }
    .nb-score-msg {
      font-size: 15px;
      font-weight: 600;
      margin-top: 8px;
      max-width: 400px;
      color: #4b5563;
    }
    .nb-review {
      text-align: left;
      margin-top: 32px;
    }
    .nb-review-title {
      font-size: 22px;
      font-weight: 900;
      margin-bottom: 16px;
      display: inline-block;
      padding: 8px 22px;
      background: var(--nb-purple);
      color: #fff;
      border: 3px solid var(--nb-black);
      border-radius: 12px;
      box-shadow: 4px 4px 0 var(--nb-black);
      transform: rotate(-1deg);
    }
    .nb-review-item {
      background: #fff;
      border: 3px solid var(--nb-black);
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 12px;
      box-shadow: 4px 4px 0 var(--nb-black);
    }
    .nb-review-q {
      font-size: 16px;
      font-weight: 800;
      margin-bottom: 8px;
      line-height: 1.4;
    }
    .nb-review-status {
      display: inline-block;
      font-size: 12px;
      font-weight: 800;
      padding: 2px 10px;
      border: 2px solid var(--nb-black);
      border-radius: 8px;
      margin-left: 8px;
      vertical-align: middle;
    }
    .nb-review-status-ok { background: var(--nb-green); color: #fff; }
    .nb-review-status-no { background: var(--nb-red);   color: #fff; }
    .nb-review-ans {
      font-size: 14px;
      font-weight: 600;
      color: #555;
      margin-top: 6px;
      line-height: 1.5;
    }
    .nb-review-correct { color: #16a34a; font-weight: 700; }
    .nb-result-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-top: 36px;
    }
  `;

  // ── helper ──
  const _sel = (state, i) =>
    Array.isArray(state.selected) ? state.selected.includes(i) : state.selected === i;
  const _hasSel = (state) =>
    Array.isArray(state.selected)
      ? state.selected.length > 0
      : state.selected !== null && state.selected !== undefined;

  let html = '';

  if (screen === 'start') {
    html = `
      <div class="nb-app">
        <div class="nb-start">
          <div class="nb-hero">
            <div class="nb-hero-bg"></div>
            <div class="nb-title-block">🧾 税务知识竞答</div>
          </div>
          <div class="nb-tag">TAX QUIZ CHALLENGE</div>
          <p class="nb-desc">
            挑战你的税务知识储备！涵盖增值税、个人所得税、企业所得税等核心税法知识，每题即时解析。
          </p>
          <div class="nb-start-stats">
            <div class="nb-stat nb-stat-pink"><strong>${QUESTIONS.length}</strong>道题目</div>
            <div class="nb-stat nb-stat-blue"><strong>∞</strong>不限时</div>
            <div class="nb-stat nb-stat-orange"><strong>✓</strong>即时解析</div>
          </div>
          <button class="nb-btn nb-btn-primary" onclick="${hooks.startQuiz}">开始答题 →</button>
        </div>
      </div>
    `;
  } else if (screen === 'quiz') {
    const q = QUESTIONS[state.currentIdx];
    const progress = ((state.currentIdx + 1) / QUESTIONS.length) * 100;

    const optionsHtml = q.options
      .map((opt, i) => {
        const sel = _sel(state, i);
        let cls = 'nb-option';
        let mark = '';
        if (state.revealed) {
          if (q.answer.includes(i)) {
            cls += ' nb-option-correct';
            mark = '<span class="nb-option-mark">✓</span>';
          } else if (sel) {
            cls += ' nb-option-wrong';
            mark = '<span class="nb-option-mark">✗</span>';
          }
        } else if (sel) {
          cls += ' nb-option-selected';
        }
        const oc = state.revealed ? '' : `onclick="${hooks.selectOption(i)}"`;
        return `<div class="${cls}" ${oc}>
          <span class="nb-option-letter">${String.fromCharCode(65 + i)}</span>
          <span class="nb-option-text">${opt}</span>
          ${mark}
        </div>`;
      })
      .join('');

    const explanationHtml = state.revealed
      ? `<div class="nb-explanation">
           <div class="nb-explanation-title">💡 解析</div>
           ${q.explanation}
         </div>`
      : '';

    const actionsHtml = state.revealed
      ? `<button class="nb-btn nb-btn-primary" onclick="${hooks.nextQuestion}">${
          state.currentIdx === QUESTIONS.length - 1 ? '查看结果 →' : '下一题 →'
        }</button>`
      : `<button class="nb-btn nb-btn-green" onclick="${hooks.submitAnswer}" ${
          !_hasSel(state) ? 'disabled' : ''
        }>确认答案</button>`;

    html = `
      <div class="nb-app">
        <div class="nb-quiz">
          <div class="nb-progress-wrap">
            <div class="nb-progress-bar">
              <div class="nb-progress-fill" style="width:${progress}%"></div>
            </div>
            <div class="nb-progress-text">第 ${state.currentIdx + 1} / ${QUESTIONS.length} 题</div>
          </div>
          <div class="nb-question-card">
            <div class="nb-q-header">
              <span class="nb-q-num">Q${state.currentIdx + 1}</span>
              <span class="nb-q-type">${hooks.typeLabel(q.type)}</span>
            </div>
            <div class="nb-q-text">${q.q}</div>
            ${q.type === 'multi' ? '<div class="nb-q-hint">📝 多选题：可选择多个选项</div>' : ''}
            <div class="nb-options">${optionsHtml}</div>
            ${explanationHtml}
          </div>
          <div class="nb-actions">
            <button class="nb-btn" onclick="${hooks.goBack}">← 返回</button>
            ${actionsHtml}
          </div>
        </div>
      </div>
    `;
  } else if (screen === 'result') {
    const score = state.score;
    const total = QUESTIONS.length;
    const pct = Math.round((score / total) * 100);
    let msg = '';
    if (pct >= 90) msg = '🎉 税务达人！你对税法知识了如指掌！';
    else if (pct >= 70) msg = '👍 不错！大部分税务知识你都掌握了。';
    else if (pct >= 50) msg = '💪 还需努力，继续学习税务知识吧！';
    else msg = '📚 需要加油哦，建议系统学习税法知识。';

    const reviewHtml = QUESTIONS.map((q, i) => {
      const userAns = state.answers[i] || [];
      const correct =
        JSON.stringify([...q.answer].sort()) === JSON.stringify([...userAns].sort());
      const userAnsText =
        userAns.length > 0 ? userAns.map((a) => q.options[a]).join('、') : '未作答';
      const correctAnsText = q.answer.map((a) => q.options[a]).join('、');
      return `
        <div class="nb-review-item">
          <div class="nb-review-q">
            Q${i + 1}. ${q.q}
            <span class="nb-review-status ${correct ? 'nb-review-status-ok' : 'nb-review-status-no'}">
              ${correct ? '✓ 正确' : '✗ 错误'}
            </span>
          </div>
          <div class="nb-review-ans">你的答案：${userAnsText}</div>
          ${
            !correct
              ? `<div class="nb-review-ans nb-review-correct">正确答案：${correctAnsText}</div>`
              : ''
          }
        </div>
      `;
    }).join('');

    html = `
      <div class="nb-app">
        <div class="nb-result">
          <div class="nb-score-card">
            <div class="nb-score-row">
              <span class="nb-score-num">${score}</span><span class="nb-score-total">/${total}</span>
            </div>
            <div class="nb-score-label">${pct} 分</div>
            <div class="nb-score-msg">${msg}</div>
          </div>
          <div class="nb-review">
            <div class="nb-review-title">答题回顾</div>
            ${reviewHtml}
          </div>
          <div class="nb-result-actions">
            <button class="nb-btn nb-btn-primary" onclick="${hooks.startQuiz}">重新答题</button>
          </div>
        </div>
      </div>
    `;
  }

  return { html, css };
}

// ═══════════════════════════════════════════════════════════════
//  风格8: notion（Notion文档风）
// ═══════════════════════════════════════════════════════════════

function render_notion(screen, state, QUESTIONS, hooks) {
  const css = `
    .nt-app {
      --nt-bg: #ffffff;
      --nt-text: #37352f;
      --nt-text-light: #787774;
      --nt-text-gray: #9b9a97;
      --nt-blue: #2383e2;
      --nt-blue-light: #e8f1fc;
      --nt-green: #0f7b6c;
      --nt-green-bg: #edf3ec;
      --nt-green-border: #c4d6c2;
      --nt-red: #e03e3e;
      --nt-red-bg: #fbeaea;
      --nt-orange: #d9730d;
      --nt-orange-bg: #faebdd;
      --nt-border: #e9e9e7;
      --nt-bg-gray: #f7f6f3;
      --nt-bg-hover: #f1f1ef;
      --nt-bg-hover-2: #e8e7e4;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif;
      color: var(--nt-text);
      background: var(--nt-bg);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }

    /* ---------- Breadcrumb ---------- */
    .nt-breadcrumb {
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 10px 96px;
      font-size: 13px;
      color: var(--nt-text-light);
      border-bottom: 1px solid var(--nt-border);
    }
    .nt-breadcrumb-item {
      cursor: pointer;
      padding: 3px 6px;
      border-radius: 4px;
      transition: background 0.12s;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .nt-breadcrumb-item:hover {
      background: var(--nt-bg-hover);
    }
    .nt-breadcrumb-item-current {
      color: var(--nt-text);
      cursor: default;
    }
    .nt-breadcrumb-item-current:hover {
      background: transparent;
    }
    .nt-breadcrumb-sep {
      color: var(--nt-text-gray);
      display: flex;
      align-items: center;
      opacity: 0.6;
    }
    .nt-breadcrumb-icon {
      display: flex;
      align-items: center;
      opacity: 0.7;
    }

    /* ---------- Document ---------- */
    .nt-doc {
      max-width: 720px;
      margin: 0 auto;
      padding: 48px 96px 80px;
    }

    /* Doc header */
    .nt-doc-header {
      margin-bottom: 8px;
    }
    .nt-icon-block {
      width: 68px;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--nt-blue-light);
      border-radius: 6px;
      margin-bottom: 14px;
    }
    .nt-title {
      font-size: 40px;
      font-weight: 700;
      color: var(--nt-text);
      margin: 0 0 4px 0;
      line-height: 1.2;
      letter-spacing: -0.01em;
    }
    .nt-desc {
      font-size: 14px;
      color: var(--nt-text-light);
      margin: 0;
    }

    /* Divider */
    .nt-divider {
      height: 1px;
      background: var(--nt-border);
      margin: 28px 0;
    }

    /* Property table */
    .nt-props {
      font-size: 14px;
      margin-bottom: 24px;
    }
    .nt-prop-row {
      display: flex;
      align-items: center;
      padding: 5px 0;
      gap: 8px;
    }
    .nt-prop-label {
      width: 100px;
      color: var(--nt-text-light);
      font-size: 13px;
      flex-shrink: 0;
    }
    .nt-prop-value {
      color: var(--nt-text);
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .nt-prop-tag {
      display: inline-block;
      padding: 1px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    .nt-prop-tag-blue   { background: var(--nt-blue-light);  color: var(--nt-blue); }
    .nt-prop-tag-green  { background: var(--nt-green-bg);    color: var(--nt-green); }
    .nt-prop-tag-orange { background: var(--nt-orange-bg);   color: var(--nt-orange); }

    /* Callout */
    .nt-callout {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 16px 16px 16px 14px;
      background: var(--nt-bg-gray);
      border-radius: 6px;
      font-size: 14px;
      line-height: 1.65;
      color: var(--nt-text);
      margin-bottom: 16px;
    }
    .nt-callout-icon {
      flex-shrink: 0;
      margin-top: 1px;
      display: flex;
    }

    /* ---------- Progress ---------- */
    .nt-progress-wrap {
      margin-bottom: 28px;
    }
    .nt-progress-bar {
      height: 4px;
      background: var(--nt-border);
      border-radius: 2px;
      overflow: hidden;
    }
    .nt-progress-fill {
      height: 100%;
      background: var(--nt-blue);
      border-radius: 2px;
      transition: width 0.35s ease;
    }
    .nt-progress-text {
      font-size: 12px;
      color: var(--nt-text-gray);
      margin-top: 6px;
    }

    /* ---------- Question ---------- */
    .nt-q-section {
      margin-bottom: 24px;
    }
    .nt-q-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
    }
    .nt-q-type-badge {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 4px;
      background: var(--nt-bg-gray);
      color: var(--nt-text-light);
      font-weight: 500;
    }
    .nt-q-num {
      font-size: 12px;
      color: var(--nt-text-gray);
    }
    .nt-q-text {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.6;
      color: var(--nt-text);
      margin-bottom: 4px;
    }
    .nt-q-hint {
      font-size: 13px;
      color: var(--nt-text-gray);
      margin-bottom: 14px;
    }

    /* ---------- Options (Notion toggle/list-item style) ---------- */
    .nt-option-list {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .nt-option {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px 14px 10px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.12s;
      border-left: 3px solid transparent;
      font-size: 15px;
      line-height: 1.6;
      color: var(--nt-text);
      user-select: none;
    }
    .nt-option:hover {
      background: var(--nt-bg-hover);
    }
    .nt-option-selected {
      border-left-color: var(--nt-green);
      background: var(--nt-green-bg);
    }
    .nt-option-selected:hover {
      background: #e2ebe1;
    }
    .nt-option-correct {
      border-left-color: var(--nt-green);
      background: var(--nt-green-bg);
      cursor: default;
    }
    .nt-option-correct:hover {
      background: var(--nt-green-bg);
    }
    .nt-option-wrong {
      border-left-color: var(--nt-red);
      background: var(--nt-red-bg);
      cursor: default;
    }
    .nt-option-wrong:hover {
      background: var(--nt-red-bg);
    }
    .nt-option-icon {
      flex-shrink: 0;
      margin-top: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
    }
    .nt-option-text {
      flex: 1;
    }

    /* ---------- Explanation (Notion callout) ---------- */
    .nt-explanation {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 16px 16px 16px 14px;
      background: var(--nt-orange-bg);
      border-radius: 6px;
      font-size: 14px;
      line-height: 1.65;
      color: var(--nt-text);
      margin-top: 18px;
    }
    .nt-explanation-title {
      font-weight: 600;
      margin-bottom: 4px;
    }

    /* ---------- Buttons (Notion style) ---------- */
    .nt-actions {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-top: 28px;
    }
    .nt-btn {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 14px;
      font-weight: 500;
      padding: 6px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.12s;
      background: var(--nt-bg-hover);
      color: var(--nt-text);
      line-height: 1.5;
    }
    .nt-btn:hover {
      background: var(--nt-bg-hover-2);
    }
    .nt-btn-primary {
      background: var(--nt-blue);
      color: #fff;
    }
    .nt-btn-primary:hover {
      background: #1b6bc4;
    }
    .nt-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
    .nt-btn:disabled:hover {
      background: var(--nt-bg-hover);
    }
    .nt-btn-primary:disabled:hover {
      background: var(--nt-blue);
    }

    /* ---------- Result ---------- */
    .nt-result-section {
      margin-bottom: 12px;
    }
    .nt-score-display {
      display: flex;
      align-items: baseline;
      gap: 6px;
      margin-bottom: 4px;
    }
    .nt-score-num {
      font-size: 48px;
      font-weight: 700;
      color: var(--nt-text);
      line-height: 1;
    }
    .nt-score-total {
      font-size: 20px;
      color: var(--nt-text-light);
    }
    .nt-score-msg {
      font-size: 15px;
      color: var(--nt-text-light);
      line-height: 1.6;
      margin-bottom: 8px;
    }
    .nt-score-pct {
      font-size: 13px;
      color: var(--nt-text-gray);
    }

    /* Review list */
    .nt-review-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--nt-text);
      margin-bottom: 8px;
      padding-top: 24px;
      border-top: 1px solid var(--nt-border);
    }
    .nt-review-list {
      display: flex;
      flex-direction: column;
    }
    .nt-review-item {
      padding: 12px 14px;
      border-radius: 6px;
      font-size: 14px;
      transition: background 0.12s;
      border-left: 3px solid transparent;
    }
    .nt-review-item:hover {
      background: var(--nt-bg-hover);
    }
    .nt-review-item-ok {
      border-left-color: var(--nt-green);
    }
    .nt-review-item-no {
      border-left-color: var(--nt-red);
    }
    .nt-review-q {
      font-weight: 500;
      color: var(--nt-text);
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
      line-height: 1.5;
    }
    .nt-review-status {
      font-size: 11px;
      padding: 1px 7px;
      border-radius: 4px;
      font-weight: 500;
      flex-shrink: 0;
    }
    .nt-review-status-ok { background: var(--nt-green-bg); color: var(--nt-green); }
    .nt-review-status-no { background: var(--nt-red-bg);   color: var(--nt-red); }
    .nt-review-detail {
      font-size: 13px;
      color: var(--nt-text-light);
      margin-top: 3px;
      line-height: 1.5;
    }
    .nt-review-detail-correct {
      color: var(--nt-green);
    }
  `;

  // ── SVG icons ──
  const ico = {
    doc: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2383e2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>`,
    check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f7b6c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    x: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e03e3e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    circle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9b9a97" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>`,
    circleDot: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f7b6c" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4" fill="#0f7b6c"/></svg>`,
    chevron: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    info: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2383e2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    bulb: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d9730d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>`,
    checkSm: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f7b6c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    xSm: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e03e3e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  };

  // ── helpers ──
  const _sel = (state, i) =>
    Array.isArray(state.selected) ? state.selected.includes(i) : state.selected === i;
  const _hasSel = (state) =>
    Array.isArray(state.selected)
      ? state.selected.length > 0
      : state.selected !== null && state.selected !== undefined;

  const breadcrumb = (items) => `
    <div class="nt-breadcrumb">
      <span class="nt-breadcrumb-icon">${ico.doc}</span>
      ${items
        .map(
          (it, idx) => `
        ${idx > 0 ? `<span class="nt-breadcrumb-sep">${ico.chevron}</span>` : ''}
        <span class="nt-breadcrumb-item ${it.current ? 'nt-breadcrumb-item-current' : ''}" ${
            it.onclick ? `onclick="${it.onclick}"` : ''
          }>${it.label}</span>
      `
        )
        .join('')}
    </div>
  `;

  let html = '';

  if (screen === 'start') {
    html = `
      <div class="nt-app">
        ${breadcrumb([
          { label: '税务知识竞答', onclick: '' },
          { label: '首页', current: true },
        ])}
        <div class="nt-doc">
          <div class="nt-doc-header">
            <div class="nt-icon-block">${ico.doc}</div>
            <h1 class="nt-title">税务知识竞答</h1>
            <p class="nt-desc">测试你对税务知识的了解程度</p>
          </div>
          <div class="nt-divider"></div>
          <div class="nt-props">
            <div class="nt-prop-row">
              <span class="nt-prop-label">题型</span>
              <span class="nt-prop-value">
                <span class="nt-prop-tag nt-prop-tag-blue">单选题</span>
                <span class="nt-prop-tag nt-prop-tag-blue">多选题</span>
              </span>
            </div>
            <div class="nt-prop-row">
              <span class="nt-prop-label">题量</span>
              <span class="nt-prop-value">${QUESTIONS.length} 题</span>
            </div>
            <div class="nt-prop-row">
              <span class="nt-prop-label">限时</span>
              <span class="nt-prop-value"><span class="nt-prop-tag nt-prop-tag-green">无限制</span></span>
            </div>
            <div class="nt-prop-row">
              <span class="nt-prop-label">解析</span>
              <span class="nt-prop-value"><span class="nt-prop-tag nt-prop-tag-orange">即时显示</span></span>
            </div>
          </div>
          <div class="nt-callout">
            <span class="nt-callout-icon">${ico.info}</span>
            <div>本竞答涵盖增值税、个人所得税、企业所得税等核心税法知识。每道题作答后即时显示解析，帮助你查漏补缺。</div>
          </div>
          <div class="nt-actions">
            <button class="nt-btn nt-btn-primary" onclick="${hooks.startQuiz}">开始答题</button>
          </div>
        </div>
      </div>
    `;
  } else if (screen === 'quiz') {
    const q = QUESTIONS[state.currentIdx];
    const progress = ((state.currentIdx + 1) / QUESTIONS.length) * 100;

    const optionsHtml = q.options
      .map((opt, i) => {
        const sel = _sel(state, i);
        let cls = 'nt-option';
        let icon = ico.circle;
        if (state.revealed) {
          if (q.answer.includes(i)) {
            cls += ' nt-option-correct';
            icon = ico.check;
          } else if (sel) {
            cls += ' nt-option-wrong';
            icon = ico.x;
          }
        } else if (sel) {
          cls += ' nt-option-selected';
          icon = ico.circleDot;
        }
        const oc = state.revealed ? '' : `onclick="${hooks.selectOption(i)}"`;
        return `<div class="${cls}" ${oc}>
          <span class="nt-option-icon">${icon}</span>
          <span class="nt-option-text">${opt}</span>
        </div>`;
      })
      .join('');

    const explanationHtml = state.revealed
      ? `<div class="nt-explanation">
           <span class="nt-callout-icon">${ico.bulb}</span>
           <div>
             <div class="nt-explanation-title">解析</div>
             <div>${q.explanation}</div>
           </div>
         </div>`
      : '';

    const actionsHtml = state.revealed
      ? `<button class="nt-btn nt-btn-primary" onclick="${hooks.nextQuestion}">${
          state.currentIdx === QUESTIONS.length - 1 ? '查看结果' : '下一题'
        }</button>`
      : `<button class="nt-btn nt-btn-primary" onclick="${hooks.submitAnswer}" ${
          !_hasSel(state) ? 'disabled' : ''
        }>提交</button>`;

    html = `
      <div class="nt-app">
        ${breadcrumb([
          { label: '税务知识竞答', onclick: hooks.goBack },
          { label: `第 ${state.currentIdx + 1} 题`, current: true },
        ])}
        <div class="nt-doc">
          <div class="nt-progress-wrap">
            <div class="nt-progress-bar">
              <div class="nt-progress-fill" style="width:${progress}%"></div>
            </div>
            <div class="nt-progress-text">${state.currentIdx + 1} / ${QUESTIONS.length}</div>
          </div>
          <div class="nt-q-section">
            <div class="nt-q-meta">
              <span class="nt-q-type-badge">${hooks.typeLabel(q.type)}</span>
              <span class="nt-q-num">第 ${state.currentIdx + 1} 题</span>
            </div>
            <div class="nt-q-text">${q.q}</div>
            ${q.type === 'multi' ? '<div class="nt-q-hint">多选题 · 可选择多个选项</div>' : ''}
            <div class="nt-option-list">${optionsHtml}</div>
            ${explanationHtml}
          </div>
          <div class="nt-actions">
            <button class="nt-btn" onclick="${hooks.goBack}">返回</button>
            ${actionsHtml}
          </div>
        </div>
      </div>
    `;
  } else if (screen === 'result') {
    const score = state.score;
    const total = QUESTIONS.length;
    const pct = Math.round((score / total) * 100);
    let msg = '';
    if (pct >= 90) msg = '你对税务知识了如指掌，非常优秀！';
    else if (pct >= 70) msg = '不错，大部分税务知识你都掌握了。';
    else if (pct >= 50) msg = '还需努力，继续学习税务知识吧。';
    else msg = '建议系统学习税法知识，继续加油。';

    const reviewHtml = QUESTIONS.map((q, i) => {
      const userAns = state.answers[i] || [];
      const correct =
        JSON.stringify([...q.answer].sort()) === JSON.stringify([...userAns].sort());
      const userAnsText =
        userAns.length > 0 ? userAns.map((a) => q.options[a]).join('、') : '未作答';
      const correctAnsText = q.answer.map((a) => q.options[a]).join('、');
      const statusIcon = correct ? ico.checkSm : ico.xSm;
      return `
        <div class="nt-review-item ${correct ? 'nt-review-item-ok' : 'nt-review-item-no'}">
          <div class="nt-review-q">
            ${statusIcon}
            <span>第 ${i + 1} 题</span>
            <span class="nt-review-status ${correct ? 'nt-review-status-ok' : 'nt-review-status-no'}">${correct ? '正确' : '错误'}</span>
          </div>
          <div class="nt-review-detail">${q.q}</div>
          <div class="nt-review-detail">你的答案：${userAnsText}</div>
          ${
            !correct
              ? `<div class="nt-review-detail nt-review-detail-correct">正确答案：${correctAnsText}</div>`
              : ''
          }
        </div>
      `;
    }).join('');

    html = `
      <div class="nt-app">
        ${breadcrumb([
          { label: '税务知识竞答', onclick: hooks.startQuiz },
          { label: '结果', current: true },
        ])}
        <div class="nt-doc">
          <div class="nt-doc-header">
            <div class="nt-icon-block">${ico.doc}</div>
            <h1 class="nt-title">答题结果</h1>
            <p class="nt-desc">${msg}</p>
          </div>
          <div class="nt-divider"></div>
          <div class="nt-result-section">
            <div class="nt-score-display">
              <span class="nt-score-num">${score}</span>
              <span class="nt-score-total">/ ${total}</span>
            </div>
            <div class="nt-score-pct">正确率 ${pct}%</div>
          </div>
          <div class="nt-review-title">答题回顾</div>
          <div class="nt-review-list">${reviewHtml}</div>
          <div class="nt-actions">
            <button class="nt-btn nt-btn-primary" onclick="${hooks.startQuiz}">重新答题</button>
          </div>
        </div>
      </div>
    `;
  }

  return { html, css };
}
