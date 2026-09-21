import React, { useEffect } from "react";
import Logo from "../images/Ultraverse.png";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Nav = () => {
  const openNav = () => {
    document.body.classList.add("menu__open");
  };

  const closeNav = () => {
    document.body.classList.remove("menu__open");
  };

  const connectWallet = () => {
    closeNav();
    alert("This feature has not been implemented yet");
  };

  useEffect(() => () => document.body.classList.remove("menu__open"), []);

  return (
    <header className="transparent header-light scroll-light smaller">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex sm-pt10">
              <div className="de-flex-col">
                <div className="de-flex-col">
                  <div id="logo">
                    <Link to="/">
                      <img alt="" className="logo-2" src={Logo} />
                    </Link>
                  </div>
                </div>
                <div className="de-flex-col">
                  <input
                    id="quick_search"
                    className="xs-hide"
                    name="quick_search"
                    placeholder="search item here..."
                    type="text"
                  />
                </div>
              </div>
              <div className="de-flex-col header-col-mid">
                <ul id="mainmenu">
                  <li className="menu-item-has-children has-child">
                    <Link to="/">
                      Home<span></span>
                    </Link>
                  </li>
                  <li className="menu-item-has-children has-child">
                    <Link to="/explore">
                      Explore<span></span>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="btn-main connect-wallet"
                      onClick={connectWallet}
                    >
                      Connect Wallet
                    </button>
                  </li>
                </ul>

                <div className="menu_side_area">
                  <button
                    type="button"
                    onClick={openNav}
                    id="menu-btn"
                    aria-label="Open navigation menu"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul id="dropdown__wrapper">
        <li className="dropdown__list">
          <Link to="/" onClick={() => closeNav()}>
            Home
          </Link>
        </li>
        <li className="dropdown__list">
          <Link to="/explore" onClick={() => closeNav()}>
            Explore
          </Link>
        </li>
        <li className="dropdown__list dropdown-wallet-item">
          <button
            type="button"
            className="mobile-connect-wallet"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </li>
        <li className="close__button">
          <button type="button" onClick={closeNav} aria-label="Close navigation menu">
            <FaTimes />
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Nav;
