let cur = 0, tab = 'mcq';
const state = {};            // per exam+tab: answers + essay text
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const key = (k) => `${cur}-${k}`;

function setExam(i) { cur = i; const e = EXAMS[i]; tab = e.mcq.length ? 'mcq' : e.tf.length ? 'tf' : 'essay'; render(); }
function setTab(t) { tab = t; render(); }

function render() {
  const e = EXAMS[cur];
  document.getElementById('exam-nav').innerHTML = EXAMS.map((x, i) =>
    `<button class="${i === cur ? 'on' : ''}" onclick="setExam(${i})">Exam ${i + 1}: ${esc(x.name)}</button>`).join('');
  document.getElementById('exam-title').textContent = `Exam ${cur + 1}: ${e.name}`;
  document.getElementById('exam-src').textContent = e.src;
  const tabs = [['mcq', 'MCQ', e.mcq.length], ['tf', 'True / False', e.tf.length], ['essay', 'Essay', e.essay.length]].filter(t => t[2]);
  document.getElementById('tabs').innerHTML = tabs.map(t =>
    `<button class="${t[0] === tab ? 'on' : ''}" onclick="setTab('${t[0]}')">${t[1]} (${t[2]})</button>`).join('');
  const c = document.getElementById('content');
  if (tab === 'mcq') c.innerHTML = e.mcq.map((q, i) => mcqHtml(q, i)).join('');
  else if (tab === 'tf') c.innerHTML = e.tf.map((q, i) => tfHtml(q, i)).join('');
  else c.innerHTML = e.essay.map((q, i) => essayHtml(q, i)).join('');
  updateScore();
  window.scrollTo(0, 0);
}

function mcqHtml(q, i) {
  const k = key('mcq' + i), picked = state[k];
  const L = 'ABCD';
  const opts = q[1].map((o, j) => {
    let cls = 'opt';
    if (picked !== undefined) { cls += ' done'; if (j === q[2]) cls += ' right'; else if (j === picked) cls += ' wrong'; }
    return `<button class="${cls}" onclick="pickMcq(${i},${j})">${L[j]}. ${esc(o)}</button>`;
  }).join('');
  const why = picked === undefined ? '' :
    `<div class="why show"><b>${picked === q[2] ? 'Correct.' : 'Wrong. Correct answer: ' + L[q[2]] + '.'}</b> ${esc(q[3])}</div>`;
  return `<div class="q"><div class="t">${i + 1}. ${esc(q[0])}</div>${q[4] ? `<pre>${esc(q[4])}</pre>` : ''}${opts}${why}</div>`;
}

function pickMcq(i, j) {
  const k = key('mcq' + i);
  if (state[k] !== undefined) return;
  state[k] = j; render2();
}

function tfHtml(q, i) {
  const k = key('tf' + i), picked = state[k];
  const mk = (val, label) => {
    let cls = 'opt';
    if (picked !== undefined) { cls += ' done'; if (val === q[1]) cls += ' right'; else if (val === picked) cls += ' wrong'; }
    return `<button class="${cls}" onclick="pickTf(${i},${val})">${label}</button>`;
  };
  const why = picked === undefined ? '' :
    `<div class="why show"><b>${picked === q[1] ? 'Correct.' : 'Wrong.'} The statement is ${q[1] ? 'TRUE' : 'FALSE'}.</b> ${esc(q[2])}</div>`;
  return `<div class="q"><div class="t">${i + 1}. ${esc(q[0])}</div>${mk(true, 'True')}${mk(false, 'False')}${why}</div>`;
}

function pickTf(i, v) {
  const k = key('tf' + i);
  if (state[k] !== undefined) return;
  state[k] = v; render2();
}

// re-render without jumping to the top
function render2() { const y = window.scrollY; render(); window.scrollTo(0, y); }

function essayHtml(q, i) {
  const k = key('es' + i);
  const txt = state[k] || '';
  const shown = state[k + 'show'];
  return `<div class="q"><div class="t">${i + 1}. ${esc(q[0])}</div>
    <textarea id="es${i}" spellcheck="false" placeholder="Write your code here..." oninput="state['${k}']=this.value">${esc(txt)}</textarea>
    <button class="btn" onclick="showAns(${i})">${shown ? 'Hide' : 'Show'} answer</button>
    <div class="ans ${shown ? 'show' : ''}" id="ans${i}"><b>Model answer:</b><pre>${esc(q[1])}</pre></div></div>`;
}

function showAns(i) {
  const k = key('es' + i);
  state[k + 'show'] = !state[k + 'show'];
  const el = document.getElementById('ans' + i);
  el.classList.toggle('show', state[k + 'show']);
  el.parentElement.querySelector('.btn').textContent = (state[k + 'show'] ? 'Hide' : 'Show') + ' answer';
}

function updateScore() {
  const e = EXAMS[cur];
  let right = 0, total = 0;
  if (tab === 'mcq') { total = e.mcq.length; e.mcq.forEach((q, i) => { if (state[key('mcq' + i)] === q[2]) right++; }); }
  if (tab === 'tf') { total = e.tf.length; e.tf.forEach((q, i) => { if (state[key('tf' + i)] === q[1]) right++; }); }
  const done = tab === 'mcq' ? e.mcq.filter((q, i) => state[key('mcq' + i)] !== undefined).length
    : tab === 'tf' ? e.tf.filter((q, i) => state[key('tf' + i)] !== undefined).length : 0;
  document.getElementById('score').textContent = tab === 'essay' ? 'Write your answer, then press Show answer and check it yourself.' : `Answered ${done}/${total} - Correct ${right}`;
}

// Tab key inserts spaces inside essay textarea
document.addEventListener('keydown', ev => {
  if (ev.key === 'Tab' && ev.target.tagName === 'TEXTAREA') {
    ev.preventDefault();
    const t = ev.target, s = t.selectionStart;
    t.value = t.value.slice(0, s) + '    ' + t.value.slice(t.selectionEnd);
    t.selectionStart = t.selectionEnd = s + 4;
    t.dispatchEvent(new Event('input'));
  }
});

setExam(0);
