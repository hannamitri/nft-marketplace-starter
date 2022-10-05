import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Skeleton from "../UI/Skeleton";


const HotCollections = () => {
  const [options, setOptions] = useState({});
  const [sliderRef, instanceRef] = useKeenSlider(options);

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

  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchNfts() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setNfts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchNfts();
    setOptions({
      loop: true,
      mode: "free-snap",
      breakpoints: {
        "(min-width: 0px)": {
          slides: {
            perView: 1,
          },
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
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-up">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up">Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <div className="navigation-wrapper">
              <div ref={sliderRef} className="keen-slider">
                {new Array(6).fill(0).map((_, index) => (
                  <div className="nft_coll keen-slider__slide" key={index}>
                    <div className="nft_wrap">
                      <Link to="">
                        <Skeleton width="100%" height="180px" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="">
                        <Skeleton width="100px" height="20px" />
                      </Link>
                      <div></div>
                      <Skeleton width="69px" height="20px" />
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
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${nft.nftId}`}>
                          <img
                            src={nft.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${nft.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={nft.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to={`/item-details/${nft.nftId}`}>
                          <h4>{nft.title}</h4>
                        </Link>
                        <span>ERC-{nft.code}</span>
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

export default HotCollections;