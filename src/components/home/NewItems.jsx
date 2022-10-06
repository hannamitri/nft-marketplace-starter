import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Skeleton from "../UI/Skeleton";
import ItemDetails from "../../pages/ItemDetails";
import Counter from "../UI/Countdown"

const NewItems = () => {
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState({})
  const [sliderRef, instanceRef] = useKeenSlider(options)

  async function fetchNfts() {
    setLoading(true)
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)
    setNfts(data)
    setLoading(false)
  }


  function Arrow(props) {
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${props.left ? "arrow-left" : "arrow-right"}`}
      >
        {props.left && <KeyboardArrowLeftIcon />}
        {!props.left && <KeyboardArrowRightIcon />}
      </svg>
    );
  }

  useEffect(() => {
    fetchNfts()
    setOptions({
      loop: true,
      mode: "free-snap",
      breakpoints: {
        "(min-width: 0px)": {
          slidesPerView: 1,
        },
        "(min-width: 600px)": {
          slides: {
            perView: 2,
            spacing: 24,
          },
        },
        "(min-width: 1000px)": {
          slides: {
            perView: 4,
            spacing: 24,
          },
        },
      },
    });
  }, [])

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
          {loading ? (
            <div className="navigation-wrapper">
              <div ref={sliderRef} className="keen-slider">
                {new Array(7).fill(0).map((_, index) => (
                  <div className="keen-slider__slide" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link to="">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <Link to="">
                        <Skeleton width="100%" height="340px" />
                      </Link>
                      <div className="nft__item_info">
                        <Link to="">
                          <Skeleton width="150px" height="30px" />
                        </Link>
                        <div></div>
                        <Skeleton width="100px" height="20px" />
                      </div>
                      <div className="nft__item_like">
                        <Skeleton width="40px" height="20px" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <>
                <Arrow left onClick={() => instanceRef.current?.prev()} />
                <Arrow onClick={() => instanceRef.current?.next()} />
              </>
            </div>
          ) : (
            <div className="navigation-wrapper">
              <div ref={sliderRef} className="keen-slider">
                {nfts.map((nft, index) => ( 
                  <div className="keen-slider__slide" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${nft.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={nft.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                  </div>
                  {nft.expiryDate ? (
                    <Counter expiryDate={nft.expiryDate}/>
                  ) : (
                    ""
                  )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a
                          href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a
                          href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
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
          ))}
        </div>
          <>
            <Arrow left onClick={() => instanceRef.current?.prev()} />
            <Arrow onClick={() => instanceRef.current?.next()} />
          </>
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
