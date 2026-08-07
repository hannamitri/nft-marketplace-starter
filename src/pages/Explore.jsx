import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import Skeleton from "../components/UI/Skeleton";

const Explore = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const timeoutId = setTimeout(() => {
      setIsPageLoading(false);
    }, 350);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          data-aos="fade-up"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  {isPageLoading ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Skeleton width="220px" height="56px" borderRadius="12px" />
                    </div>
                  ) : (
                    <h1>Explore</h1>
                  )}
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section" data-aos="fade-up" data-aos-delay="120">
          <div className="container">
            <div className="row">
              {isPageLoading
                ? new Array(4).fill(null).map((_, index) => (
                    <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Skeleton width="60px" height="60px" borderRadius="50%" />
                        </div>
                        <div className="de_countdown">
                          <Skeleton width="100px" height="20px" borderRadius="10px" />
                        </div>
                        <div className="nft__item_wrap">
                          <Skeleton width="100%" height="260px" borderRadius="18px" />
                        </div>
                        <div className="nft__item_info">
                          <Skeleton width="80%" height="24px" borderRadius="10px" />
                          <div className="nft__item_price">
                            <Skeleton width="60%" height="20px" borderRadius="10px" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : <ExploreItems />}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
