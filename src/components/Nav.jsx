import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

import Logo from "../images/Ultraverse.png";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Keep the <body> class in sync with state instead of mutating classList
  // directly, and always clean up when the component unmounts.
  useEffect(() => {
    document.body.classList.toggle("menu__open", menuOpen);

    return () => document.body.classList.remove("menu__open");
  }, [menuOpen]);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const notImplemented = () =>
    alert("This feature has not been implemented yet");

  return (
    <header className="transparent header-light scroll-light smaller" data-aos="fade-right">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex sm-pt10">
              <div className="de-flex-col">
                <div className="de-flex-col">
                  <div id="logo">
                    <Link to="/">
                      <img alt="Ultraverse" className="logo-2" src={Logo} />
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
                    <NavLink to="/" end>
                      Home<span></span>
                    </NavLink>
                  </li>

                  <li className="menu-item-has-children has-child">
                    <NavLink to="/explore">
                      Explore<span></span>
                    </NavLink>
                  </li>

                  <li>
                    <button
                      type="button"
                      className="btn-main connect-wallet"
                      onClick={notImplemented}
                    >
                      Connect wallet
                    </button>
                  </li>
                </ul>

                <div className="menu_side_area">
                  <span
                    onClick={() => setMenuOpen(true)}
                    id="menu-btn"
                    role="button"
                    aria-label="Open menu"
                    aria-expanded={menuOpen}
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul id="dropdown__wrapper">
        <li className="dropdown__list">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>

        <li className="dropdown__list">
          <Link to="/explore" onClick={() => setMenuOpen(false)}>
            Explore
          </Link>
        </li>

        <li className="close__button">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Nav;
