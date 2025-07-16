import React from "react";
import Skeleton from "./Skeleton";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SkeletonLoader = ({ count, type, settings }) => {
  const skeletonItems = Array.from({ length: count });

  const NextArrow = ({ onClick }) => (
    <div className="arrow next" onClick={onClick}>
      <FaChevronRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="arrow prev" onClick={onClick}>
      <FaChevronLeft />
    </div>
  );

  const defaultSettings = {
    infinite: true,
    speed: 300,
    slidesToShow: count,
    slidesToScroll: 1,
    initialSlide: 0,
    dots: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    centerPadding: "0",
  };

  const mergedSettings = { ...defaultSettings, ...settings };

  return (
    <>
      {type === "topSellers" ? (
        <ol className="author_list">
          {skeletonItems.map((_, index) => (
            <li key={index}>
              <div className="author_list_pp">
                <Skeleton width="50px" height="50px" borderRadius="50%" />
                <i className="fa fa-check"></i>
              </div>
              <div className="author_list_info">
                <Skeleton width="100px" height="15px" />
                <div>
                  <Skeleton width="50px" height="15px" />
                </div>
              </div>
            </li>
          ))}
        </ol>
      ) : type === "newItems" ? (
        <Slider {...mergedSettings}>
          {skeletonItems.map((_, index) => (
            <div key={index} className="slide-item">
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft__item_wrap">
                  <Skeleton width="100%" height="200px" />
                </div>
                <div className="nft__item_info">
                  <Skeleton width="140px" height="20px" />
                  <Skeleton width="100px" height="20px" />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : type === "exploreItems" ? (
        <div className="row">
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <i className="fa fa-check"></i>
                </div>
                <div className="de_countdown">
                  <Skeleton width="100%" height="20px" />
                </div>
                <div className="nft__item_wrap">
                  <Skeleton width="100%" height="200px" />
                </div>
                <div className="nft__item_info">
                  <Skeleton width="140px" height="20px" />
                  <div>
                    <Skeleton width="100px" height="20px" />
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>
                      <Skeleton width="20px" height="20px" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : type === "hotCollections" ? (
        <Slider {...mergedSettings}>
          {skeletonItems.map((_, index) => (
            <div key={index} className="slide-item">
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Skeleton width="100%" height="200px" />
                </div>
                <div className="nft_coll_pp">
                  <Skeleton width="60px" height="60px" borderRadius="50%" />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Skeleton width="140px" height="20px" />
                  <div>
                    <Skeleton width="100px" height="20px" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : type === "authorPage" ? (
        <>
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            style={{ height: "200px", position: "relative" }}
          >
            <Skeleton width="100%" height="100%" />
          </section>

          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton
                          width="100px"
                          height="100px"
                          borderRadius="50%"
                        />
                        <div className="profile_name">
                          <Skeleton width="200px" height="50px" />
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <Skeleton width="100px" height="40px" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <div className="row">
                      {skeletonItems.map((_, index) => (
                        <div
                          className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                          key={index}
                        >
                          <div className="nft__item">
                            <div className="author_list_pp">
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="nft__item_wrap">
                              <Skeleton width="100%" height="200px" />
                            </div>
                            <div className="nft__item_info">
                              <div>
                                <Skeleton width="140px" height="20px" />
                              </div>
                              <div>
                                <Skeleton width="100px" height="20px" />
                              </div>
                              <div className="nft__item_like">
                                <i className="fa fa-heart"></i>
                                <Skeleton width="10px" height="10px" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </>
  );
};

export default SkeletonLoader;