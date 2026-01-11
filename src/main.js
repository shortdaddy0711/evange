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
  direction: "vertical", // Swipe up/down for full screen
  mousewheel: true, // Allow scrolling with mouse wheel
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
