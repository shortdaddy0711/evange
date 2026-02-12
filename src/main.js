import Swiper from "swiper";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./style.css";

// Initialize Swiper
const swiper = new Swiper(".mySwiper", {
  modules: [Navigation, Pagination, Mousewheel],
  direction: "vertical",
  mousewheel: {
    forceToAxis: true,
    sensitivity: 1,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // 카드 확장 시 스와이프 비활성화
  allowTouchMove: true,
});

// ==========================================
// Pull-up Card 인터랙션 (Page 3~15)
// ==========================================

// 예외 슬라이드 (pull-up 기능 제외)
const excludedSlides = ["slide1", "slide2", "slide16"];

// 카드 확장/축소 상태 추적
let isCardExpanded = false;
let startY = 0;
let currentY = 0;
let isDragging = false;

// 현재 활성 슬라이드의 카드와 섹션 가져오기
function getActiveElements() {
  const activeSlide = document.querySelector(".swiper-slide-active");
  if (!activeSlide) return null;

  const section = activeSlide.querySelector("section");
  if (!section || excludedSlides.includes(section.id)) return null;

  const card = section.querySelector(".content-box, .card");
  if (!card) return null;

  return { section, card };
}

// 카드 확장
function expandCard() {
  const elements = getActiveElements();
  if (!elements) return;

  elements.card.classList.add("expanded");
  elements.section.classList.add("card-expanded");
  isCardExpanded = true;
}

// 카드 축소
function collapseCard() {
  const elements = getActiveElements();
  if (!elements) return;

  elements.card.classList.remove("expanded");
  elements.section.classList.remove("card-expanded");
  isCardExpanded = false;
  swiper.allowTouchMove = true; // Swiper 스와이프 활성화
}

// 카드 위 터치 시 Swiper 잠금/해제
function syncSwiperLock(target) {
  const elements = getActiveElements();
  if (!elements) {
    swiper.allowTouchMove = true;
    return;
  }

  if (!isCardExpanded) {
    swiper.allowTouchMove = true;
    return;
  }

  const isOnCard = elements.card.contains(target);
  swiper.allowTouchMove = !isOnCard;
}

// 터치 시작
function handleTouchStart(e) {
  const elements = getActiveElements();
  if (!elements) return;

  // 카드 영역에서만 드래그 시작
  const card = elements.card;
  syncSwiperLock(e.target);
  if (!card.contains(e.target)) return;

  startY = e.touches[0].clientY;
  isDragging = true;
}

// 터치 이동
function handleTouchMove(e) {
  if (!isDragging) return;

  currentY = e.touches[0].clientY;
  const deltaY = startY - currentY;

  // 축소 상태에서 위로 스와이프 (50px 이상)
  if (!isCardExpanded && deltaY > 50) {
    expandCard();
    isDragging = false;
  }
  // 확장 상태에서 아래로 스와이프 (50px 이상)
  else if (isCardExpanded && deltaY < -50) {
    // 카드 내부 스크롤이 최상단일 때만 축소
    const elements = getActiveElements();
    if (elements && elements.card.scrollTop <= 0) {
      collapseCard();
      isDragging = false;
    }
  }
}

// 터치 종료
function handleTouchEnd() {
  isDragging = false;
  startY = 0;
  currentY = 0;
  swiper.allowTouchMove = true;
}

// 마우스 휠 처리 (데스크톱)
function handleWheel(e) {
  const elements = getActiveElements();
  if (!elements) return;

  const card = elements.card;
  const isOnCard = card.contains(e.target);
  if (!isCardExpanded) {
    swiper.allowTouchMove = true;
  }

  if (isOnCard) {
    if (isCardExpanded) {
      swiper.allowTouchMove = false;
    }
    // 축소 상태 + 위로 스크롤 → 확장
    if (!isCardExpanded && e.deltaY > 0) {
      e.preventDefault();
      expandCard();
    }
    // 확장 상태 + 아래로 스크롤 + 카드 맨 위 → 축소
    else if (isCardExpanded && e.deltaY < 0 && card.scrollTop <= 0) {
      e.preventDefault();
      collapseCard();
    }
    // 확장 상태에서 카드 내부 스크롤 허용
    else if (isCardExpanded) {
      e.stopPropagation();
    }
  }
}

// 슬라이드 변경 시 카드 상태 초기화
swiper.on("slideChange", () => {
  // 모든 카드 초기화
  document.querySelectorAll(".content-box, .card").forEach((card) => {
    card.classList.remove("expanded");
  });
  document.querySelectorAll("section").forEach((section) => {
    section.classList.remove("card-expanded");
  });
  isCardExpanded = false;
  swiper.allowTouchMove = true;
});

// 이벤트 리스너 등록
document.addEventListener("touchstart", handleTouchStart, {
  passive: true,
  capture: true,
});
document.addEventListener("touchmove", handleTouchMove, { passive: false });
document.addEventListener("touchend", handleTouchEnd, { passive: true });
document.addEventListener("wheel", handleWheel, { passive: false });

// 카드 클릭으로도 확장 가능
document.addEventListener("click", (e) => {
  const elements = getActiveElements();
  if (!elements) return;

  const card = elements.card;
  if (card.contains(e.target) && !isCardExpanded) {
    expandCard();
  }
});
