import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Ultraverse.png";

const Footer = () => {
  const handleSubscribe = (event) => {
    event.preventDefault();
    alert("This feature has not been implemented yet");
  };

  return (
    <footer className="footer-light" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h5>Marketplace</h5>
              <ul>
                <li>
                  <span className="no-cursor">
                    All NFTs
                  </span>
                </li>
                <li>
                  <span className="no-cursor">
                    Art
                  </span>
                </li>
                <li>
                  <span className="no-cursor">
                    Music
                  </span>
                </li>
                <li>
                  <span className="no-cursor">
                    Domain Names
                  </span>
                </li>
                <li>
                  <span className="no-cursor">
                    Virtual World
                  </span>
                </li>
                <li>
                  <span className="no-cursor">
                    Collectibles
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h5>Resources</h5>
              <ul>
                <li>
                  <span className="no-cursor">
                    Help Center
                  </span>
                </li>
                <li>
                  <span className="no-cursor">
                    Partners
                  </span>
                </li>
                <li>
                  <span className="no-cursor">
                    Suggestions
                  </span>
                </li>
                <li>
                  <span className="no-cursor">
                    Discord
                  </span>
                </li>
                <li>
                  <span className="no-cursor">
                    Docs
                  </span>
                </li>
                <li>
                  <span className="no-cursor">
                    Newsletter
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h5>Community</h5>
              <ul>
                <li>
                  <span className="no-cursor">
                    Community
                  </span>
                </li>
                <li>
                  <span className="no-cursor">
                    Documentation
                  </span>
                </li>
                <li>
                  <span className="no-cursor">
                    Brand Assets
                  </span>
                </li>
                <li>
                  <span className="no-cursor">
                    Blog
                  </span>
                </li>
                <li>
                  <span className="no-cursor">
                    Forum
                  </span>
                </li>
                <li>
                  <span className="no-cursor">
                    Mailing List
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h5>Newsletter</h5>
              <p>
                Signup for our newsletter to get the latest news in your inbox.
              </p>
              <form
                className="row form-dark"
                id="form_subscribe"
                name="form_subscribe"
                onSubmit={handleSubscribe}
              >
                <div className="col text-center">
                  <input
                    className="form-control"
                    id="txt_subscribe"
                    name="txt_subscribe"
                    placeholder="enter your email"
                    type="text"
                  />
                  <button
                    type="submit"
                    className="no-cursor"
                    id="btn-subscribe"
                    aria-label="Subscribe"
                  >
                    <i className="arrow_right bg-color-secondary"></i>
                  </button>
                  <div className="clearfix"></div>
                </div>
              </form>
              <div className="spacer-10"></div>
              <small>Your email is safe with us. We don't spam.</small>
            </div>
          </div>
        </div>
      </div>
      <div className="subfooter">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="de-flex footer__wrapper">
                <div className="de-flex-col">
                  <Link className="footer__link" to="/">
                    <img alt="Ultraverse" className="f-logo" src={Logo} />
                    <span className="copy">&copy; Copyright 2022</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
