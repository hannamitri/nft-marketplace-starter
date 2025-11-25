import React from "react";

let holdInterval = null;

const createHoldHandler = (action) => ({
  onMouseDown: () => {
    action();
    holdInterval = setInterval(action, 120);
  },
  onMouseUp: () => clearInterval(holdInterval),
  onMouseLeave: () => clearInterval(holdInterval),
});

// NEXT ARROW
export const NextArrow = ({ onClick, sliderRef }) => {
  const hold = createHoldHandler(() => sliderRef.current.slickNext());

  return (
    <div
      className="slick-next"
      onClick={onClick}
      {...hold}
    />
  );
};

// PREV ARROW
export const PrevArrow = ({ onClick, sliderRef }) => {
  const hold = createHoldHandler(() => sliderRef.current.slickPrev());

  return (
    <div
      className="slick-prev"
      onClick={onClick}
      {...hold}
    />
  );
};
