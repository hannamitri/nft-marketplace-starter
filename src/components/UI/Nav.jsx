import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/Ultraverse.png';

const Nav = () => {
  return (
    <header className="nav-header fixed-top bg-white border-bottom shadow-sm max-width-400px">
      <div className="nav-bar-container-fluid px-3 px-lg-4 d-flex align-items-center justify-content-between mx-auto my-3" 
        style={{ minWidth: "1000px", maxWidth: "1600px", height: "100px" }}
      >
        
        {/* Left Group */}
        <div className="nav-left-group">
          <Link to="/">
            <img src={Logo} alt="Ultraverse Logo" className="h-8 object-contain" />
          </Link>

          <div className="nav-search-wrapper">
            <input
              type="text"
              placeholder="search item here..."
              className="nav-search-input"
            />
          </div>
        </div>

        {/* Right Group */}
        <div className="nav-right-group d-flex align-items-center"
        style={{ fontSize: "1.25rem" }}>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/explore" className="nav-link">
            Explore
          </Link>
          <button className="wallet-btn">
            Connect wallet
          </button>
        </div>

      </div>
    </header>
  );
};

export default Nav;