import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { useKeenSlider } from "keen-slider/react";

const NewItems = () => {
  const [now, setNow] = useState(Date.now());
  const { data: items = [], isLoading } = useSWR(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
  );
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      breakpoints: {
        "(min-width: 450px)": {
          slides: { perView: 2 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 3 },
        },
        "(min-width: 1200px)": {
          slides: { perView: 4 },
        },
      },
      slides: { perView: 1 },
    },
    [
      // add plugins here
    ]
  );

  useEffect(() => {
    setInterval(() => {
      setNow(Date.now());
    }, 1000);
  }, []);

  function getExpiryTime(time) {
    const remains = time - now;
    if (remains <= 0) return "0s";

    const totalSeconds = Math.floor(remains / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];
    parts.push(`${hours}h`);
    parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);

    return parts.join(" ");
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row row--collections">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          { isLoading && (
            <div ref={sliderRef} className="keen-slider">
              {Array(4)
                .fill()
                .map((_, i) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
                    key={i}
                  >
                    <div className="nft__item">
                      <div style={{height: "350px"}}>
                        <div style={{width: "50px", height: "50px", borderRadius: "50%"}} className="skeleton-box author_list_pp"></div>
                        <div style={{border: "none", height: "32px", width: "113px", top: "-10px", right: "-50px" }} className="skeleton-box de_countdown"></div>
                        <div style={{width: "213px", height: "213px", borderRadius: "8px", marginTop: "16px"}} className="skeleton-box nft__item_preview"></div>
                      </div>
                      <div className="nft__item_info">
                        <div style={{width: "150px"}} className="skeleton-box"></div><br/>
                        <div style={{width: "100px"}} className="skeleton-box"></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
          { !isLoading && (
            <div ref={sliderRef} className="keen-slider">
              {items.map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
                  key={item.id}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={"/author/" + item.authorId}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate && (
                      <div className="de_countdown">
                        {getExpiryTime(item.expiryDate)}
                      </div>
                    )}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={"/item-details/" + item.nftId}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={"/item-details/" + item.nftId}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
            className="slider-btn slider-btn--prev"
            onClick={() => instanceRef.current?.prev()}
          >
            <i className="fa fa-chevron-left"></i>
          </button>
          <button
            className="slider-btn slider-btn--next"
            onClick={() => instanceRef.current?.next()}
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
