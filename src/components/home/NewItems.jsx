import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import 'keen-slider/keen-slider.min.css';

const NewItems = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState();
  const [countdowns, setCountdowns] = useState({});
  const [slideRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 6,
    },
    breakpoints: {
    "(min-width: 576px)": {
      slides: { perView: 2, spacing: 6 },
    },
    "(min-width: 768px)": {
      slides: { perView: 3, spacing: 6 },
    },
    "(min-width: 1024px)": {
      slides: { perView: 4, spacing: 6 },
    },
  },
  })

  async function fetchData() {
    setLoading(true);
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)
    setItem(data);
    setLoading(false);
  }

  useEffect(() => {
  if (!loading && item.length > 0) {
    instanceRef.current?.update();
  }
}, [loading, item]);
 
  useEffect(() => {
    fetchData();
  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {};
      item.forEach((item) => {
        const time = item.expiryDate - Date.now();

        const hours = Math.floor(time / 1000 / 60 / 24);
        const minutes = Math.floor(time / 1000 / 60) % 60;
        const seconds = Math.floor(time / 1000) % 60;

        updated[item.id] = 
        `${String(hours).padStart(1, "0")}h 
        ${String(minutes).padStart(2, "0")}m 
        ${String(seconds).padStart(2, "0")}s`;
      });
      setCountdowns(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [item]);
 
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
          <div style={{position: "relative"}}>

          <button
              onClick={() => instanceRef.current?.prev()}
              className="btn btn-light rounded-circle position-absolute top-50 translate-middle-y "
              style={{ left: "2px", zIndex: 1, width: "50px", height: "50px", transition: "transform 0.2s ease"}}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-50%) scale(1.2)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(-50%) scale(1)"}
            >◀
            </button>
           <div ref={slideRef} className="keen-slider">
          {loading ? (
            new Array(4).fill(0).map((_, index) => (
              <div className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item placeholder-glow">
                  <div className="author_list_pp placeholder-glow">
                    <span className="placeholder rounded-circle" style={{ width: "50px", height: "50px", display: "block" }} />
                  </div>
                  <div className="de_countdown placeholder-glow">
                    <span className="placeholder w-100" style={{ height: "20px", display: "block" }} />
                  </div>
                  <div className="nft__item_wrap placeholder-glow">
                    <span className="placeholder w-100" style={{ height: "200px", display: "block" }} />
                  </div>
                  <div className="nft__item_info placeholder-glow">
                    <span className="placeholder w-75 mb-2" style={{ display: "block" }} />
                    <span className="placeholder w-50 mb-2" style={{ display: "block" }} />
                    <span className="placeholder w-25 mb-2" style={{ display: "block" }} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            item.map((item) => (
              <div className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
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
                    {countdowns[item.id] || "Loading..."}
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
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
            ))
          )}

          </div>
           <button
              onClick={() => instanceRef.current?.next()}
              className="btn btn-light rounded-circle position-absolute top-50 translate-middle-y hover:bg-gray-200 transition duration-300 ease-in-out"
              style={{ right: "2px", zIndex: 1, width: "50px", height: "50px", transition: "transform 0.2s ease" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-50%) scale(1.2)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(-50%) scale(1)"}
            > ▶</button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
