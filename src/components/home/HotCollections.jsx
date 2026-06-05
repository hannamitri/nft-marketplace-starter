import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotCollections.css";

const SKELETON_CARD_COUNT = 4;

const HotCollections = () => {

  const sliderRef = useRef(null);
  const { id } = useParams();
  const [hotCollectionsData, setHotCollectionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections?slug=${id}`,
      );
      setHotCollectionsData(data);
      console.log(data)
    }
    catch (error) {
      console.error("Error fetching hotCollectionsData:", error);
    }
    finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);


  function renderHotCollections(collection, index) {
    return (
      <div className="hot_collections-slider" key={index}>
        <div className="nft_coll">
          <div className="nft_wrap">
            <Link to={`/item-details/${collection.nftId}`}>
              <img
                src={collection.nftImage}
                className="lazy img-fluid"
                alt=""
              />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to={`/author/${collection.authorId}`}>
              <img
                className="lazy pp-coll"
                src={collection.authorImage}
                alt=""
              />
            </Link>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/explore">
              <h4>{collection.title}</h4>
            </Link>
            <span>ERC-{collection.code}</span>
          </div>
        </div>
      </div>
    );
  }

  function renderSkeletonLoader(index) {
    return (
      <div className="hot_skeleton" key={index}>
        <div className="nft_coll_skeleton">
          <div className="skeleton skeleton-img"></div>
          <div className="skeleton skeleton-avatar"></div>
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
      </div>
    );
  }


  function simpleSliderSettings() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return settings;
  }

  function sliderNav(direction) {
    if (direction === "previous") {
      sliderRef.current?.slickPrev();
    } else if (direction === "next") {
      sliderRef.current?.slickNext();
    }
  }


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="hot_collections--wrapper">
            <Slider
              ref={sliderRef}
              {...simpleSliderSettings()}
              className="hot_collections-slider"
            >
              {isLoading
                ? new Array(SKELETON_CARD_COUNT)
                    .fill(0)
                    .map((_, index) => renderSkeletonLoader(index))
                : hotCollectionsData.map((collection, index) => {
                    return renderHotCollections(collection, index);
                  })}
            </Slider>
            <div className="btn_container">
              <button
                className="slider_btn"
                type="button"
                aria-label="Previous hot collection"
                onClick={() => sliderNav("previous")}
              >
                <i className="fa fa-chevron-left"></i>
              </button>
              <button
                className="slider_btn"
                type="button"
                aria-label="Next hot collection"
                onClick={() => sliderNav("next")}
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
