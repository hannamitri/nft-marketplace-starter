import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../../css/carousel/Carousel.css";

const NewItems = () => {
  const [nft, setNft] = useState([]);
  const [img, setImg] = useState(true);

  useEffect(() => {
    async function fetchNfts() {
      setImg(false);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNft(data);
      setImg(true);
    }
    fetchNfts();
  }, []);


  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 10 },
      },
    },
    slides: { perView: 1 },
    loop: true,
    mode: "free-snap",
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

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
          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              <>
                {img
                  ? nft.map((nft) => (
                    <div
                      className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={nft.id}
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to="/author"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <img className="lazy" src={nft.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        
                          <Expirytimer expiryTime={nft.expiryDate}/>
                        
              
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
              
                          <Link to="/item-details">
                            <img
                              src={nft.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to="/item-details">
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
                  )
                )
                  : new Array(4).fill(0).map((_, index) => (
                      <div
                        className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                        key={index}
                      >
                        <div className="nft__item">
                          <div className="author_list_pp skeleton skeleton-box">
                            <Link
                              to="/author"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Creator: Monica Lucas"
                            >
                              <img
                                className="lazy"
                                src={"AuthorImage"}
                                alt=""
                              />
                            </Link>
                          </div>

                          <div className="nft__item_wrap skeleton skeleton-box">
                            <div className="nft__item_extra">
                              <div className="nft__item_buttons">
                                <button>Buy Now</button>
                                <div className="nft__item_share">
                                  <h4>Share</h4>
                                  <a
                                    href=""
                                    target="_blank"
                                    rel="noreferrer"
                                  ></a>
                                  <a
                                    href=""
                                    target="_blank"
                                    rel="noreferrer"
                                  ></a>
                                  <a href=""></a>
                                </div>
                              </div>
                            </div>

                            <Link to="/item-details">
                              <img
                                src={"nftImage"}
                                className="lazy nft__item_preview"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="nft__item_info ">
                            <Link to="/item-details">
                              <h4 className="skeleton"></h4>
                            </Link>
                            <div className="nft__item_price skeleton skeleton-box"></div>
                            <div className="nft__item_like">
                              <span className="skeleton skeleton-box"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
              </>
            </div>
            {loaded && instanceRef.current && (
              <>
                <Arrow
                  left
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                />

                <Arrow
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

function Arrow(props) {
  const disabled = props.disabled ? "arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}


const Expirytimer = ({ expiryTime }) => {

const [remainingTime, setTime] = useState(sums(expiryTime))

useEffect(() => {
  const reset = setInterval(() => {
    setTime(sums(expiryTime))
  }, 1000);

  
  return () => clearInterval(reset)
}, [expiryTime]) 

if (remainingTime.total <= 0) {
  return <></>
}


  return ( <div className="de_countdown">
    {remainingTime.hours}h {remainingTime.minutes}m {remainingTime.seconds}s
   
  </div>)
}



  const sums = (expiryTime) => {
    const total = expiryTime - Date.now()
  let remainingTime = {
  total: total,
  hours: Math.floor(total / (1000*60*60) ),
  minutes: Math.floor(total / (1000 * 60 * 60) % 60),
  seconds: Math.floor((total / 1000) % 60)

 }
 return remainingTime

  } 



export default NewItems;
