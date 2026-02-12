import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const MemoOwlCarousel = React.memo(OwlCarousel);

const calculateCountdown = (expiryTimeStamp) => {
  const total = expiryTimeStamp - Date.now();

  if (total <= 0) {
    return null;
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

  return `${hours}h  ${minutes}m  ${seconds}s`;
};

const SkeletonCard = () => (
  <div className="item">
    <div className="nft__item skeleton">
      <div className="author_list_pp skeleton-circle"></div>
      <div className="de_countdown skeleton-line"></div>
      <div className="nft__item_wrap skeleton-image"></div>
      <div className="nft__item_info">
        <div className="skeleton-line" style={{ width: "60%" }}></div>
        <div className="skeleton-line" style={{ width: "40%" }}></div>
      </div>
    </div>
  </div>
);

const Countdown = React.memo(({ expiryDate }) => {
  const [time, setTime] = useState(() =>
    calculateCountdown(expiryDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateCountdown(expiryDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!time) return null;

  return <div className="de_countdown">{time}</div>;
});


const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
      )
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const carouselOptions = React.useMemo(
    () => ({
      loop: true,
      margin: 10,
      dots: false,
      nav: true,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 4 },
      },
    }),
    [],
  );

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="col-lg-12">
          <div data-aos="fade-up" data-aos-delay="200" className="text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>
        <style>
          {`
          .owl-prev, .owl-next {
            position: absolute;
            top: 40%; 
            background: rgba(0,0,0,0.5);
            color: #fff;
            padding: 10px 15px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 10;
            transition: all 0.2s ease;
          }

          .owl-prev {
            left: -30px;
          }

          .owl-next {
            right: -30px;
          }

          .owl-prev:hover, .owl-next:hover {
            background: rgba(0,0,0,0.7);
          }
        `}
        </style>
        {loading && (
          <div style={{ display: "flex", gap: "10px" }}>
            {new Array(4).fill(0).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}
        {!loading && (
          <MemoOwlCarousel
            className="owl-theme"
            loop
            margin={10}
            dots={false}
            nav
            navText={[
              "<i class='fa fa-angle-left'></i>",
              "<i class='fa fa-angle-right'></i>",
            ]}
            responsive={{
              0: { items: 1 },
              600: { items: 2 },
              1000: { items: 4 },
            }}
          >
            {items.map((item) => (
              <div className="item" key={item.nftId}>
                <div data-aos="fade-up" data-aos-delay="200"className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${item.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}
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
                        alt={item.title}
                      />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price}</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </MemoOwlCarousel>
        )}
      </div>
    </section>
  );
};

export default NewItems;
