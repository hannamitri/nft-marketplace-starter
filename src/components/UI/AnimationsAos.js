import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  disable: "mobile",
  offset: 200,
  duration: 600,
  easing: "fade-in",
  delay: 400,
});

AOS.init({
  disable: "mobile",
  offset: 200,
  duration: 1000,
  easing: "fade-up",
  delay: 600,
});

AOS.init({
  disable: "mobile",
  offset: 200,
  duration: 1000,
  easing: "ease-in",
  delay: 600,
});

export default AOS;
