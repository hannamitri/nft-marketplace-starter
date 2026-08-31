import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS settings
export const initAOS = () => {
  AOS.init({
    duration: 1000, // Animation speed (1s)
    once: true,     // Runs animation only once on scroll
    easing: "ease-in-out",
    offset: 50,     // Offset before triggering
  });
};

// Refresh AOS calculations after API state updates
export const refreshAOS = () => {
  setTimeout(() => {
    AOS.refresh();
  }, 100);
};
