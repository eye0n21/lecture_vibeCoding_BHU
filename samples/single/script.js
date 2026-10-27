// 오늘약 — 시연용 가짜 데이터와 동작
// 모든 데이터는 가상의 인물·장소입니다. 실제 서버와 연결되어 있지 않습니다.

const 어르신 = { 이름: "김순자", 나이: 74, 동네: "감나무골" };
const 보호자 = { 이름: "박지은", 관계: "딸", 지역: "서울" };

let 약목록 = [
  { 이름: "혈압약", 시간: ["아침"], 병원: "감나무골 내과" },
  { 이름: "당뇨약", 시간: ["아침", "저녁"], 병원: "감나무골 내과" },
  { 이름: "위장약", 시간: ["점심"], 병원: "감나무골 내과" },
  { 이름: "무릎 관절약", 시간: ["저녁"], 병원: "사하 정형외과" }
];

const 시간대 = [
  { 이름: "아침", 안내: "식후 30분" },
  { 이름: "점심", 안내: "식후 30분" },
  { 이름: "저녁", 안내: "저녁 8시까지" }
];

// 오늘 복약 상태. 시연 시작 시 아침만 먹은 상태로 둡니다.
let 오늘상태 = { 아침: "08:12", 점심: null, 저녁: null };

function 오늘날짜글() {
  const d = new Date();
  const 요일 = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${요일})`;
}
function 지금시각글() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

/* ---------- 탭 전환 ---------- */
function 탭보이기(이름) {
  document.querySelectorAll(".시연-탭 button").forEach(b => {
    b.setAttribute("aria-selected", b.dataset.탭 === 이름 ? "true" : "false");
  });
  document.querySelectorAll(".화면").forEach(s => {
    s.classList.toggle("보임", s.id === "화면-" + 이름);
  });
  document.querySelectorAll(".시연설명 > div").forEach(s => {
    if (s.dataset.설명 !== "항상") s.hidden = s.dataset.설명 !== 이름;
  });
}

/* ---------- 1. 약 등록 ---------- */
function 약목록그리기() {
  document.querySelectorAll(".약목록").forEach(ul => {
    ul.innerHTML = 약목록.map(약 => `
      <li>
        <span>${약.이름}<br><small class="흐림">${약.병원}</small></span>
        <span class="시간태그">${약.시간.join(" · ")}</span>
      </li>`).join("");
  });
}
function 추가폼열기() {
  const 폼 = document.getElementById("추가폼");
  폼.hidden = !폼.hidden;
  if (!폼.hidden) document.getElementById("새약이름").focus();
}
function 약추가하기(e) {
  e.preventDefault();
  const 이름 = document.getElementById("새약이름").value.trim();
  const 시간 = [...document.querySelectorAll('input[name="새약시간"]:checked')].map(i => i.value);
  const 안내 = document.getElementById("추가안내");
  if (!이름) { 안내.textContent = "약 이름을 적어주세요."; return; }
  if (시간.length === 0) { 안내.textContent = "먹는 시간을 하나 이상 골라주세요."; return; }
  약목록.push({ 이름, 시간, 병원: "직접 등록" });
  안내.textContent = `${이름}을(를) 등록했어요.`;
  e.target.reset();
  그리기();
}

/* ---------- 2. 오늘 체크 ---------- */
function 오늘체크그리기() {
  document.querySelectorAll(".오늘체크틀").forEach(틀 => {
    틀.innerHTML = 시간대.map(t => {
      const 약들 = 약목록.filter(약 => 약.시간.includes(t.이름)).map(약 => 약.이름);
      const 됨 = 오늘상태[t.이름];
      return `
        <div class="시간묶음 ${됨 ? "완료" : ""}">
          <h3>${t.이름} 약 <small>${t.안내}</small></h3>
          <p class="약이름들">${약들.length ? 약들.join(", ") : "등록된 약이 없어요"}</p>
          <button class="먹었어요" onclick="먹었어요('${t.이름}')" ${약들.length ? "" : "disabled"}>
            ${됨 ? `${됨}에 먹었어요` : "먹었어요"}
          </button>
        </div>`;
    }).join("");
  });
}
function 먹었어요(시간) {
  오늘상태[시간] = 오늘상태[시간] ? null : 지금시각글();   // 다시 누르면 취소
  그리기();
}

/* ---------- 3. 가족 화면 ---------- */
function 가족화면그리기() {
  const 틀 = document.getElementById("가족상태");
  if (틀) {
    틀.innerHTML = 시간대.map(t => {
      const 됨 = 오늘상태[t.이름];
      return `
        <div class="상태줄">
          <span>${t.이름} 약</span>
          <span class="표시 ${됨 ? "됨" : "안됨"}">${됨 ? `${됨} 드심` : "아직"}</span>
        </div>`;
    }).join("");
  }
  const 알림 = document.getElementById("가족알림");
  if (!알림) return;
  const 안먹음 = 시간대.filter(t => !오늘상태[t.이름]).map(t => t.이름);
  if (안먹음.length === 0) {
    알림.className = "알림 없음";
    알림.innerHTML = `<p>오늘 약을 모두 드셨어요.</p><span class="흐림">알림을 보낼 일이 없어요.</span>`;
  } else {
    알림.className = "알림";
    알림.innerHTML = `
      <p>${안먹음.join("·")} 약이 아직이에요.</p>
      <button class="버튼" onclick="전화흉내()">어머니께 전화하기</button>
      <p class="흐림" style="margin-top:12px;font-weight:500;font-size:.85rem">저녁 8시까지 체크가 없으면 이 화면에 알림이 와요.</p>`;
  }
}
function 전화흉내() {
  alert("시연용 화면입니다. 실제 서비스에서는 여기서 바로 전화가 걸립니다.");
}

/* ---------- 히어로 약봉투 도장 ---------- */
function 봉투그리기() {
  시간대.forEach(t => {
    const 도장 = document.getElementById("도장-" + t.이름);
    if (!도장) return;
    const 됨 = 오늘상태[t.이름];
    도장.classList.toggle("찍힘", !!됨);
    const 시각 = 도장.querySelector(".시각");
    if (시각) 시각.textContent = 됨 || "";
  });
  시간대.forEach(t => {
    const 글 = document.getElementById("봉투약-" + t.이름);
    if (글) 글.textContent = 약목록.filter(약 => 약.시간.includes(t.이름)).map(약 => 약.이름).join(", ") || "없음";
  });
}

/* ---------- 스크롤 등장과 메뉴 추적 ---------- */
function 스크롤장치() {
  const 대상 = document.querySelectorAll(".등장");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("보임"); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    대상.forEach(el => io.observe(el));
  } else {
    대상.forEach(el => el.classList.add("보임"));
  }

  const 링크 = [...document.querySelectorAll('.메뉴 li a[href^="#"]')];
  if (!링크.length) return;
  const 섹션 = 링크.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const 갱신 = () => {
    const y = window.scrollY + 140;
    let 현재 = 섹션[0];
    섹션.forEach(s => { if (s.offsetTop <= y) 현재 = s; });
    링크.forEach(a => a.classList.toggle("현재", a.getAttribute("href") === "#" + 현재.id));
  };
  window.addEventListener("scroll", 갱신, { passive: true });
  갱신();
}

/* ---------- 전체 다시 그리기 ---------- */
function 그리기() {
  document.querySelectorAll(".날짜").forEach(el => el.textContent = `${오늘날짜글()} · ${어르신.이름} 어르신`);
  약목록그리기();
  오늘체크그리기();
  가족화면그리기();
  봉투그리기();
}

document.addEventListener("DOMContentLoaded", () => {
  const 폼 = document.getElementById("추가폼");
  if (폼) 폼.addEventListener("submit", 약추가하기);
  그리기();
  스크롤장치();
});
