import { useKeenSlider } from "keen-slider/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewItems = ({ data, loading }) => {
  const [timeLeft, setTimeLeft] = useState([]);
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 4,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 992px)": {
        slides: {
          perView: 2,
        },
      },
      "(max-width: 576px)": {
        slides: {
          perView: 1,
        },
      },
    },
    slideChanged() {
      console.log("slide changed");
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimeLeft = data.map((nft) => {
        const totalSeconds = Math.max(
          (new Date(nft.expiryDate) - Date.now()) / 1000,
          0,
        );
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return { ...nft, timeLeft: { hours, minutes, seconds } };
      });
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [data, loading]);

  if (loading) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>New Items</h2>
                <div className="small-border bg-color-2"></div>
              </div>
              {/* Skeleton loading state */}
              <div className="skeleton--container">
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div ref={sliderRef} className="keen-slider">
            {timeLeft.map((nft, index) => {
              return (
                <div className="keen-slider__slide" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${nft.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${nft.creator}`}
                      >
                        <img className="lazy" src={nft.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown">
                      {nft.timeLeft.hours}h {nft.timeLeft.minutes}m{" "}
                      {nft.timeLeft.seconds}s
                    </div>

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

                      <Link to={`/item-details/${nft.nftId}`}>
                        <img
                          src={nft.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${nft.nftId}`}>
                        <h4>{nft.title}</h4>
                      </Link>
                      <div className="nft__item_price">{nft.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{nft.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="slider__buttons">
            <button onClick={() => instanceRef.current?.prev()}>
              Previous
            </button>
            <button onClick={() => instanceRef.current?.next()}>Next</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
