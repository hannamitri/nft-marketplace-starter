import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./NavButton.css"


const NavButton = ({ direction, onClick, onHold }) => {
    const [holding, setHolding] = useState(false);
  
    useEffect(() => {
      let timer;
      if (holding) {
        timer = setInterval(() => {
          onHold();
        }, 150);
      }
      return () => clearInterval(timer);
    }, [holding, onHold]);
  
    return (
      <button
        className={`nav-btn ${direction}`}
        onClick={onClick}
        onMouseDown={() => setHolding(true)}
        onMouseUp={() => setHolding(false)}
        onMouseLeave={() => setHolding(false)}
        aria-label={`${direction} arrow`}
      >
        {direction === "left" ? <FaChevronLeft size={15} /> : <FaChevronRight size={15} />}
      </button>
    );
  };
  
  

export default NavButton;
