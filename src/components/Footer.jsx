import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Ultraverse.png";

const FOOTER_GROUPS = [
  {
    title: "Marketplace",
    links: ["All NFTs", "Art", "Music", "Domain Names", "Virtual World", "Collectibles"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Partners", "Suggestions", "Discord", "Docs", "Newsletter"],
  },
  {
    title: "Community",
    links: ["Community", "Documentation", "Brand Assets", "Blog", "Forum", "Mailing List"],
  },
];

const Footer = () => (
  <footer className="footer-light">
    <div className="container">
      <div className="row">
        {FOOTER_GROUPS.map((group) => (
          <div className="col-md-3 col-sm-6 col-xs-1" key={group.title}>
            <div className="widget">
              <h5>{group.title}</h5>
              <ul>
                {group.links.map((label) => (
                  <li key={label}>
                    <Link to="/explore">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="col-md-3 col-sm-6 col-xs-1">
          <div className="widget">
            <h5>Newsletter</h5>
            <p>Signup for our newsletter to get the latest news in your inbox.</p>
            <form
              className="row form-dark"
              id="form_subscribe"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="col text-center">
                <label className="sr-only" htmlFor="txt_subscribe">Email address</label>
                <input
                  className="form-control"
                  id="txt_subscribe"
                  name="email"
                  placeholder="email"
                  type="email"
                  inputMode="email"
                />
                <button type="submit" id="btn-subscribe" aria-label="Subscribe">
                  <i className="arrow_right bg-color-secondary" aria-hidden="true"></i>
                </button>
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
                  <span className="copy">&copy; Copyright {new Date().getFullYear()}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
