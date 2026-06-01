import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewItems.css";



const NewItems = () => {
  const [newItemsData, setNewItemsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);


  const getNewItemsData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
      );
      setNewItemsData(data);
    }
    catch (error) {
      console.log("Error fetching newItemsData", error);
    }
    finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getNewItemsData();
  }, [getNewItemsData]);



  function dynamicRenderingOfNewItemsData(item, index) {
    return (
      <div className="nft__item" key={item.nftId}>
        <div className="author_list_pp">
          <Link
            to={`/author/${item.authorId}`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Creator: {item.authorId}"
          >
            <img className="lazy" src={item.authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}

        <div className="nft__item_wrap">
          <Link to={`/item-details/${item.nftId}`}>
            <img
              src={item.nftImage}
              className="lazy nft__item_preview"
              alt=""
            />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to={`/item-details/${item.nftId}`}>
            <h4>{item.title}</h4>
          </Link>
          <div className="nft__item_price">{item.price}ETH</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{item.likes}</span>
          </div>
        </div>
      </div>
    );
  }


  function getTimeLeft(expiryDate) {
  const diff = expiryDate - Date.now();
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function CountdownTimer({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(expiryDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(expiryDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [expiryDate]);

  const { hours, minutes, seconds } = timeLeft;
  return (
    <div className="de_countdown">
      {String(hours).padStart(2, "0")}h &nbsp;
      {String(minutes).padStart(2, "0")}m &nbsp;
      {String(seconds).padStart(2, "0")}s
    </div>
  );
}


  function SkeletonCards() {
    return (
      <div className="nft__item">
        <div className="author_list_pp">
          <div className="newItemSkeleton skeleton-avatar"></div>
        </div>

        <div className="nft__item_wrap">
          <div className="newItemSkeleton skeleton-img"></div>
        </div>

        <div className="nft__item_info">
          <div className="newItemSkeleton skeleton-title"></div>
          <div className="newItemSkeleton skeleton-text"></div>
        </div>
      </div>
    );
  }


    function sliderSettings() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1199,
          settings: { slidesToShow: 3, slidesToScroll: 1 },
        },
        {
          breakpoint: 991,
          settings: { slidesToShow: 2, slidesToScroll: 1 },
        },
        {
          breakpoint: 575,
          settings: { slidesToShow: 1, slidesToScroll: 1 },
        },
      ],
    };
    return settings;
  }

  function sliderBtn(direction) {
    if (direction === "previous") {
      sliderRef.current?.slickPrev();
    } else if (direction === "next") {
      sliderRef.current?.slickNext();
    }
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
          <div className="slider_container">
            <Slider
              ref={sliderRef}
              {...sliderSettings()}
              className="newItems__Slider"
            >

              {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <SkeletonCards key={index} />
              ))
              : newItemsData.map((items, index) =>
                  dynamicRenderingOfNewItemsData(items, index),
                )}

            </Slider>
          </div>
          <div className="button__container">
            <button
              className="bttn btn__left "
              onClick={() => sliderBtn("previous")}
            >
              <i className="fa fa-chevron-left"></i>
            </button>

            <button
              className="bttn btn__right "
              onClick={() => sliderBtn("next")}
            >
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
