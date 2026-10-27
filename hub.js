// ---- 메뉴 (상단 탭 · 메인 카드) ----
const PAGES=[
 {f:'start.html',n:'시작하기',d:'설치 → 스타터 킷 → 첫 문장'},
 {f:'guide.html',n:'단계 가이드',d:'단계별 목표 · 할 일 · 완료 기준'},
 {f:'simulate.html',n:'진행 미리보기',d:'첫 문장부터 설계 확정 · 뼈대까지'},
 {f:'prompts.html',n:'프롬프트',d:'복사해서 쓰는 지시문'},
 {f:'types.html',n:'결과물·심사',d:'(가)(나)(다) 유형과 심사표'},
 {f:'faq.html',n:'막혔을 때',d:'자주 막히는 문제 — 먼저 여기'},
 {f:'files.html',n:'자료',d:'스타터 킷 · 샘플 내려받기'},
 {f:'gallery.html',n:'팀 갤러리',d:'제출된 팀 페이지 · 발표 순서'},
];

// ---- 진행 순서 (메인) ----
const STAGES=[
 {n:'강의 + 환경 점검',d:'복습·설치 확인·스타터 킷·작업법',href:'guide.html#s0'},
 {n:'설계 확정',d:'첫 문장 → 문제정의문 → 유형 → 인터뷰 → 기획서.md 확정',href:'guide.html#s1'},
 {n:'뼈대 생성',d:'같은 대화에서 이어서, 첫 화면부터 섹션마다 확인',href:'guide.html#s2'},
 {n:'시연 기능',d:'핵심 기능 1개, 테스트, 오류 수정',href:'guide.html#s3'},
 {n:'다듬기·발표 준비',d:'AI 티 점검, 발표 대본, AI 활용 정리',href:'guide.html#s4'},
 {n:'제출',d:'폴더 압축 → USB → 갤러리 등록',href:'guide.html#s5'},
 {n:'발표·심사',d:'팀별 발표와 피드백',href:'gallery.html'},
];
const STEPS=[
 {k:0,title:'강의 + 환경 점검',goal:'Claude Code가 파일을 만들고, 더블클릭으로 열린다',
  todo:['스타터킷.zip 압축 풀기 → 폴더 이름 조이름_아이템명','VS Code에서 폴더 열기 → Claude 채팅창','채팅 입력창 아래 모드 버튼(처음엔 Manual)을 눌러 ‘Edit automatically’로 — Shift+Tab으로도 바뀜','test.html 만들기 → 더블클릭으로 열어 보기','역할 정하기: 지시 담당 1명, 확인 담당 1명'],
  done:'노트북 1대 이상에서 test.html이 열림',stuck:'한 대라도 되면 그 노트북으로 시작. 나머지는 강사가 1:1로 봐 줍니다'},
 {k:1,title:'설계 확정',goal:'인터뷰로 기획서.md를 채워 확정하고, DESIGN.md를 만든다',
  todo:['#시작 전 · 팀이 직접 (안 해도 시작은 됩니다)','기획서.md 0절에 문제정의문(문제정의서 8번) 붙여 넣기','기획서.md 3절 표에 2일차 기능 초안 모으기 — 5개 이내, ★ 1개','디자인 방향 정하기 — (A)면 DESIGN.md를, (B)면 캡처를 폴더에',
   '#Claude Code가 이끄는 순서 · 대답만','“claude.md 파일을 읽고 html 페이지 작성 시작해”','문제정의문 다섯 칸 확인 — 0절이 비어 있으면 이때 붙여 넣기','결과물 유형 고르기 — 기본 (다)','인터뷰 6묶음 답하기 — 묶음마다 기획서.md에 적힘','요약 보고 “이대로 해줘” → 기획서.md 상태 ‘확정’'],
  done:'기획서.md 상태가 ‘확정’, 폴더에 DESIGN.md가 생김',stuck:'답이 막히면 “추천해줘”. 인터뷰가 20분을 넘으면 “남은 질문은 추천안으로 채우고 요약 보여줘”',
  more:['simulate.html','이 단계 미리 보기 →']},
 {k:2,title:'뼈대 생성',goal:'같은 대화에서 이어서, 첫 화면부터 섹션이 하나씩 보인다',
  todo:['#새 프롬프트 없이 같은 대화에서 이어집니다','“브라우저에서 확인하세요”가 나오면 index.html 더블클릭','첫 화면에 대상자의 말 한 문장이 있는가','맞으면 “확인했어”, 다르면 고칠 점을 한 가지씩','소개 → 문제와 대상 → 기능 소개도 같은 방식으로 확인','백업: 폴더 복사 (조이름_뼈대)'],
  done:'첫 화면부터 기능 소개까지 브라우저에서 보임',stuck:'빈 화면이 계속되면 손 들기. 강사가 우선 지원합니다'},
 {k:3,title:'시연 기능',goal:'핵심 기능 1개가 클릭·입력에 반응한다',
  todo:['Claude Code가 시연 기능 차례라고 하면 그대로 진행','대화가 끊겼으면 새 대화에서 “CLAUDE.md와 기획서.md를 읽고 이어서 진행해”','확인 담당이 직접 눌러 보기 — 문제정의문의 ‘변화’가 보이는가','로그인·결제·지도·문자는 흉내만, ‘다음 단계’로 표시','멀티 페이지면 페이지 추가와 메뉴 연결','백업: 폴더 복사 (조이름_시연)'],
  done:'누르면 화면이 바뀌는 기능 1개',stuck:'두 번 고쳐도 안 되면 “방금 전 상태로 되돌려줘” → 기능을 더 작게 쪼개서 다시'},
 {k:4,title:'다듬기·발표 준비',goal:'AI 티를 걷어 내고 발표에 쓸 대본과 AI 활용 설명을 준비한다',
  todo:['“AI 티 나는 부분 5개 찾아서 고쳐줘”','“발표 대본 도와줘”','“AI 활용 과정 정리해줘”'],
  done:'발표 대본과 AI 활용 정리가 준비됨',stuck:'시간이 없으면 다듬기를 멈추고 리허설부터. 되는 기능 1개가 예쁜 기능 3개보다 낫습니다'},
 {k:5,title:'제출',goal:'갤러리에 우리 팀 카드가 켜진다',
  todo:['“제출 점검해줘” → 지적된 것 고치기','폴더 이름 조이름_아이템명, index.html은 폴더 바로 안에','폴더 전체를 zip으로 압축 → 강사 USB','강사 노트북에서 열리는지 같이 확인'],
  done:'갤러리 카드가 켜짐',stuck:'압축이 안 되면 폴더째 USB에 복사'},
];
const PROMPTS=[
 {t:'시작',p:'claude.md 파일을 읽고 html 페이지 작성 시작해'},
 {t:'문제정의문 붙이기',p:'우리 팀 문제정의문이야: [문제정의서 8번 문장을 그대로]'},
 {t:'계획 먼저',p:'만들기 전에 어떤 파일을 어떻게 바꿀지 계획만 보여줘. 내가 확인하면 그다음에 만들어'},
 {t:'한 섹션만',p:'[소개] 섹션만 만들어줘. 다른 섹션은 다음에'},
 {t:'시연 기능',p:'[★ 기능 이름]만 만들어줘. [누가]가 [무엇을 누르면] [무엇이 보이게]. 다른 건 건드리지 마'},
 {t:'범위 제한',p:'[style.css]만 고치고 다른 파일은 건드리지 마'},
 {t:'수정 요청',p:'[첫 화면 제목이 너무 작아]. [제목만] [두 배로 키우고] 나머지는 그대로 둬'},
 {t:'되돌리기',p:'방금 변경 취소해줘'},
 {t:'막혔을 때',p:'[“먹었어요” 버튼]을 눌렀는데 [아무 일도 없어]. 원인이 될 만한 것 세 가지를 들고, 가장 유력한 것부터 하나씩 고쳐줘'},
 {t:'상태 저장 → 새 대화',p:'지금까지 결정한 것과 현재 상태를 기획서.md에 정리해서 저장해줘'},
 {t:'새 대화에서 이어가기',p:'CLAUDE.md와 기획서.md를 읽고 이어서 진행해'},
 {t:'AI 티 점검',p:'AI 티 나는 부분 5개 찾아서 고쳐줘'},
 {t:'발표 준비',p:'AI 활용 과정 정리해줘'},
 {t:'발표 준비',p:'발표 대본 도와줘'},
 {t:'제출 전',p:'제출 점검해줘'},
];
const TEAM_COUNT=10; // 참가 팀 수 — 갤러리의 빈 카드 수와 메인의 "n/10팀"에 쓰임
const TEAMS=[
 // 등록 순서 = 발표 순서. teams/<폴더명>/index.html 을 올린 뒤 아래 형식으로 한 줄씩 추가
 // {name:'약손',item:'오늘약',dir:'약손_오늘약'},
];

const $=id=>document.getElementById(id);

// ---- 상단바 · 탭 · 풋터 ----
const here=location.pathname.split('/').pop()||'index.html';
document.body.insertAdjacentHTML('afterbegin',`<div class="top"><div class="wrap">
  <a class="brand" href="index.html" style="text-decoration:none">BHU AIDX 아이디어톤 <small>3일차 · 바이브코딩 허브</small></a>
</div></div>
<nav class="tabs"><div class="wrap"><a href="index.html"${here==='index.html'?' class="on"':''}>메인</a>${PAGES.map(p=>`<a href="${p.f}"${p.f===here?' class="on"':''}>${p.n}</a>`).join('')}</div></nav>`);
document.body.insertAdjacentHTML('beforeend',`<footer><div class="wrap">부산보건대학교 2026 AIDX 기반 부산광역시 지역사회 현안 해결 아이디어톤 · 3일차 바이브코딩 허브 · 강사용 페이지입니다. 팀 결과물의 인물·기관·수치는 모두 가상입니다.</div></footer>`);

// ---- 진행 순서 (메인) ----
const tl=$('timeline');
if(tl)STAGES.forEach((s,i)=>{const el=document.createElement('a');el.className='tl';el.href=s.href;el.innerHTML=`<div class="t">${i<STAGES.length-1?`${i}단계`:'마무리'}</div><div class="n">${s.n}</div><div class="d">${s.d}</div>`;tl.appendChild(el);});

// ---- 메인 메뉴 카드 ----
const mg=$('menuGrid');
if(mg)PAGES.forEach((p,i)=>{const a=document.createElement('a');a.href=p.f;a.innerHTML=`<div class="k">${String(i+1).padStart(2,'0')}</div><b>${p.n}</b><span>${p.f==='gallery.html'?`${TEAMS.length}/${TEAM_COUNT}팀 등록 · `:''}${p.d}</span>`;mg.appendChild(a);});

// ---- 단계 가이드 ----
const sw=$('steps');
const say=t=>t.replace(/“([^”]+)”/g,'<span class="say">$1</span>'); // Claude Code에 그대로 입력하는 말
if(sw){
  STEPS.forEach((s,i)=>{const el=document.createElement('div');el.className='step';el.id='s'+s.k;
  el.innerHTML=`<div class="step-h"><span class="sn">${s.k}</span><div><h3>${s.title}</h3><p class="goal">${s.goal}</p></div><span class="prog"></span></div>
  <div class="step-b"><ul class="chk">${s.todo.map((t,j)=>t.startsWith('#')?`<li class="grp">${t.slice(1)}</li>`:`<li><label><input type="checkbox" data-id="s${i}-${j}"><span>${say(t)}</span></label></li>`).join('')}</ul>
  <div class="side"><div class="box ok"><h4>완료 기준</h4><p>${s.done}</p></div><div class="box help"><h4>막혔을 때</h4><p>${say(s.stuck)}</p></div>${s.more?`<a class="more" href="${s.more[0]}">${s.more[1]}</a>`:''}</div></div>`;sw.appendChild(el);});
}
const prog=()=>document.querySelectorAll('.step').forEach(el=>{const c=el.querySelectorAll('input'),n=[...c].filter(x=>x.checked).length;el.querySelector('.prog').textContent=`${n}/${c.length}`;el.classList.toggle('all',n===c.length);});
try{document.querySelectorAll('.chk input[data-id]').forEach(c=>{c.checked=localStorage.getItem('chk_'+c.dataset.id)==='1';c.onchange=()=>{localStorage.setItem('chk_'+c.dataset.id,c.checked?'1':'0');prog();};});}catch(e){}
if(sw)prog();

// ---- 프롬프트 ----
const pg=$('promptGrid');
if(pg)PROMPTS.forEach(p=>{const el=document.createElement('div');el.className='cmd';const html=p.p.replace(/\[([^\]]+)\]/g,'<span class="blank">[$1]</span>');el.innerHTML=`<pre><small style="color:var(--ink-2);font-weight:700">${p.t}</small><br>${html}</pre><button class="copy">복사</button>`;pg.appendChild(el);});
document.addEventListener('click',e=>{if(!e.target.classList.contains('copy'))return;const pre=e.target.parentElement.querySelector('pre');const txt=pre.innerText.split('\n').slice(pre.querySelector('small')?1:0).join('\n');navigator.clipboard.writeText(txt).then(()=>{e.target.textContent='복사됨';e.target.classList.add('ok');setTimeout(()=>{e.target.textContent='복사';e.target.classList.remove('ok');},1200);});});

// ---- 팀 갤러리 ----
const tg=$('teams');
if(tg){
  TEAMS.forEach((t,i)=>{const el=document.createElement('div');el.className='team';
    el.innerHTML=`<div class="no">발표 ${i+1}번째</div><div class="nm">${t.name}</div><div class="it">${t.item}</div><a href="teams/${encodeURI(t.dir)}/index.html" target="_blank">열기 →</a>`;tg.appendChild(el);});
  for(let i=TEAMS.length;i<TEAM_COUNT;i++){const el=document.createElement('div');el.className='team off';
    el.innerHTML=`<div class="no">대기</div><div class="nm">미등록</div><div class="it">제출 후 표시</div>`;tg.appendChild(el);}
}

// 글꼴·카드가 다 그려진 뒤 주소의 #위치로 다시 이동
addEventListener('load',()=>{if(location.hash){const t=document.querySelector(location.hash);if(t)t.scrollIntoView({behavior:'instant'});}});
