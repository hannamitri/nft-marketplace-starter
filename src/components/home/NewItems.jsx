import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { getNewItems } from "../../api/newItems";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function formatTimeLeft(expiryDate) {
  const timeLeft = expiryDate - Date.now();

  if (timeLeft <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

function Countdown({ expiryDate }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!expiryDate) return;

    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!expiryDate) return null;

  const { hours, minutes, seconds } = formatTimeLeft(expiryDate);

  if (hours === 0 && minutes === 0 && seconds === 0) return null;

  return (
    <div className="de_countdown">
      {hours}h {minutes}m {seconds}s
    </div>
  );
}

const NewItemSkeletonCard = () => {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <div className="ni-skel ni-skel-avatar" />
      </div>

      <div className="ni-skel ni-skel-countdown" />

      <div className="nft__item_wrap">
        <div className="ni-skel ni-skel-img" />
      </div>

      <div className="nft__item_info">
        <div className="ni-skel ni-skel-title" />
        <div className="ni-skel ni-skel-price" />

        <div className="ni-skel-like-row">
          <div className="ni-skel ni-skel-heart" />
          <div className="ni-skel ni-skel-likes" />
        </div>
      </div>
    </div>
  );
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        await new Promise((r) => setTimeout(r, 1500));
        const data = await getNewItems();

        const list = Array.isArray(data)
          ? data
          : (data?.data ?? data?.items ?? []);
        setItems(list);
      } catch (err) {
        console.log("❌ getNewItems error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
          <div className="col-lg-12">
            <OwlCarousel
              key={loading ? "loading" : `loaded-${items.length}`}
              className="owl-theme"
              loop={!loading}
              nav
              dots={false}
              margin={20}
              slideBy={1}
              responsive={{
                0: { items: 1, slideBy: 1 },
                576: { items: 2, slideBy: 1 },
                992: { items: 3, slideBy: 1 },
                1100: { items: 4, slideBy: 1 },
              }}
            >
              {(loading ? new Array(4).fill(null) : items).map(
                (item, index) => (
                  <div className="item" key={item?.id ?? `skel-${index}`}>
                    {item ? (
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}` || "#"}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator"
                          >
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <Countdown expiryDate={item.expiryDate} />

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
                          <div className="nft__item_price">
                            {item.price} ETH
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <NewItemSkeletonCard />
                    )}
                  </div>
                ),
              )}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
