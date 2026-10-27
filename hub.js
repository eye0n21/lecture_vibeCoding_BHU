// ---- 메뉴 (상단 탭 · 메인 카드) ----
const PAGES=[
 {f:'start.html',n:'시작하기',d:'설치 → 스타터 킷 → 첫 문장'},
 {f:'simulate.html',n:'진행 미리보기',d:'첫 문장부터 기획서.md · DESIGN.md까지'},
 {f:'guide.html',n:'단계 가이드',d:'단계별 목표 · 할 일 · 완료 기준'},
 {f:'prompts.html',n:'프롬프트',d:'복사해서 쓰는 지시문'},
 {f:'types.html',n:'결과물·심사',d:'(가)(나)(다) 유형과 심사표'},
 {f:'faq.html',n:'막혔을 때',d:'자주 막히는 문제 — 먼저 여기'},
 {f:'files.html',n:'자료',d:'스타터 킷 · 샘플 내려받기'},
 {f:'gallery.html',n:'갤러리·발표',d:'제출된 팀 페이지 · 발표 준비'},
];

// ---- 진행 순서 (메인) ----
const STAGES=[
 {n:'강의 + 환경 점검',d:'복습·설치 확인·스타터 킷·작업법',href:'guide.html#s0'},
 {n:'설계 확정',d:'기능명세서 합치기 → 문제정의문 → 유형 → 인터뷰 → 기획서.md',href:'guide.html#s1'},
 {n:'뼈대 생성',d:'첫 화면과 소개 섹션, 브라우저 확인',href:'guide.html#s2'},
 {n:'시연 기능',d:'핵심 기능 1개, 테스트, 오류 수정',href:'guide.html#s3'},
 {n:'다듬기·발표 준비',d:'AI 티 점검, 시연 모드, 2분 동선',href:'guide.html#s4'},
 {n:'제출',d:'폴더 압축 → USB → 갤러리 등록',href:'guide.html#s5'},
 {n:'발표·심사',d:'팀별 발표와 피드백',href:'gallery.html#present'},
];
const STEPS=[
 {k:0,title:'0 강의 + 환경 점검',goal:'10팀 모두 Claude Code가 파일을 만들고, 더블클릭으로 열리는 것을 확인',
  todo:['VS Code + Claude Code 로그인 상태 확인(팀원 전원)','스타터킷.zip 압축 풀고 폴더 이름을 팀번호_아이템명으로','VS Code에서 폴더 열기 → Claude 채팅창','테스트 지시로 test.html 생성 → 더블클릭 확인','지시 담당 1명, 확인 담당 1명 정하기'],
  done:'팀의 노트북 1대 이상에서 test.html이 열림',stuck:'노트북 한 대라도 되면 그 노트북으로 시작. 나머지는 Part 2 동안 강사가 1:1'},
 {k:1,title:'1 설계 확정',goal:'Claude Code 인터뷰를 끝내고 기획서.md가 저장됨',
  todo:['2일차에 각자 쓴 기능명세서를 모아 기능명세서.md에 5개 이내로, ★ 1개','디자인 방향 (A) getdesign / (B) 참고 캡처 / (C) 대화 중 하나 — 못 정하면 (C)','“claude.md 파일을 읽고 html 페이지 작성 시작해”','1일차 문제정의문(문제정의서 8번)을 그대로 붙이기 → 다섯 칸 확인','결과물 유형 (가)/(나)/(다) 고르기 — 기본 (다)','인터뷰 6묶음 답하기 → 요약 확인 → 기획서.md 저장'],
  done:'폴더에 기획서.md와 DESIGN.md가 생김',stuck:'질문에 답을 못 하겠으면 “추천해줘”. 인터뷰는 20분 상한 — 넘어가면 “남은 질문은 추천안으로 채우고 요약 보여줘”'},
 {k:2,title:'2 뼈대 생성',goal:'index.html이 열리고 첫 화면에 아이템 소개가 보임',
  todo:['Claude Code가 “브라우저에서 확인하세요”라고 할 때마다 index.html 더블클릭','첫 화면: 대상자의 말 한 문장이 보이는가','소개·문제 섹션에 문제정의문이 들어갔는가','한 섹션 = 한 지시. 확인 후 다음 섹션','뼈대가 보이면 폴더 복사해서 백업(팀명_뼈대)'],
  done:'첫 화면 + 소개 섹션이 브라우저에서 보임',stuck:'이 단계가 끝날 때까지 빈 화면이면 손 들기 — 강사가 우선 지원'},
 {k:3,title:'3 시연 기능',goal:'핵심 기능 1개가 클릭·입력에 반응함',
  todo:['새 대화 시작 권장: “CLAUDE.md와 기획서.md를 읽고 이어서 진행해”','“★ 기능만 만들어줘. 다른 건 다음에”','확인 담당이 실제로 눌러 보기 — 결과 화면에 문제정의문의 ‘변화’가 보이는가','로그인·결제·지도·문자는 화면만 흉내, “다음 단계”로 표시','멀티 페이지 팀은 페이지 추가와 메뉴 연결','기능이 되면 폴더 복사해서 백업(팀명_시연)'],
  done:'누르면 화면이 바뀌는 기능 1개',stuck:'두 번 고쳐도 안 되면 “방금 전 상태로 되돌려줘” → 기능을 더 작게 쪼개서 다시'},
 {k:4,title:'4 다듬기·발표 준비',goal:'시연 리허설 1회 완료',
  todo:['“AI 티 나는 부분 5개 찾아서 고쳐줘”','“시연 모드로 정리해줘” — 첫 화면에서 시연까지 가장 짧게','팀 섹션에 학과별 역할 적기(연합팀 가산점)','“AI 활용 과정 정리해줘” → 발표 담당이 자기 말로','“발표 대본 도와줘” → 2분 동선 표','발표자가 아닌 사람이 눌러 보며 2분 재기'],
  done:'리허설 1회, 2분 안에 끝남',stuck:'시간이 없으면 다듬기를 멈추고 리허설부터. 되는 기능 1개가 예쁜 기능 3개보다 낫습니다'},
 {k:5,title:'5 제출',goal:'갤러리에 10팀 등록',
  todo:['“제출 점검해줘” 실행 → 지적된 것 고치기','폴더 이름 팀번호_아이템명, index.html이 폴더 바로 안에','폴더 전체 압축(zip) → 강사 USB','강사 노트북에서 열리는지 같이 확인'],
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
 {t:'발표 준비',p:'시연 모드로 정리해줘'},
 {t:'발표 준비',p:'AI 활용 과정 정리해줘'},
 {t:'발표 준비',p:'발표 대본 도와줘'},
 {t:'제출 전',p:'제출 점검해줘'},
];
const TEAMS=[1,2,3,4,5,6,7,8,9,10].map(n=>({no:n,name:'',item:'',dir:''}));
// 등록 방법: teams/<폴더명>/index.html 을 올린 뒤 아래처럼 채우기 → TEAMS[2]={no:3,name:'3조',item:'오늘약',dir:'3조_오늘약'}

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
if(mg){const on=TEAMS.filter(t=>t.dir).length;
  PAGES.forEach((p,i)=>{const a=document.createElement('a');a.href=p.f;a.innerHTML=`<div class="k">${String(i+1).padStart(2,'0')}</div><b>${p.n}</b><span>${p.f==='gallery.html'?`${on}/10팀 등록 · `:''}${p.d}</span>`;mg.appendChild(a);});}

// ---- 단계 가이드 ----
const sw=$('steps');
if(sw)STEPS.forEach((s,i)=>{const el=document.createElement('div');el.className='step';el.id='s'+s.k;el.dataset.k=s.k;
  el.innerHTML=`<h3>${s.title}</h3><p style="margin:6px 0 0"><b>목표</b> · ${s.goal}</p>
  <div class="cols"><div><h4>할 일</h4><ul class="chk">${s.todo.map((t,j)=>`<li><input type="checkbox" data-id="s${i}-${j}"><span>${t}</span></li>`).join('')}</ul></div>
  <div><h4>완료 기준</h4><p class="done-note">${s.done}</p></div><div><h4>막혔을 때</h4><p style="font-size:15px;color:var(--ink-2)">${s.stuck}</p></div></div>`;sw.appendChild(el);});
try{document.querySelectorAll('.chk input[data-id]').forEach(c=>{c.checked=localStorage.getItem('chk_'+c.dataset.id)==='1';c.onchange=()=>localStorage.setItem('chk_'+c.dataset.id,c.checked?'1':'0');});}catch(e){}

// ---- 프롬프트 ----
const pg=$('promptGrid');
if(pg)PROMPTS.forEach(p=>{const el=document.createElement('div');el.className='cmd';const html=p.p.replace(/\[([^\]]+)\]/g,'<span class="blank">[$1]</span>');el.innerHTML=`<pre><small style="color:var(--ink-2);font-weight:700">${p.t}</small><br>${html}</pre><button class="copy">복사</button>`;pg.appendChild(el);});
document.addEventListener('click',e=>{if(!e.target.classList.contains('copy'))return;const pre=e.target.parentElement.querySelector('pre');const txt=pre.innerText.split('\n').slice(pre.querySelector('small')?1:0).join('\n');navigator.clipboard.writeText(txt).then(()=>{e.target.textContent='복사됨';e.target.classList.add('ok');setTimeout(()=>{e.target.textContent='복사';e.target.classList.remove('ok');},1200);});});

// ---- 팀 갤러리 ----
const tg=$('teams');
if(tg)TEAMS.forEach(t=>{const on=!!t.dir;const el=document.createElement('div');el.className='team'+(on?'':' off');
  el.innerHTML=`<div class="no">${t.no}조</div><div class="nm">${t.name||'미등록'}</div><div class="it">${t.item||'제출 후 표시'}</div><a href="${on?`teams/${encodeURI(t.dir)}/index.html`:'#'}" target="_blank">${on?'열기 →':'대기'}</a>`;tg.appendChild(el);});

// 글꼴·카드가 다 그려진 뒤 주소의 #위치로 다시 이동
addEventListener('load',()=>{if(location.hash){const t=document.querySelector(location.hash);if(t)t.scrollIntoView({behavior:'instant'});}});
