import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly force the browser window back to the top-left corner
    window.scrollTo(0, 0);
  }, [pathname]); // Fires automatically whenever the URL path changes

  return null; // This component handles side effects only; it doesn't render visual elements
};

export default ScrollToTop; 