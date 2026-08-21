import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div id="wrapper">
    <div className="no-bottom no-top" id="content">
      <section aria-label="section" className="mt90 sm-mt-0">
        <div className="container text-center">
          <h1>404</h1>
          <h4>We couldn't find that page.</h4>

          <div className="spacer-20"></div>

          <Link to="/" className="btn-main">
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  </div>
);

export default NotFound;
