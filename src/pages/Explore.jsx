import React, { useEffect } from "react";
import AOS from "aos";
import { useLocation, useNavigate } from "react-router-dom";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const notice = location.state?.notice || "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      AOS.refreshHard();
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!notice) {
      return;
    }
    navigate(location.pathname, { replace: true, state: {} });
  }, [notice, navigate, location.pathname]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-easing="ease-out"
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <ExploreItems notice={notice} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
