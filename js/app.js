/* ==========================================================
   一米智能 · 星宝在家  —— 演示原型
   页面：首页 / 任务 / 训练详情 / 成长 / 我的（含建档评估）
   ========================================================== */

// ---------- 演示数据 ----------
const child = {
  name: '小星',
  ageText: '5岁2个月',
  streak: 6,
  skills: [
    { name: '安坐能力', level: 72 },
    { name: '眼神对视', level: 55 },
    { name: '动作模仿', level: 64 },
    { name: '指令听从', level: 48 },
    { name: '语言表达', level: 40 },
    { name: '精细动作', level: 68 }
  ]
};

const tasks = [
  {
    id: 1, icon: '👀', name: '叫名反应练习', domain: '社交沟通',
    mins: 5, goal: '听到名字后能看向家长并保持眼神接触 2 秒以上',
    materials: '孩子喜欢的小零食或玩具 1 个',
    steps: [
      '与孩子面对面坐下，距离约 50 厘米，手里拿好强化物',
      '用平静清晰的声音叫孩子的名字：「小星」',
      '孩子一旦看向你，立刻给予零食/玩具并夸张地夸奖',
      '如果 3 秒没有反应，可轻碰桌面吸引注意，再叫一次',
      '重复 8–10 次为一组，孩子出现烦躁即停止'
    ],
    script: '「小星～」（停顿等待）「哇，小星看到妈妈啦，真棒！」'
  },
  {
    id: 2, icon: '👏', name: '拍手模仿小游戏', domain: '动作模仿',
    mins: 5, goal: '能在示范后 3 秒内模仿简单的大动作',
    materials: '无需道具，可准备小鼓点音乐',
    steps: [
      '家长与孩子面对面坐好，先说「这样做」',
      '家长边说边慢慢拍手 2 下，动作要清晰夸张',
      '孩子做出近似动作即给予强化，不追求完全标准',
      '熟练后可换动作：摸头、拍腿、举手',
      '每个动作练习 5 次，交替进行保持兴趣'
    ],
    script: '「小星，看妈妈，这样做——」（拍手）「对啦！我们再来一次！」'
  },
  {
    id: 3, icon: '🧸', name: '一步指令：拿取物品', domain: '指令听从',
    mins: 5, goal: '能独立完成「把XX给我」的一步指令',
    materials: '孩子熟悉的玩具 2–3 件',
    steps: [
      '把玩具放在孩子伸手可及的桌面上',
      '发出简短一步指令：「把小熊给妈妈」',
      '孩子完成后立刻强化；未完成时可手把手辅助一次（辅助后要逐渐撤销）',
      '轮换不同物品，避免孩子记住位置而非听懂指令',
      '完成 6–8 次即可结束，保证成功体验'
    ],
    script: '「小星，把小熊给妈妈。」（完成后）「谢谢你！小星听得真仔细！」'
  },
  {
    id: 4, icon: '🍎', name: '常见水果命名', domain: '认知语言',
    mins: 5, goal: '能指认或说出 3 种常见水果名称',
    materials: '水果实物或认知卡片（苹果、香蕉、橙子）',
    steps: [
      '一次只呈现 2 张卡片，避免信息过多',
      '家长清晰命名：「这是苹果」，让孩子跟读',
      '提问「苹果在哪里？」引导孩子指认，指对即强化',
      '孩子能指认后，再提问「这是什么？」引导发音',
      '发音不清晰也给予鼓励，保护表达意愿'
    ],
    script: '「看，这是苹果，苹——果。小星告诉妈妈，哪个是苹果呀？」'
  },
  {
    id: 5, icon: '📿', name: '串珠子练精细', domain: '精细动作',
    mins: 5, goal: '锻炼三指捏取与手眼协调，完成 5 颗串珠',
    materials: '大孔木珠 5–8 颗、硬质细绳 1 根（绳头可缠胶带固定）',
    steps: [
      '家长先示范完整串入一颗珠子，动作放慢',
      '引导孩子一手持绳、一手捏珠，对准孔眼穿入',
      '成功一颗立即表扬；困难时可轻扶孩子手腕辅助',
      '从 3 颗开始逐步增加，完成后一起数数「1、2、3」',
      '全程家长陪同，防止珠子放入口、鼻、耳'
    ],
    script: '「小星的小手真灵活！我们再串一颗，哇——成功啦！」'
  }
];

// 近 7 日训练数据（分钟 / 技能掌握度 %）
const weekData = [
  { d: '周三', mins: 18, mastery: 52 },
  { d: '周四', mins: 25, mastery: 55 },
  { d: '周五', mins: 15, mastery: 57 },
  { d: '周六', mins: 30, mastery: 61 },
  { d: '周日', mins: 22, mastery: 63 },
  { d: '周一', mins: 26, mastery: 66 },
  { d: '今天', mins: 15, mastery: 68 }
];

// ---------- 机构协同数据 ----------
const org = {
  name: '星星桥儿童康复中心（咸阳中心）',
  therapist: '王敏',
  title: '持证康复师 · ABA 方向',
  bindCode: 'XQ-2026'
};

let feedbackMsgs = [
  { from: 't', time: '昨天 20:15', text: '小星这周"指令听从"进步很明显！家里继续保持 15 分钟短时高频练习。下周可以试试两步指令，比如"先拿杯子，再给妈妈"。' },
  { from: 'f', time: '周二 12:30', text: '王老师，他串珠子总是整把手抓，需要纠正吗？' },
  { from: 't', time: '周二 13:02', text: '这个年龄段三指捏不稳是正常的，可以换大孔珠和短绳，平时多玩"捏豆子"过渡，先别急着纠正手势～' }
];

const roster = [
  { id: 1, name: '小星', age: '5岁2月', pkg: '社交沟通基础包', rate: 91, streak: 6, alert: '', mastery: 68, focus: '眼神对视 / 指令听从', last: '今天 19:42' },
  { id: 2, name: '朵朵', age: '4岁6月', pkg: '语言启蒙包', rate: 74, streak: 3, alert: '连续2天未打卡', mastery: 52, focus: '命名 / 仿说', last: '昨天 21:03' },
  { id: 3, name: '阳阳', age: '6岁1月', pkg: '安坐与情绪包', rate: 58, streak: 0, alert: '家长标记情绪崩溃 2 次', mastery: 44, focus: '安坐 / 情绪调节', last: '3天前' },
  { id: 4, name: '乐乐', age: '3岁8月', pkg: '动作模仿入门包', rate: 88, streak: 5, alert: '', mastery: 61, focus: '大动作模仿', last: '今天 18:10' }
];

const childHomeLog = [
  { d: '周一', mins: 26, tasks: '5/5' },
  { d: '周二', mins: 22, tasks: '4/5' },
  { d: '周三', mins: 28, tasks: '5/5' },
  { d: '周四', mins: 15, tasks: '3/5' },
  { d: '周五', mins: 24, tasks: '5/5' },
  { d: '周六', mins: 30, tasks: '5/5' },
  { d: '今天', mins: 25, tasks: '5/5' }
];

let state = {
  view: 'home',
  done: JSON.parse(localStorage.getItem('xb_done') || '[1]'), // 今日已完成
  mood: localStorage.getItem('xb_mood') || '',
  bound: localStorage.getItem('xb_bind') === '1'
};
const save = () => localStorage.setItem('xb_done', JSON.stringify(state.done));

// ---------- 工具 ----------
const $screen = document.getElementById('screen');
const $modal = document.getElementById('modalRoot');
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 1800);
}
function go(view, arg) {
  stopDemo();
  state.view = view;
  document.querySelectorAll('.tab').forEach(t =>
    t.classList.toggle('active', t.dataset.view === view));
  $screen.scrollTop = 0;
  render(arg);
}

// ---------- 渲染入口 ----------
function render(arg) {
  if (state.view === 'home') $screen.innerHTML = viewHome();
  if (state.view === 'tasks') $screen.innerHTML = viewTasks();
  if (state.view === 'taskDetail') {
    $screen.innerHTML = viewTaskDetail(arg);
    if (!coaching) mountDemo(arg);
    bindTaskDetail(arg);
  }
  if (state.view === 'growth') { $screen.innerHTML = viewGrowth(); drawCharts(); }
  if (state.view === 'profile') $screen.innerHTML = viewProfile();
  if (state.view === 'advisor') $screen.innerHTML = viewAdvisor();
  if (state.view === 'orgs') $screen.innerHTML = viewOrgs();
  if (state.view === 'therapistDash') $screen.innerHTML = viewTherapistDash();
  if (state.view === 'therapistChild') $screen.innerHTML = viewTherapistChild(arg);
  bindCommon();
}

// ---------- 首页 ----------
function greeting() {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
  const h = now.getHours();
  if (h < 6)  return { t: '夜深了', e: '🌙' };
  if (h < 11) return { t: '早上好', e: '☀️' };
  if (h < 14) return { t: '中午好', e: '🌤️' };
  if (h < 18) return { t: '下午好', e: '🌤️' };
  return { t: '晚上好', e: '🌙' };
}
function viewHome() {
  const doneCount = state.done.length;
  const pct = Math.round(doneCount / tasks.length * 100);
  const g = greeting();
  return `
    <div class="hero">
      <h1>${g.t}，${child.name}妈妈 ${g.e}</h1>
      <p>今天的 5 个训练小游戏，${pct === 100 ? '已全部完成 🎉' : `已完成 ${doneCount} 个`}</p>
      <div class="slogan">让专业康复训练，走进每一米家庭</div>
    </div>

    <div class="home-row">
      <div class="card"><div class="stat-num">${child.streak}</div><div class="stat-label">连续训练（天）</div></div>
      <div class="card"><div class="stat-num teal">${doneCount * 5}</div><div class="stat-label">今日训练（分钟）</div></div>
      <div class="card"><div class="stat-num teal">${child.skillAvg()}%</div><div class="stat-label">能力综合值</div></div>
    </div>

    <div class="card">
      <div class="section-title">⭐ 今日计划</div>
      <div class="progress-wrap">
        <div class="ring" style="--p:${pct}"><div>${pct}%</div></div>
        <div style="flex:1">
          ${tasks.slice(0, 3).map(t => `
            <div class="mini-task ${state.done.includes(t.id) ? 'done' : ''}">
              <span class="dot"></span>${t.icon} ${t.name}<span class="time">${t.mins}分钟</span>
            </div>`).join('')}
        </div>
      </div>
      <button class="btn" style="margin-top:14px" onclick="go('tasks')">
        ${pct === 100 ? '🎉 今日训练已全部完成' : '开始今天的训练 →'}
      </button>
    </div>

    <div class="card">
      <div class="section-title">💛 家长支持</div>
      <div class="quick-grid">
        <div class="quick-item" onclick="go('advisor')"><span class="qi">🫂</span>情绪疏导</div>
        <div class="quick-item" onclick="openEmergency()"><span class="qi">🆘</span>突发行为<br>应对话术</div>
        <div class="quick-item" onclick="openWeeklyReport()"><span class="qi">📄</span>本周成长<br>周报</div>
      </div>
    </div>

    ${state.bound ? `
    <div class="card org-entry" onclick="go('orgs')">
      <div class="oe-ico">👩‍⚕️</div>
      <div style="flex:1">
        <div style="font-size:14px;font-weight:700">${org.therapist}老师发来新指导</div>
        <div class="small muted" style="margin-top:3px;line-height:1.5">下周可以试试两步指令：「先拿杯子，再给妈妈」…</div>
      </div>
      <div class="oe-badge">2</div>
    </div>` : `
    <div class="card org-entry" onclick="openBind()">
      <div class="oe-ico" style="background:#eef1ff">🔗</div>
      <div style="flex:1">
        <div style="font-size:14px;font-weight:700">绑定康复机构 / 康复师</div>
        <div class="small muted" style="margin-top:3px;line-height:1.5">家庭训练数据自动同步，让康复师远程调整方案</div>
      </div>
      <span class="tag gray">去绑定 ›</span>
    </div>`}

    <div class="notice">
      ⚠️ 安全提示：本产品仅提供康复训练辅助与科普建议，<b>不能替代医生诊断与治疗</b>。
      如孩子出现自伤、伤人、抽搐等紧急情况，请立即就医或拨打 120。
    </div>`;
}

// ---------- 任务列表 ----------
function viewTasks() {
  return `
    <div style="padding:8px 2px 12px">
      <div style="font-size:19px;font-weight:800">今日训练任务</div>
      <div class="small muted" style="margin-top:3px">
        ${new Date().toLocaleDateString('zh-CN')} · 共 ${tasks.length} 项，约 ${tasks.reduce((s,t)=>s+t.mins,0)} 分钟 · 内容依据 ABA / ESDM 循证方法
      </div>
    </div>
    ${tasks.map(t => `
      <div class="card task-card ${state.done.includes(t.id) ? 'done' : ''}" onclick="go('taskDetail', ${t.id})">
        <div class="task-ico">${t.icon}</div>
        <div class="task-body">
          <h3>${t.name}</h3>
          <span class="tag teal">${t.domain}</span>
          <span class="task-meta">⏱ ${t.mins} 分钟 · 目标：${t.goal.slice(0, 14)}…</span>
        </div>
        <div class="task-check">✓</div>
      </div>`).join('')}
    <div class="notice">📌 任务由 AI 根据 ${child.name} 的能力基线每日自动生成，难度会随打卡数据动态调整。</div>`;
}

// ---------- 康复师示范短片（动画分镜） ----------
const demoCues = {
  1: ['面对面坐好，距离约50厘米，手里拿好小零食', '平静清晰地叫孩子的名字：「小星～」', '孩子看向你，立刻给强化物并夸张夸奖', '3秒无反应就轻碰桌面，再叫一次'],
  2: ['与孩子面对面坐好，先说「这样做」', '家长慢慢拍手2下，动作清晰夸张', '孩子做出近似动作就给强化', '熟练后换成摸头、举手等新动作'],
  3: ['把玩具放在孩子伸手可及的桌面上', '发出简短指令：「把小熊给妈妈」', '孩子完成后立刻强化表扬', '没完成可手把手辅助，再逐步撤销'],
  4: ['一次只呈现2张卡片，避免信息过多', '清晰命名：「这是苹果」', '提问「苹果在哪里？」引导指认', '指对就强化，再引导孩子发音'],
  5: ['家长先放慢动作，示范串入一颗珠子', '引导对准孔眼，把绳头穿过去', '成功一颗立即表扬，困难时轻扶手腕', '从3颗开始增加，全程防止误吞']
};
const demoBub = {
  1: ['（面对面坐好）', '小星～', '（咦？）', '看到妈妈啦，真棒！'],
  2: ['这样做～', '啪！啪！', '你也试试～', '对啦！'],
  3: ['把小熊给妈妈', '（伸手去拿）', '（递给妈妈）', '谢谢你！'],
  4: ['一次看两张卡', '这是——苹果', '苹果在哪里？', '指对啦！'],
  5: ['先看妈妈串一颗', '对准小孔穿入', '再来一颗～', '小手真灵活！']
};

const demo = { id: 0, t: 0, dur: 20, playing: false, timer: null, muted: false, phase: -1 };
const DP_N = 4;

function stopDemo() {
  if (demo.timer) { clearInterval(demo.timer); demo.timer = null; }
  demo.playing = false;
  try { window.speechSynthesis && speechSynthesis.cancel(); } catch (e) {}
}
function mountDemo(id) {
  stopDemo();
  demo.id = id; demo.t = 0; demo.phase = -1; demo.playing = false;
  const slot = document.getElementById('demoSlot');
  if (slot) slot.innerHTML = dpShell();
  paintDemo(true);
}
function dpFmt(s) { return `0:${String(Math.round(s)).padStart(2, '0')}`; }
function dpShell() {
  return `
    <div class="dplayer">
      <div class="dp-stage" id="dpStage"></div>
      <div class="dp-ctrl">
        <button class="dp-play" id="dpPlay" onclick="toggleDemo()">▶</button>
        <div class="dp-track" id="dpTrack" onclick="seekDemo(event)"><div class="dp-fill" id="dpFill"></div><div class="dp-knob" id="dpKnob"></div></div>
        <span class="dp-time" id="dpTime">0:00 / 0:20</span>
        <button class="dp-mute" id="dpMute" onclick="toggleMute()">🔊</button>
      </div>
      <div class="dp-note">🟡 演示版采用动画分镜以保护儿童隐私，正式版由持证康复师授权出镜拍摄</div>
    </div>`;
}
function playDemo() {
  if (demo.t >= demo.dur) demo.t = 0;
  demo.playing = true;
  paintDemo();
  demo.timer = setInterval(() => {
    demo.t += 0.2;
    if (demo.t >= demo.dur) { demo.t = demo.dur; stopDemo(); paintDemo(); return; }
    paintDemo();
  }, 200);
}
function toggleDemo() { demo.playing ? stopDemo() || paintDemo() : playDemo(); }
function seekDemo(e) {
  const r = e.currentTarget.getBoundingClientRect();
  const was = demo.playing;
  stopDemo();
  demo.t = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * demo.dur;
  paintDemo();
  if (was) playDemo();
}
function toggleMute() {
  demo.muted = !demo.muted;
  if (demo.muted) { try { speechSynthesis.cancel(); } catch (e) {} }
  else speakCue();
  paintDemo();
}
function speakCue() {
  if (demo.muted || !('speechSynthesis' in window)) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(demoCues[demo.id][demo.phase]);
    u.lang = 'zh-CN'; u.rate = 0.95;
    const v = speechSynthesis.getVoices().find(x => x.lang && x.lang.toLowerCase().includes('zh'));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  } catch (e) {}
}

function paintDemo(force) {
  const stage = document.getElementById('dpStage');
  if (!stage) return;
  const phase = Math.min(DP_N - 1, Math.floor(demo.t / (demo.dur / DP_N)));
  if (force || phase !== demo.phase) {
    demo.phase = phase;
    stage.className = `dp-stage s${demo.id} p${phase}`;
    stage.innerHTML = dpScene(demo.id, phase);
    if (demo.playing) speakCue();
  }
  const pct = demo.t / demo.dur * 100;
  const fill = document.getElementById('dpFill');
  const knob = document.getElementById('dpKnob');
  if (fill) fill.style.width = pct + '%';
  if (knob) knob.style.left = pct + '%';
  const tm = document.getElementById('dpTime');
  if (tm) tm.textContent = `${dpFmt(demo.t)} / 0:20`;
  const btn = document.getElementById('dpPlay');
  if (btn) btn.textContent = demo.t >= demo.dur ? '↻' : (demo.playing ? '⏸' : '▶');
  const mu = document.getElementById('dpMute');
  if (mu) mu.textContent = demo.muted ? '🔇' : '🔊';
  const ov = document.getElementById('dpOverlay');
  if (ov) ov.style.display = demo.playing ? 'none' : 'flex';
}

// 五个任务的分镜场景（人物用 emoji，位置由 .s{id}.p{phase} 控制，CSS 补间动画）
function dpScene(id, p) {
  const bub = `<div class="dp-bub">${demoBub[id][p]}</div>`;
  let inner = '';
  if (id === 1) { // 叫名反应
    inner = `
      <div class="dp-fig mom"><span class="fig-in">👩</span>${p === 1 || p === 3 ? bub : ''}</div>
      <div class="dp-prop toy1">🧸</div>
      <div class="dp-fig kid"><span class="fig-in">🧒</span>${p === 2 ? bub : ''}</div>
      ${p === 3 ? '<div class="dp-stars">✨👀✨</div>' : ''}`;
  } else if (id === 2) { // 拍手模仿
    inner = `
      <div class="dp-fig mom"><span class="fig-in">👩</span>${p === 0 || p === 3 ? bub : ''}</div>
      <div class="dp-clap ca">👏</div>
      <div class="dp-fig kid"><span class="fig-in">🧒</span>${p === 2 ? bub : ''}</div>
      <div class="dp-clap ck">👏</div>
      ${p === 3 ? '<div class="dp-stars">✨👏✨</div>' : ''}`;
  } else if (id === 3) { // 拿取物品
    inner = `
      <div class="dp-fig mom"><span class="fig-in">👩</span>${p === 0 || p === 3 ? bub : ''}</div>
      <div class="dp-table"></div>
      <div class="dp-prop teddy">🧸</div>
      <div class="dp-fig kid"><span class="fig-in">🧒</span>${p === 1 || p === 2 ? bub : ''}</div>
      ${p === 3 ? '<div class="dp-stars">✨🧸✨</div>' : ''}`;
  } else if (id === 4) { // 水果命名
    inner = `
      <div class="dp-fig mom"><span class="fig-in">👩</span>${bub}</div>
      <div class="dp-table wide"></div>
      <div class="dp-card ca">🍎</div>
      <div class="dp-card cb">🍌</div>
      <div class="dp-fig kid"><span class="fig-in">🧒</span></div>
      ${p === 3 ? '<div class="dp-stars">✨🍎✨</div>' : ''}`;
  } else { // 串珠子
    inner = `
      <div class="dp-fig mom"><span class="fig-in">👩</span>${p === 0 || p === 3 ? bub : ''}</div>
      <div class="dp-cord"></div>
      <div class="dp-bead b1"></div>
      <div class="dp-bead b2"></div>
      <div class="dp-bead b3"></div>
      <div class="dp-fig kid"><span class="fig-in">🧒</span>${p === 1 || p === 2 ? bub : ''}</div>
      ${p === 3 ? '<div class="dp-stars">✨📿✨</div>' : ''}`;
  }
  return `
    <div class="dp-room"><span class="dp-win">🪟</span></div>
    <div class="dp-floor"></div>
    ${inner}
    <div class="dp-badge">🎬 康复师示范 · 第 ${p + 1} 步 / 共 4 步</div>
    <div class="dp-overlay" id="dpOverlay" onclick="toggleDemo()"><div class="dp-bigplay">${demo.t >= demo.dur ? '↻' : '▶'}</div></div>
    <div class="dp-caption">${demoCues[id][p]}</div>`;
}

let coaching = false;
function viewTaskDetail(id) {
  const t = tasks.find(x => x.id === id);
  const isDone = state.done.includes(id);
  if (!coaching) {
    return `
      <div class="backbar" onclick="go('tasks')">‹ 返回任务列表</div>
      <div id="demoSlot"></div>
      <div class="card">
        <div style="font-size:17px;font-weight:800">${t.icon} ${t.name}</div>
        <div style="margin:8px 0"><span class="tag teal">${t.domain}</span><span class="tag gray">${t.mins}分钟</span></div>
        <div class="small" style="line-height:1.7;color:var(--ink-2)">
          <b style="color:var(--ink)">训练目标：</b>${t.goal}<br>
          <b style="color:var(--ink)">准备材料：</b>${t.materials}
        </div>
      </div>
      <div class="card">
        <div class="section-title">📝 分步操作指引</div>
        ${t.steps.map((s, i) => `
          <div class="step"><div class="step-no">${i + 1}</div><div class="step-txt">${s}</div></div>`).join('')}
      </div>
      <div class="card">
        <div class="section-title">💬 照着说就可以</div>
        <div class="script-bubble">${t.script}</div>
      </div>
      <div class="card">
        <button class="btn teal" onclick="startCoach(${id})">🎙 开启 AI 语音陪练</button>
        <button class="btn ghost" style="margin-top:10px" onclick="finishTask(${id})" ${isDone ? 'disabled' : ''}>
          ${isDone ? '✓ 今日已完成打卡' : '完成训练，打卡'}
        </button>
      </div>`;
  }
  return `
    <div class="backbar" onclick="stopCoach(${id})">‹ 结束陪练</div>
    <div class="card coach-pulse">
      <div class="coach-orb">🤖</div>
      <div style="font-size:16px;font-weight:800">AI 陪练进行中…</div>
      <div class="small muted" style="margin:6px 0 16px">正在用短句、慢速语音引导孩子完成「${tasks.find(x=>x.id===id).name}」</div>
      <div class="script-bubble" style="text-align:left">
        「${child.name}，看这里～<br>
        做得真好！再试一次好不好？」
      </div>
      <div class="small" style="margin-top:14px;color:var(--teal)">📷 摄像头默认关闭 · 语音仅本地识别 · 家长可随时接管</div>
      <button class="btn" style="margin-top:18px" onclick="stopCoach(${id});finishTask(${id})">孩子完成了，结束并打卡</button>
    </div>`;
}
function bindTaskDetail() {}
function startCoach(id) { coaching = true; render(id); }
function stopCoach(id) { coaching = false; render(id); }
function finishTask(id) {
  if (!state.done.includes(id)) {
    state.done.push(id);
    save();
    toast('🎉 打卡成功！又进步了一点点');
  }
  go('tasks');
}

// ---------- 成长页 ----------
function viewGrowth() {
  const checkedDays = [22, 23, 24, 25, 26, 27, 28, 29, 30]; // 九月打卡日
  const daysInMonth = 30;
  const cells = [];
  ['日','一','二','三','四','五','六'].forEach(w => cells.push(`<div class="cw">${w}</div>`));
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(`<div class="cd ${checkedDays.includes(d) ? 'checked' : ''} ${d === 30 ? 'today' : ''}">${checkedDays.includes(d) ? '✓' : d}</div>`);
  }
  const moods = [
    { e: '😄', v: '轻松' }, { e: '🙂', v: '平稳' }, { e: '😐', v: '一般' },
    { e: '😣', v: '焦虑' }, { e: '😢', v: '崩溃' }
  ];
  return `
    <div style="padding:8px 2px 12px">
      <div style="font-size:19px;font-weight:800">${child.name}的成长轨迹 🌱</div>
      <div class="small muted" style="margin-top:3px">坚持记录，看见每一点微小的进步</div>
    </div>

    <div class="card">
      <div class="section-title">🔥 本月打卡</div>
      <div class="calendar">${cells.join('')}</div>
      <div class="home-row" style="margin-top:12px">
        <div style="flex:1;text-align:center"><div class="stat-num teal">9</div><div class="stat-label">本月训练天数</div></div>
        <div style="flex:1;text-align:center"><div class="stat-num">216</div><div class="stat-label">累计训练分钟</div></div>
      </div>
    </div>

    <div class="card">
      <div class="section-title">📈 近 7 日数据</div>
      <canvas id="chart" class="chart-box"></canvas>
      <div class="small muted" style="text-align:center">柱：每日训练时长（分钟）　线：目标技能掌握度</div>
    </div>

    <div class="card">
      <div class="section-title">📄 本周成长周报</div>
      <div class="report-item"><span>指令听从掌握度</span><b>48% → 68% ↑</b></div>
      <div class="report-item"><span>日均训练时长</span><b>24.4 分钟</b></div>
      <div class="report-item"><span>任务完成率</span><b>91%</b></div>
      <div class="report-item"><span>建议</span><b style="color:var(--primary)">增加眼神对视练习</b></div>
      <button class="btn ghost sm" style="margin-top:12px" onclick="openWeeklyReport()">查看完整周报 / 同步康复师</button>
    </div>

    <div class="card">
      <div class="section-title">💛 今日家长心情</div>
      <div class="mood-row">
        ${moods.map(m => `<div class="mood ${state.mood === m.v ? 'on' : ''}" onclick="setMood('${m.v}',this)" title="${m.v}">${m.e}</div>`).join('')}
      </div>
      <div class="small muted" style="text-align:center;margin-top:6px">照顾好自己，才能更好地陪伴孩子</div>
    </div>`;
}
function setMood(v, el) {
  state.mood = v;
  localStorage.setItem('xb_mood', v);
  document.querySelectorAll('.mood').forEach(m => m.classList.remove('on'));
  el.classList.add('on');
  if (v === '焦虑' || v === '崩溃') {
    toast('抱抱你 🫂 已为你打开情绪疏导');
    setTimeout(() => {
      go('advisor');
      sendAdvisor(v === '崩溃' ? '我今天真的有点撑不住了' : '我最近一直很焦虑，不知道怎么办');
    }, 600);
  } else toast('已记录：' + v);
}

// ---------- 图表（纯 Canvas） ----------
function drawCharts() {
  const cv = document.getElementById('chart');
  if (!cv) return;
  const dpr = window.devicePixelRatio || 1;
  const W = cv.clientWidth, H = cv.clientHeight;
  cv.width = W * dpr; cv.height = H * dpr;
  const ctx = cv.getContext('2d');
  ctx.scale(dpr, dpr);

  const padL = 30, padB = 24, padT = 14, padR = 12;
  const cw = (W - padL - padR) / weekData.length;
  const maxMin = 30;

  // 网格
  ctx.strokeStyle = '#f0e6e0'; ctx.fillStyle = '#a8968d'; ctx.font = '10px sans-serif';
  [0, .5, 1].forEach(r => {
    const y = padT + (H - padT - padB) * r;
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
    ctx.fillText(Math.round(maxMin * (1 - r)), 6, y + 3);
  });

  // 柱
  weekData.forEach((it, i) => {
    const h = (it.mins / maxMin) * (H - padT - padB);
    const x = padL + i * cw + cw * .22, w = cw * .56;
    ctx.fillStyle = i === weekData.length - 1 ? '#ff7a45' : '#ffc4a8';
    roundRect(ctx, x, H - padB - h, w, h, 5); ctx.fill();
    ctx.fillStyle = '#a8968d'; ctx.textAlign = 'center';
    ctx.fillText(it.d, x + w / 2, H - 8);
  });

  // 掌握度折线
  ctx.textAlign = 'left';
  ctx.beginPath();
  weekData.forEach((it, i) => {
    const x = padL + i * cw + cw / 2;
    const y = padT + (1 - it.mastery / 100) * (H - padT - padB) * .9;
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  });
  ctx.strokeStyle = '#2fb5a5'; ctx.lineWidth = 2.5; ctx.stroke();
  weekData.forEach((it, i) => {
    const x = padL + i * cw + cw / 2;
    const y = padT + (1 - it.mastery / 100) * (H - padT - padB) * .9;
    ctx.fillStyle = '#2fb5a5';
    ctx.beginPath(); ctx.arc(x, y, 3.2, 0, 7); ctx.fill();
  });
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
}

// ---------- 我的 / 建档 ----------
function viewProfile() {
  return `
    <div class="card profile-head">
      <div class="avatar">🧒</div>
      <div style="flex:1">
        <h2>${child.name}</h2>
        <div class="small muted">${child.ageText} · 建档于 2026-09-24</div>
        <span class="tag" style="margin-top:6px">循证方案：ABA / ESDM</span>
      </div>
    </div>

    <div class="card">
      <div class="section-title">🎯 能力基线评估</div>
      ${child.skills.map(s => `
        <div class="skill-bar">
          <div class="sb-top"><span>${s.name}</span><span>${s.level}%</span></div>
          <div class="sb-track"><div class="sb-fill" style="width:${s.level}%"></div></div>
        </div>`).join('')}
      <button class="btn ghost sm" style="margin-top:8px" onclick="openAssess()">重新评估 / 修改档案</button>
    </div>

    <div class="card" style="padding:6px 16px">
      <div class="menu-row" onclick="${state.bound ? "go('orgs')" : "openBind()"}">👩‍⚕️ 我的康复师<span class="mr">${state.bound ? org.therapist + '老师' : '去绑定'} ›</span></div>
      <div class="menu-row" onclick="${state.bound ? "go('orgs')" : "openBind()"}">🏥 绑定康复机构<span class="mr">${state.bound ? org.name.slice(0, 8) + '…' : '未绑定'} ›</span></div>
      <div class="menu-row" onclick="go('therapistDash')">💻 机构端工作台（演示）<span class="mr">评审入口 ›</span></div>
      <div class="menu-row" onclick="toast('已订阅：每日 19:30 训练提醒')">⏰ 训练提醒<span class="mr">每天 19:30 ›</span></div>
    </div>

    <div class="card">
      <div class="section-title">🔒 隐私与安全</div>
      <div class="menu-row" style="border:none;padding:9px 0">
        📷 摄像头陪练（默认关闭）<div class="switch off" onclick="this.classList.toggle('off');toast('设置已保存')"></div>
      </div>
      <div class="privacy-card">
        · 儿童影像数据默认不出本机，云端训练仅使用脱敏文本；<br>
        · 所有家庭数据加密存储，家长可随时一键导出或删除；<br>
        · 严格遵守《个人信息保护法》《未成年人网络保护条例》；<br>
        · AI 仅提供训练辅助与科普，不输出诊断结论，不替代就医。
      </div>
    </div>

    <div class="card" style="padding:6px 16px">
      <div class="menu-row" onclick="replayGuide()">🎬 重新观看新手引导<span class="mr">›</span></div>
      <div class="menu-row" onclick="toast('一米智能 · 星宝在家 v0.1 演示版')">ℹ️ 关于我们<span class="mr">v0.1 Demo ›</span></div>
      <div class="menu-row" onclick="logout()" style="color:var(--danger)">🚪 退出登录<span class="mr">›</span></div>
    </div>`;
}
child.skillAvg = () => Math.round(child.skills.reduce((s, k) => s + k.level, 0) / child.skills.length);

// ---------- 家庭端：AI 家长顾问 ----------
const advisorTopics = [
  { t: '我快撑不住了', k: '撑不住' },
  { t: '孩子训练不配合', k: '不配合' },
  { t: '睡眠作息混乱', k: '睡眠' },
  { t: '语言进步慢', k: '语言' },
  { t: '家人不理解我', k: '家人' }
];

const advisorReplies = [
  { kw: ['撑不住', '崩溃', '累', '焦虑', '难过', '哭', '压力'],
    txt: '先给你一个隔空的拥抱 🫂。你不是不够好，而是一个人扛了太多。\n\n我们先做一件小事：放下手机，做 3 次缓慢深呼吸（吸气 4 秒、呼气 6 秒）。\n\n孩子的进步从来不是直线，今天的反复不代表前功尽弃。等你缓过来，可以告诉我今天具体发生了什么，我们一起把它拆成能处理的小步骤。' },
  { kw: ['不配合', '哭闹', '发脾气', '不听', '抗拒'],
    txt: '孩子拒绝训练，很多时候不是"不听话"，而是任务太难、时长太长或环境干扰太多。可以试试：\n\n1️⃣ 把任务再拆小，从他只要做 30 秒就能成功的难度开始；\n2️⃣ 先给 1 分钟自由活动，再用"先做这个，然后可以玩你喜欢的"建立预期；\n3️⃣ 减少桌面杂物，一次只呈现一个教具；\n4️⃣ 他配合的瞬间立刻具体表扬："你看着妈妈眼睛了，真棒！"\n\n记录一下今天用了哪一招，明天我们看效果。' },
  { kw: ['睡眠', '睡', '熬夜', '作息'],
    txt: '睡眠是很多谱系孩子的难题，固定的睡前仪式比强行早睡更有效：\n\n🌙 每天同一顺序：洗澡 → 调暗灯光 → 同一本安静绘本 → 上床；\n睡前 1 小时停掉所有屏幕和剧烈游戏；\n卧室保持安静、遮光，白天保证足够户外活动。\n\n如果长期入睡困难、夜间频繁醒来或打鼾憋气，建议告诉儿保医生，排除生理原因，这不是训练能替代的。' },
  { kw: ['语言', '说话', '不开口', '发音'],
    txt: '语言发展要先有"动机"和"回应"，再追求发音清楚。日常可以做：\n\n🗣 把孩子想要的东西放在看得到拿不到的地方，制造"需要求助"的机会；\n他用眼神、手势或单音表达时，立刻回应并扩展他的意思："哦，你想要苹果——给你苹果"；\n用简短的句子平行描述你们正在做的事，少提问、多旁白。\n\n坚持记录他每周主动表达的次数，比纠结某个音更有意义。' },
  { kw: ['家人', '老公', '老人', '婆婆', '不理解', '吵架'],
    txt: '养育特殊儿童的家庭里，观念冲突太常见了，这不是你的错。\n\n沟通时可以试试"把人拉到同一边"：不说"你们不懂"，而是说"我最近真的很需要你"，再请对方做一件具体的小事（比如周末陪练 15 分钟）。\n\n也可以把康复师的建议或孩子进步的视频发给家人看，让专业的声音代替你去说服。照顾孩子之前，先给自己留一个喘息的缝隙。' },
  { kw: ['打', '咬', '自伤', '摔', '撞', '伤害'],
    txt: '⚠️ 如果孩子正出现自伤或伤人行为，请先保证他和周围人的安全：移开硬物，用软垫保护，不要强行制止或大声训斥。\n\n行为突然加剧可能与疼痛、感官过载或身体不适有关。请尽快联系孩子的康复师或就医评估，并在下方"突发行为应对"里查看分步话术。\n\n你现在安全吗？如果情绪难以承受，也请联系身边的家人陪你一起处理。' }
];
const advisorDefault = '谢谢你愿意告诉我这些。可以再多说一点具体场景吗？比如事情发生在什么时候、当时你和孩子在做什么——细节越具体，我越能帮你一起想办法。\n\n另外提醒：我提供的是养育陪伴与科普建议，不能替代康复师评估和医生诊断哦。';

function loadChat() {
  try { return JSON.parse(localStorage.getItem('xb_chat')) || null; } catch (e) { return null; }
}
function saveChat() { localStorage.setItem('xb_chat', JSON.stringify(state.chat)); }

function viewAdvisor() {
  if (!state.chat) {
    const saved = loadChat();
    state.chat = saved || [
      { role: 'ai', txt: '你好，我是一米智能的家长顾问 🤍\n\n照顾孩子的日子不容易，开心的、委屈的、不知道怎么办的，都可以跟我说。我会一直在这里。' }
    ];
  }
  return `
    <div class="backbar" onclick="go('home')">‹ 返回</div>
    <div class="chat-top">
      <div class="chat-ava">🤍</div>
      <div>
        <div class="chat-name">AI 家长顾问</div>
        <div class="chat-sub">循证养育 · 全天候陪伴 · 非医疗诊断</div>
      </div>
    </div>
    <div class="chat-list" id="chatList">
      ${state.chat.map(m =>
        `<div class="bubble ${m.role === 'me' ? 'me' : 'ai'}"><div class="bub-ava">${m.role === 'me' ? '🙋‍♀️' : '🤍'}</div>
           <div class="bub-txt">${m.txt.replace(/\n/g, '<br>')}</div></div>`).join('')}
      <div class="bubble ai" id="chatTyping" style="display:none">
        <div class="bub-ava">🤍</div><div class="bub-txt typing"><i></i><i></i><i></i></div>
      </div>
    </div>
    <div class="chat-topics" id="chatTopics">
      ${advisorTopics.map(x => `<span onclick="sendAdvisor('${x.k}')">${x.t}</span>`).join('')}
    </div>
    <div class="chat-bar">
      <input id="chatInput" placeholder="说说你现在的感受或疑问…"
             onkeydown="if(event.key==='Enter')sendAdvisor()">
      <button onclick="sendAdvisor()">发送</button>
    </div>`;
}

function sendAdvisor(quick) {
  const $input = document.getElementById('chatInput');
  const text = (typeof quick === 'string' ? quick : $input.value).trim();
  if (!text) return;
  state.chat.push({ role: 'me', txt: text });
  if ($input) $input.value = '';
  saveChat();
  renderChatBubbles();
  document.getElementById('chatTyping').style.display = 'flex';
  scrollChat();
  setTimeout(() => {
    const hit = advisorReplies.find(r => r.kw.some(k => text.includes(k)));
    state.chat.push({ role: 'ai', txt: hit ? hit.txt : advisorDefault });
    saveChat();
    renderChatBubbles();
  }, 900);
}
function renderChatBubbles() {
  const $list = document.getElementById('chatList');
  if (!$list) return;
  $list.innerHTML = state.chat.map(m =>
    `<div class="bubble ${m.role === 'me' ? 'me' : 'ai'}"><div class="bub-ava">${m.role === 'me' ? '🙋‍♀️' : '🤍'}</div>
       <div class="bub-txt">${m.txt.replace(/\n/g, '<br>')}</div></div>`).join('')
    + `<div class="bubble ai" id="chatTyping" style="display:none"><div class="bub-ava">🤍</div><div class="bub-txt typing"><i></i><i></i><i></i></div></div>`;
  const $tp = document.getElementById('chatTopics');
  if ($tp) $tp.style.display = state.chat.length > 3 ? 'none' : 'flex';
  scrollChat();
}
function scrollChat() {
  setTimeout(() => {
    const $s = document.getElementById('screen');
    if ($s) $s.scrollTop = $s.scrollHeight;
  }, 30);
}

// ---------- 成长周报弹窗 ----------
function openWeeklyReport() {
  const done = state.done.length;
  const total = tasks.length;
  const pct = Math.round(done / total * 100);
  $modal.innerHTML = `
    <div class="mask" onclick="if(event.target===this)closeModal()">
      <div class="sheet">
        <h3>📄 本周成长周报</h3>
        <div class="sub">2026.09.24 – 09.30 · 已可同步给康复师</div>
        <div class="report-hero">
          <div><div class="rh-num">${done*5}<span>天</span></div><div class="rh-lbl">有效训练</div></div>
          <div><div class="rh-num">${done*18}<span>分钟</span></div><div class="rh-lbl">本周总时长</div></div>
          <div><div class="rh-num">${pct}<span>%</span></div><div class="rh-lbl">任务完成率</div></div>
        </div>
        <div class="report-sec">🌟 进步亮点</div>
        <div class="report-line">· 叫名反应的眼神接触从 2 秒提升到 5 秒；</div>
        <div class="report-line">· 能独立完成 3 块形状配对，连续 4 天主动说"要"。</div>
        <div class="report-sec">📌 下周建议（AI 初拟，待康复师确认）</div>
        <div class="report-line">· 继续巩固安坐能力，目标延长到 5 分钟；</div>
        <div class="report-line">· 增加一步指令练习（"把杯子给我"）。</div>
        <div class="report-sec">💛 家长状态</div>
        <div class="report-line">本周心情记录平均 3.4/5 分，周三情绪较低，已触发顾问陪伴对话。</div>
        <div class="sheet-actions">
          <button class="btn ghost" onclick="closeModal()">关闭</button>
          <button class="btn" onclick="closeModal();toast('周报已同步给王老师')">同步康复师</button>
        </div>
      </div>
    </div>`;
}

// ---------- 家庭端：康复师协同页 ----------
function viewOrgs() {
  return `
    <div class="backbar" onclick="go('profile')">‹ 返回</div>

    <div class="org-hero">
      <div class="oh-top">
        <div class="oh-avatar">👩‍⚕️</div>
        <div style="flex:1">
          <div style="font-size:17px;font-weight:800">${org.therapist}老师</div>
          <div class="small" style="opacity:.9;margin-top:2px">${org.title}</div>
        </div>
        <span class="oh-online">● 在线</span>
      </div>
      <div class="oh-org">🏥 ${org.name}</div>
      <div class="loop">
        <div class="loop-step"><span>①</span>机构评估</div><i>→</i>
        <div class="loop-step"><span>②</span>家庭执行</div><i>→</i>
        <div class="loop-step"><span>③</span>数据回流</div><i>→</i>
        <div class="loop-step"><span>④</span>方案迭代</div>
      </div>
    </div>

    <div class="card">
      <div class="section-title">💬 指导消息</div>
      <div class="chat">
        ${feedbackMsgs.map(m => `
          <div class="msg ${m.from === 't' ? 't' : 'f'}">
            <div class="bubble">${m.text}<div class="msg-time">${m.time}</div></div>
          </div>`).join('')}
      </div>
      <div class="chat-input">
        <input id="chatText" class="field-input" placeholder="向康复师描述孩子在家的表现…"
               onkeydown="if(event.key==='Enter')sendFamilyMsg()">
        <button class="btn sm" onclick="sendFamilyMsg()">发送</button>
      </div>
    </div>

    <div class="card" style="padding:6px 16px">
      <div class="menu-row" onclick="openWeeklyReport()">📄 同步本周成长周报<span class="mr">上次：今天 ›</span></div>
      <div class="menu-row" onclick="go('therapistDash')">💻 查看机构端工作台（演示视角）<span class="mr">›</span></div>
      <div class="menu-row" onclick="unbindOrg()">🚫 解除机构绑定<span class="mr">›</span></div>
    </div>
    <div class="notice">🔒 仅训练记录与成长数据对康复师可见，家庭聊天、影像等隐私内容默认不同步，可在隐私设置中管理。</div>`;
}
function sendFamilyMsg() {
  const inp = document.getElementById('chatText');
  const txt = inp.value.trim();
  if (!txt) return;
  feedbackMsgs.push({ from: 'f', time: '刚刚', text: txt });
  inp.value = '';
  render();
  toast('消息已发送，康复师将在工作时间回复');
}
function unbindOrg() {
  state.bound = false;
  localStorage.removeItem('xb_bind');
  toast('已解除绑定');
  go('profile');
}

// ---------- 绑定机构弹窗 ----------
function openBind() {
  $modal.innerHTML = `
    <div class="mask" onclick="if(event.target===this)closeModal()">
      <div class="sheet">
        <h3>🔗 绑定康复机构</h3>
        <div class="sub">请向康复师或机构前台索取 6 位绑定码</div>
        <div class="field-label">机构绑定码</div>
        <input class="field-input" id="bindCode" placeholder="例如：XQ-2026（演示码）" maxlength="10" style="text-align:center;letter-spacing:2px;font-size:18px">
        <div class="notice" style="margin-top:14px">绑定后将建立"机构评估—家庭执行—数据回流—方案迭代"协同闭环。<br>演示时可直接输入：<b>XQ-2026</b></div>
        <div class="sheet-actions">
          <button class="btn ghost" onclick="closeModal()">取消</button>
          <button class="btn" onclick="confirmBind()">确认绑定</button>
        </div>
      </div>
    </div>`;
  setTimeout(() => document.getElementById('bindCode').focus(), 100);
}
function confirmBind() {
  const code = document.getElementById('bindCode').value.trim().toUpperCase();
  if (!code) { toast('请输入绑定码'); return; }
  if (code !== org.bindCode) { toast('绑定码有误，请向机构确认（演示码 XQ-2026）'); return; }
  state.bound = true;
  localStorage.setItem('xb_bind', '1');
  closeModal();
  toast('绑定成功：' + org.name);
  go('orgs');
}

// ---------- 机构端：康复师工作台 ----------
function viewTherapistDash() {
  const avgRate = Math.round(roster.reduce((s, r) => s + r.rate, 0) / roster.length);
  const alerts = roster.filter(r => r.alert);
  const totalMins = 1264;
  return `
    <div class="dash-header">
      <div class="backbar" style="color:#fff;padding-bottom:10px" onclick="go('${state.bound ? 'orgs' : 'profile'}')">‹ 返回家庭端</div>
      <div class="dh-row">
        <div>
          <div class="dh-label">机构端 · 康复师工作台</div>
          <div style="font-size:18px;font-weight:800;margin-top:2px">${org.therapist}老师，早上好 👋</div>
          <div class="small" style="opacity:.85;margin-top:3px">${org.name}</div>
        </div>
        <div class="dh-avatar">👩‍⚕️</div>
      </div>
      <div class="kpi-grid">
        <div class="kpi"><div class="kpi-num">${roster.length}</div><div class="kpi-label">在管儿童</div></div>
        <div class="kpi"><div class="kpi-num">${avgRate}%</div><div class="kpi-label">本周平均打卡率</div></div>
        <div class="kpi"><div class="kpi-num" style="color:#ffd36b">${alerts.length}</div><div class="kpi-label">需关注家庭</div></div>
        <div class="kpi"><div class="kpi-num">${totalMins.toLocaleString()}</div><div class="kpi-label">居家训练总分钟</div></div>
      </div>
    </div>

    <div class="card" style="margin-top:14px">
      <div class="section-title">⚠️ 家庭预警（本周）</div>
      ${alerts.map(a => `
        <div class="alert-row" onclick="go('therapistChild', ${a.id})">
          <div class="alert-ico">${a.alert.includes('未打卡') ? '⏰' : '💔'}</div>
          <div style="flex:1">
            <div style="font-size:13.5px;font-weight:700">${a.name} <span class="small muted">· ${a.age}</span></div>
            <div class="small" style="color:var(--danger);margin-top:2px">${a.alert}</div>
          </div>
          <button class="btn sm" style="padding:7px 14px">介入</button>
        </div>`).join('')}
    </div>

    <div class="card">
      <div class="section-title" style="justify-content:space-between;display:flex">
        <span>🧒 在管儿童 · 居家训练动态</span>
        <span class="small muted" style="font-weight:400">点击查看个案 ›</span>
      </div>
      ${roster.map(r => `
        <div class="roster-row" onclick="go('therapistChild', ${r.id})">
          <div class="rr-avatar">🧒</div>
          <div class="rr-body">
            <div class="rr-top">
              <b>${r.name}</b><span class="small muted">${r.age} · ${r.pkg}</span>
              <span class="rr-streak">🔥${r.streak}天</span>
            </div>
            <div class="rate-line">
              <div class="rate-track"><div class="rate-fill" style="width:${r.rate}%;background:${r.rate >= 80 ? 'var(--teal)' : r.rate >= 70 ? 'var(--yellow)' : 'var(--danger)'}"></div></div>
              <span class="small" style="width:38px;text-align:right;color:var(--ink-2)">${r.rate}%</span>
            </div>
            <div class="small muted">重点：${r.focus} · 最近训练 ${r.last}</div>
          </div>
        </div>`).join('')}
    </div>

    <button class="btn ghost" onclick="toast('已向 4 个家庭发送本周训练提醒 ✉️')">📢 一键发送班级训练提醒</button>`;
}

// ---------- 机构端：儿童个案详情 ----------
function viewTherapistChild(id) {
  const r = roster.find(x => x.id === id);
  const maxMin = 30;
  return `
    <div class="dash-header" style="padding-bottom:14px">
      <div class="backbar" style="color:#fff;padding-bottom:10px" onclick="go('therapistDash')">‹ 返回工作台</div>
      <div class="dh-row">
        <div class="dh-avatar" style="width:50px;height:50px;font-size:24px">🧒</div>
        <div style="flex:1">
          <div style="font-size:18px;font-weight:800">${r.name} <span class="small" style="opacity:.85">${r.age}</span></div>
          <div class="small" style="opacity:.85;margin-top:2px">${r.pkg} · 重点：${r.focus}</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:22px;font-weight:800">${r.mastery}</div>
          <div class="small" style="opacity:.85">掌握度</div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:14px">
      <div class="section-title">🏠 近 7 日家庭训练（自动回流）</div>
      ${childHomeLog.map(l => `
        <div class="log-row">
          <span class="small" style="width:42px;color:var(--ink-2)">${l.d}</span>
          <div class="rate-track" style="flex:1"><div class="rate-fill" style="width:${l.mins / maxMin * 100}%"></div></div>
          <span class="small" style="width:70px;text-align:right;color:var(--ink-2)">${l.mins}分钟 ${l.tasks}</span>
        </div>`).join('')}
      <div class="small muted" style="margin-top:8px">数据来源：家庭端每日打卡自动同步 · 影像与聊天内容不可见</div>
    </div>

    <div class="card">
      <div class="section-title">📋 本周 AI 生成任务 · 执行情况</div>
      <div class="report-item"><span>👀 叫名反应练习</span><b style="color:var(--teal)">完成 7/7 次</b></div>
      <div class="report-item"><span>👏 拍手模仿小游戏</span><b style="color:var(--teal)">完成 6/7 次</b></div>
      <div class="report-item"><span>🧸 一步指令：拿取物品</span><b style="color:var(--yellow)">完成 5/7 次</b></div>
      <div class="report-item"><span>🍎 常见水果命名</span><b style="color:var(--yellow)">完成 4/7 次</b></div>
      <div class="report-item"><span>📿 串珠子练精细</span><b style="color:var(--teal)">完成 7/7 次</b></div>
    </div>

    ${r.alert ? `<div class="card" style="background:#fff5f5;border:1px solid #ffd9d9">
      <div style="font-size:13.5px;font-weight:700;color:var(--danger)">⚠️ 系统预警</div>
      <div class="small" style="margin-top:6px;line-height:1.7;color:var(--ink-2)">${r.alert}。建议尽快联系家长了解情况，必要时调整训练强度。</div>
    </div>` : ''}

    <div class="card">
      <div class="section-title">🩺 康复师干预操作</div>
      <button class="btn teal" onclick="openAdjust(${r.id})">🎯 调整下周训练计划</button>
      <button class="btn ghost" style="margin-top:10px" onclick="openFeedback(${r.id})">✉️ 给家长留言指导</button>
      <button class="btn ghost" style="margin-top:10px" onclick="openWeeklyReport()">📄 查看家长同步的周报</button>
    </div>`;
}

// ---------- 机构端：调整计划 ----------
let adjustData = { goals: ['眼神对视', '指令听从'], level: '维持当前强度' };
function openAdjust(childId) {
  const r = roster.find(x => x.id === childId);
  adjustData = { goals: r.focus.split(' / '), level: '维持当前强度' };
  const goalOpts = ['眼神对视', '动作模仿', '指令听从', '两步指令', '语言表达', '安坐能力', '精细动作', '情绪调节'];
  const levels = ['降低强度', '维持当前强度', '提升难度'];
  $modal.innerHTML = `
    <div class="mask" onclick="if(event.target===this)closeModal()">
      <div class="sheet">
        <h3>🎯 调整 ${r.name} 的下周计划</h3>
        <div class="sub">修改后 AI 将在 30 秒内重新生成每日任务，并推送给家长</div>
        <div class="field-label">下周重点能力（可多选）</div>
        <div class="chip-group">
          ${goalOpts.map(g => `<div class="chip ${adjustData.goals.includes(g) ? 'on' : ''}" onclick="toggleAdjGoal('${g}',this)">${g}</div>`).join('')}
        </div>
        <div class="field-label">训练强度</div>
        <div class="chip-group">
          ${levels.map(l => `<div class="chip ${adjustData.level===l?'on':''}" onclick="pickAdjLevel('${l}',this)">${l}</div>`).join('')}
        </div>
        <div class="sheet-actions">
          <button class="btn ghost" onclick="closeModal()">取消</button>
          <button class="btn teal" onclick="toast('✅ 计划已更新并推送给家长');closeModal()">确认并推送</button>
        </div>
      </div>
    </div>`;
}
function toggleAdjGoal(g, el) {
  const arr = adjustData.goals;
  const i = arr.indexOf(g);
  i > -1 ? arr.splice(i, 1) : arr.push(g);
  el.classList.toggle('on');
}
function pickAdjLevel(l, el) {
  adjustData.level = l;
  el.parentNode.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
}

// ---------- 机构端：给家长留言 ----------
function openFeedback(childId) {
  const r = roster.find(x => x.id === childId);
  $modal.innerHTML = `
    <div class="mask" onclick="if(event.target===this)closeModal()">
      <div class="sheet">
        <h3>✉️ 给 ${r.name} 家长留言</h3>
        <div class="sub">留言将出现在家庭端"康复师指导消息"中</div>
        <textarea id="fbText" class="field-input" rows="4" style="resize:none"
          placeholder="例如：本周在家练习辛苦了，建议下周……"></textarea>
        <div class="sheet-actions">
          <button class="btn ghost" onclick="closeModal()">取消</button>
          <button class="btn teal" onclick="confirmFeedback(${childId})">发送指导</button>
        </div>
      </div>
    </div>`;
}
function confirmFeedback(childId) {
  const txt = document.getElementById('fbText').value.trim();
  if (!txt) { toast('请输入留言内容'); return; }
  const r = roster.find(x => x.id === childId);
  feedbackMsgs.push({ from: 't', time: '刚刚', text: `【关于${r.name}】${txt}` });
  closeModal();
  toast('指导留言已发送，家长端将收到提醒');
}

// ---------- 建档评估向导 ----------
let wizard = { step: 0, data: { name: '', age: '', goals: [], mins: '' } };
function openAssess() {
  wizard = { step: 0, data: { name: child.name, age: child.ageText, goals: ['眼神对视', '指令听从'], mins: '15-20' } };
  renderAssess();
}
function renderAssess() {
  const s = wizard.step;
  const goalOpts = ['眼神对视', '动作模仿', '指令听从', '语言表达', '安坐能力', '精细动作', '情绪调节', '社交互动'];
  const body = s === 0 ? `
      <div class="field-label">孩子的昵称</div>
      <input class="field-input" id="fName" value="${wizard.data.name}" placeholder="例如：小星" maxlength="10">
      <div class="field-label">孩子的年龄</div>
      <input class="field-input" id="fAge" value="${wizard.data.age}" placeholder="例如：5岁2个月">`
    : s === 1 ? `
      <div class="field-label">目前最希望提升的能力（可多选）</div>
      <div class="chip-group">
        ${goalOpts.map(g => `<div class="chip ${wizard.data.goals.includes(g) ? 'on' : ''}" onclick="toggleGoal('${g}',this)">${g}</div>`).join('')}
      </div>`
    : s === 2 ? `
      <div class="field-label">每天可用于居家训练的时间</div>
      <div class="chip-group">
        ${['10分钟以内','10-15分钟','15-20分钟','20分钟以上'].map(m =>
          `<div class="chip ${wizard.data.mins===m?'on':''}" onclick="pickMins('${m}',this)">${m}</div>`).join('')}
      </div>
      <div class="notice">🧠 AI 将根据孩子的年龄、能力基线与可投入时间，把康复目标拆解成每日小游戏。</div>`
    : `
      <div style="text-align:center;padding:18px 0">
        <div style="font-size:54px">🌟</div>
        <div style="font-size:17px;font-weight:800;margin:10px 0 6px">个性化计划已生成</div>
        <div class="small muted" style="line-height:1.8">
          服务对象：${wizard.data.name}（${wizard.data.age}）<br>
          重点能力：${wizard.data.goals.join('、')}<br>
          每日训练：${wizard.data.mins} 分钟 · 每周自动调整难度
        </div>
      </div>`;

  $modal.innerHTML = `
    <div class="mask" onclick="if(event.target===this)closeModal()">
      <div class="sheet">
        <h3>${['孩子档案 · 1/3','能力基线 · 2/3','训练节奏 · 3/3','计划生成 🎉'][s]}</h3>
        <div class="sub">信息仅用于生成本周训练方案</div>
        <div class="step-dots">${[0,1,2,3].map(i=>`<i class="${i<=s?'on':''}"></i>`).join('')}</div>
        ${body}
        <div class="sheet-actions">
          ${s > 0 && s < 3 ? '<button class="btn ghost" onclick="assessPrev()">上一步</button>' : ''}
          ${s < 3 ? `<button class="btn" onclick="assessNext()">${s===2?'生成我的计划':'下一步'}</button>`
                   : '<button class="btn" onclick="finishAssess()">开始使用 →</button>'}
        </div>
      </div>
    </div>`;
  if (s === 0) {
    document.getElementById('fName').oninput = e => wizard.data.name = e.target.value;
    document.getElementById('fAge').oninput = e => wizard.data.age = e.target.value;
  }
}
function toggleGoal(g, el) {
  const arr = wizard.data.goals;
  const i = arr.indexOf(g);
  i > -1 ? arr.splice(i, 1) : arr.push(g);
  el.classList.toggle('on');
}
function pickMins(m, el) {
  wizard.data.mins = m;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
}
function assessNext() {
  if (wizard.step === 0) {
    wizard.data.name = document.getElementById('fName').value.trim() || '小星';
    wizard.data.age = document.getElementById('fAge').value.trim() || '5岁2个月';
  }
  wizard.step++;
  renderAssess();
}
function assessPrev() { wizard.step--; renderAssess(); }
function finishAssess() {
  child.name = wizard.data.name;
  child.ageText = wizard.data.age;
  closeModal();
  toast('档案已更新，今日任务已重新生成');
  go('home');
}
function closeModal() { $modal.innerHTML = ''; }

// ---------- 突发行为应对（4 场景急救卡） ----------
const emergencyScenarios = [
  {
    icon: '😭', name: '哭闹崩溃',
    steps: [
      '先保证安全：移开周围硬物，不强行制止动作，也不质问孩子',
      '蹲下、降低音量，用最慢的语速说短句',
      '情绪平复后不追问、不讲道理，用简单选择转移注意',
      '事后简单记录诱因（时间/地点/发生了什么），便于找规律'
    ],
    script: '「妈妈在。小星很生气，对不对？我们慢慢呼吸——呼——」平复后：「喝水，还是抱抱？」',
    redline: '持续 15 分钟以上无法平复，或伴随呕吐、憋气、抽搐，请立即就医。'
  },
  {
    icon: '⚠️', name: '自伤/伤人',
    steps: [
      '立刻移开尖锐、坚硬物品，用软垫或枕头保护孩子头部和周围',
      '不吼叫、不强行抓手或对峙（容易升级对抗），用柔软物轻挡撞击点',
      '请其他家人联系康复师/医生，必要时求助身边成年人',
      '事后按"前因—行为—结果"记录，交由专业人员分析功能'
    ],
    script: '「妈妈会保护你。我们轻轻地，慢慢地——」（保持音量平稳，不喊停）',
    redline: '正在发生且无法保证安全时，立即拨打 120 或前往急诊。行为突然加剧也可能是疼痛或疾病，应尽快就医排查。'
  },
  {
    icon: '🙉', name: '感官过载',
    steps: [
      '迅速降低刺激：关电视/音乐、调暗灯光，尽快离开嘈杂场所',
      '带孩子到提前布置好的"安静角"，允许他自我调节',
      '孩子接受时可给深压拥抱或重力毯；不接受就保持约 1 米安静陪伴',
      '等他主动看向你或回应后，再轻声交流，不追问感受'
    ],
    script: '「声音太大了，妈妈带你去安静的地方。」（动作放慢，不拉扯）',
    redline: '若同时出现呼吸异常、口唇发紫、抽搐或意识改变，立即就医。'
  },
  {
    icon: '🛒', name: '当众躺地',
    steps: [
      '确认地面安全后平静陪伴：不训斥、不围观解释、不在此时满足要求',
      '轻声给一个明确、可预期的短句，然后等待',
      '情绪过后温和地继续原来的要求，做到就立刻具体表扬',
      '回家后复盘诱因；下次出门前提前预告行程、备好安抚物'
    ],
    script: '「妈妈在这里陪你。准备好了，我们就起来。」（不谈判、不说教）',
    redline: '在车流、扶梯、高处等危险场地时，优先抱/护送到安全区域再处理情绪。'
  }
];
let emgIdx = 0;
function openEmergency(i) {
  if (typeof i === 'number') emgIdx = i;
  const s = emergencyScenarios[emgIdx];
  $modal.innerHTML = `
    <div class="mask" onclick="if(event.target===this)closeModal()">
      <div class="sheet emg-sheet">
        <h3>🆘 突发行为应对话术</h3>
        <div class="sub">AI 安全版 · 仅作应急参考，不能替代专业处置</div>
        <div class="emg-banner">如正在发生且无法保证孩子安全，请立即拨打 <b>120</b> 或前往急诊</div>
        <div class="emg-tabs">
          ${emergencyScenarios.map((x, k) =>
            `<div class="emg-tab ${k === emgIdx ? 'on' : ''}" onclick="openEmergency(${k})">${x.icon}<span>${x.name}</span></div>`).join('')}
        </div>
        <div class="emg-body">
          ${s.steps.map((st, k) => `
            <div class="step"><div class="step-no">${k + 1}</div><div class="step-txt">${st}</div></div>`).join('')}
          <div class="section-title" style="font-size:13.5px;margin:12px 0 6px">💬 照着说</div>
          <div class="script-bubble">${s.script}</div>
          <div class="emg-redline">🚨 <b>安全红线：</b>${s.redline}</div>
        </div>
        <div class="sheet-actions">
          <button class="btn ghost" onclick="closeModal();go('advisor')">找 AI 顾问聊聊</button>
          <button class="btn" onclick="closeModal()">我知道了</button>
        </div>
      </div>
    </div>`;
}

// ---------- 公共绑定 ----------
function bindCommon() {
  document.querySelectorAll('.tab').forEach(t =>
    t.onclick = () => go(t.dataset.view));
}

// ---------- 启动流程：启动页 → 新手引导 → 登录 ----------
const $boot = document.getElementById('bootRoot');
let onboardIdx = 0;
let guideReturn = false; // 引导结束后是返回应用还是去登录

const onboardPages = [
  { ico: '🏠', bg: 'boot-bg-1',
    title: '把专业康复，装进每一天',
    desc: '依据 ABA、早期介入丹佛模式等循证方法，AI 把康复目标拆成每天 15 分钟的亲子小游戏，家长照着做就行。' },
  { ico: '👩‍🏫', bg: 'boot-bg-2',
    title: '家长话术，照着说就好',
    desc: '每个训练都有分步指引和示范视频，搭配「家长话术」，老人带娃也能延续机构里的训练内容。' },
  { ico: '🔄', bg: 'boot-bg-3',
    title: '机构家庭，不再脱节',
    desc: '训练数据自动同步给康复师，机构评估—家庭执行—数据回流—方案迭代，孩子进步看得见、跟得上。' }
];

function showSplash(next) {
  $boot.innerHTML = `
    <div class="boot-screen splash">
      <div class="splash-logo">⭐</div>
      <div class="splash-name">一米智能 · 星宝在家</div>
      <div class="splash-slogan">让专业康复训练，走进每一米家庭</div>
      <div class="splash-foot">AI 驱动的特殊儿童居家康复训练助手</div>
    </div>`;
  setTimeout(next, 1800);
}

function showOnboarding() {
  const p = onboardPages[onboardIdx];
  $boot.innerHTML = `
    <div class="boot-screen ${p.bg}">
      <div class="ob-top">
        ${onboardIdx < onboardPages.length - 1
          ? `<span class="ob-skip" onclick="${guideReturn ? 'finishGuide()' : 'enterLogin()'}">跳过 ›</span>` : '<span></span>'}
      </div>
      <div class="ob-ico">${p.ico}</div>
      <div class="ob-title">${p.title}</div>
      <div class="ob-desc">${p.desc}</div>
      <div class="ob-bottom">
        <div class="ob-dots">
          ${onboardPages.map((_, i) => `<i class="${i === onboardIdx ? 'on' : ''}"></i>`).join('')}
        </div>
        <button class="btn" onclick="nextOnboard()">
          ${onboardIdx === onboardPages.length - 1 ? (guideReturn ? '完成' : '开始使用') : '下一步'}
        </button>
      </div>
    </div>`;
}
function nextOnboard() {
  onboardIdx++;
  if (onboardIdx < onboardPages.length) { showOnboarding(); return; }
  guideReturn ? finishGuide() : enterLogin();
}
function finishGuide() {
  sessionStorage.removeItem('xb_replay_guide');
  guideReturn = false;
  localStorage.setItem('xb_onboarded', '1');
  exitBoot();
}

function enterLogin() {
  $boot.innerHTML = `
    <div class="boot-screen boot-bg-1 boot-login">
      <div class="login-head">
        <div class="splash-logo sm">⭐</div>
        <div class="splash-name">一米智能 · 星宝在家</div>
      </div>
      <div class="login-box">
        <button class="btn wx-btn" onclick="doLogin()">
          <span class="wx-ico">💬</span> 微信一键登录
        </button>
        <button class="btn ghost" style="margin-top:12px" onclick="doLogin()">📱 手机号登录（演示）</button>
        <label class="agree" onclick="this.querySelector('i').classList.toggle('on');toggleAgree()">
          <i class="checkbox ${agreed ? 'on' : ''}">✓</i>
          我已阅读并同意 <a onclick="event.stopPropagation();openAgreement('user')">《用户协议》</a>
          与 <a onclick="event.stopPropagation();openAgreement('privacy')">《隐私保护政策》</a>
        </label>
        <div class="login-tip">演示环境，点击任意登录方式即可进入体验</div>
      </div>
    </div>`;
}
let agreed = false;
function toggleAgree() { agreed = !agreed; }
function doLogin() {
  if (!agreed) { toast('请先勾选并阅读用户协议与隐私政策'); return; }
  localStorage.setItem('xb_user', '1');
  localStorage.setItem('xb_onboarded', '1');
  exitBoot();
  toast('欢迎回来，小星妈妈 🌟');
}
function exitBoot() {
  $boot.innerHTML = '';
  $boot.style.display = 'none';
}
function openAgreement(type) {
  const isP = type === 'privacy';
  $modal.innerHTML = `
    <div class="mask" onclick="if(event.target===this)closeModal()">
      <div class="sheet">
        <h3>${isP ? '🔒 隐私保护政策（摘要）' : '📄 用户协议（摘要）'}</h3>
        <div class="sub">正式版本将提供完整协议文本</div>
        <div class="agreement-txt">
          ${isP ? `
          · 我们仅收集生成训练方案所必需的儿童发育信息，遵循最小化原则；<br>
          · 儿童影像、语音默认在本机处理，不上传服务器，家长可随时关闭相关权限；<br>
          · 训练数据加密存储，仅在家长授权后对绑定康复师可见；<br>
          · 家长可随时导出或一键删除全部数据；<br>
          · 我们遵守《个人信息保护法》《未成年人网络保护条例》。`
          : `
          · 本产品提供康复训练辅助与健康科普，<b>不构成医疗诊断或治疗</b>；<br>
          · 孩子出现自伤、伤人、抽搐等紧急情况应立即就医；<br>
          · 训练内容依据公开循证方法整理，正式版将由持证康复师审核；<br>
          · 账号仅限本人家庭使用，请妥善保管。`}
        </div>
        <div class="sheet-actions"><button class="btn" onclick="closeModal()">我知道了</button></div>
      </div>
    </div>`;
}
function logout() {
  localStorage.removeItem('xb_user');
  location.reload();
}
function replayGuide() {
  sessionStorage.setItem('xb_replay_guide', '1');
  location.reload();
}

// ---------- 时钟（北京时间） ----------
function tick() {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
  document.getElementById('clock').textContent =
    String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
}
setInterval(tick, 1000); tick();

// ---------- 启动 ----------
render();
(function boot() {
  const logged = localStorage.getItem('xb_user') === '1';
  const replay = sessionStorage.getItem('xb_replay_guide') === '1';
  if (logged && !replay) { exitBoot(); return; }
  $boot.style.display = 'block';
  onboardIdx = 0;
  showSplash(() => {
    if (replay) { guideReturn = true; showOnboarding(); }
    else if (localStorage.getItem('xb_onboarded') === '1') enterLogin();
    else showOnboarding();
  });
})();
