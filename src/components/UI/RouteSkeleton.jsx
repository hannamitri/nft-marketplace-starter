import React from "react";
import Skeleton from "./Skeleton";

const RouteSkeleton = ({ variant = "home" }) => {
  const renderHomeSkeleton = () => (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row g-4">
              <div className="col-12">
                <Skeleton width="100%" height="420px" borderRadius="24px" />
              </div>
              <div className="col-12">
                <Skeleton width="220px" height="28px" borderRadius="10px" />
                <div className="mt-3 d-flex flex-wrap gap-2">
                  <Skeleton width="140px" height="20px" borderRadius="10px" />
                  <Skeleton width="120px" height="20px" borderRadius="10px" />
                  <Skeleton width="180px" height="20px" borderRadius="10px" />
                </div>
              </div>
              {new Array(3).fill(null).map((_, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                  <Skeleton width="100%" height="240px" borderRadius="18px" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const renderExploreSkeleton = () => (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row mb-4">
              <div className="col-12">
                <Skeleton width="240px" height="42px" borderRadius="12px" />
              </div>
            </div>
            <div className="row g-3">
              {new Array(8).fill(null).map((_, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
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
                      <div className="nft__item_price mt-2">
                        <Skeleton width="60%" height="20px" borderRadius="10px" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const renderAuthorSkeleton = () => (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="text-light">
          <Skeleton width="100%" height="260px" borderRadius="0" />
        </section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <Skeleton width="120px" height="120px" borderRadius="50%" />
                      <div className="profile_name" style={{ marginLeft: "20px" }}>
                        <Skeleton width="220px" height="28px" borderRadius="10px" />
                        <div className="mt-2">
                          <Skeleton width="140px" height="20px" borderRadius="10px" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <Skeleton width="120px" height="44px" borderRadius="10px" />
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-4">
                <div className="row g-3">
                  {new Array(4).fill(null).map((_, index) => (
                    <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                      <Skeleton width="100%" height="220px" borderRadius="18px" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const renderItemDetailsSkeleton = () => (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <Skeleton width="100%" height="360px" borderRadius="18px" />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <Skeleton width="70%" height="32px" borderRadius="10px" />
                  <div className="item_id mb-2" style={{ marginTop: "16px" }}>
                    <Skeleton width="40%" height="20px" borderRadius="10px" />
                  </div>
                  <div className="item_info_counts d-flex gap-3" style={{ marginBottom: "20px" }}>
                    <Skeleton width="25%" height="24px" borderRadius="10px" />
                    <Skeleton width="25%" height="24px" borderRadius="10px" />
                  </div>
                  <Skeleton width="100%" height="100px" borderRadius="12px" />
                  <div className="d-flex flex-row" style={{ gap: "24px", marginTop: "20px" }}>
                    <div style={{ flex: 1 }}>
                      <Skeleton width="60%" height="20px" borderRadius="10px" />
                      <div className="item_author" style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                        <Skeleton width="60px" height="60px" borderRadius="50%" />
                        <Skeleton width="40%" height="18px" borderRadius="10px" />
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <Skeleton width="60%" height="20px" borderRadius="10px" />
                      <div className="item_author" style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                        <Skeleton width="60px" height="60px" borderRadius="50%" />
                        <Skeleton width="40%" height="18px" borderRadius="10px" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  switch (variant) {
    case "explore":
      return renderExploreSkeleton();
    case "author":
      return renderAuthorSkeleton();
    case "item-details":
      return renderItemDetailsSkeleton();
    default:
      return renderHomeSkeleton();
  }
};

export default RouteSkeleton;
