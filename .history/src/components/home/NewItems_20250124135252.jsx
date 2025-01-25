import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

const NewItems = () => {
  const [data, setData] = useState([]);
  const intervalRefs = useRef([]);

  async function getData() {
    try {
      const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems');
      setData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getData();
    return () => {
      // Clear all intervals on unmount
      intervalRefs.current.forEach(clearInterval);
    };
  }, []);

  const startCountdown = (index, expiryDate) => {
    const updateTimer = () => {
      const timeLeft = expiryDate - Date.now();
      if (timeLeft <= 0) {
        clearInterval(intervalRefs.current[index]);
        return;
      }

      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Update the DOM directly
      const timerEl = document.getElementById(`timer-${index}`);
      if (timerEl) {
        timerEl.textContent = `${hours}h ${minutes}m ${seconds}s`;
      }
    };

    updateTimer(); // Initial call to set the correct time immediately
    intervalRefs.current[index] = setInterval(updateTimer, 1000);
  };

  useEffect(() => {
    data.forEach((item, index) => {
      if (item.expiryDate > Date.now()) {
        startCountdown(index, item.expiryDate);
      }
    });

    return () => {
      intervalRefs.current.forEach(clearInterval); // Cleanup
    };
  }, [data]);

  const sliderSettings = {
    infinite: true,
    speed: 250,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 500, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  function SampleNextArrow(props) {
    const { onClick } = props;
    return <div className="sliderArrow CarR" onClick={onClick}>›</div>;
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return <div className="sliderArrow CarL" onClick={onClick}>‹</div>;
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
          <Slider {...sliderSettings}>
            {data.length ? (
              data.map((item, index) => (

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="/author" title="Creator: Monica Lucas">
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate > Date.now() && (
                      <div className="de_countdown" id={`timer-${index}`}></div>
                    )}
                    <div className="nft__item_wrap">
                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
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
              ))
            ) : (
              <>Skeleton!</>
            )}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
