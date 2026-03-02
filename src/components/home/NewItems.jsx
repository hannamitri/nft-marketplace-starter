import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { getTimeLeft } from "../../utils/time.js";
import Skeleton from "../UI/Skeleton";

const NEW_ITEMS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tick, setTick] = useState(0);
  const owlInitialized = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      const start = Date.now();

      const res = await fetch(NEW_ITEMS_URL, { signal: controller.signal });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : data.data);

      const elapsed = Date.now() - start;
      const remaining = 500 - elapsed;
      if (remaining > 0) {
        await new Promise((r) => setTimeout(r, remaining));
      }

      setIsLoading(false);
    }

    load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const $ = window.jQuery;
    if (typeof $ !== "function") return;

    const $el = $(".new-items-owl");
    if (!$el.length) return;

    if (isLoading) {
      if ($el.hasClass("owl-loaded")) {
        $el.trigger("destroy.owl.carousel");
        $el.removeClass("owl-loaded");
        $el.find(".owl-stage-outer").children().unwrap();
      }
      owlInitialized.current = false;
      return;
    }

    if (!items.length) return;
    if (typeof $el.owlCarousel !== "function") return;

    const t = setTimeout(() => {
      $el.owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        responsive: {
          0: { items: 1 },
          576: { items: 2 },
          992: { items: 3 },
          1200: { items: 4 },
        },
      });
      owlInitialized.current = true;
    }, 0);

    return () => {
      clearTimeout(t);
      if ($el.hasClass("owl-loaded")) {
        $el.trigger("destroy.owl.carousel");
      }
      owlInitialized.current = false;
    };
  }, [isLoading, items]);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
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

          <div className={`new-items-owl ${isLoading ? "" : "owl-carousel"}`}>
            {isLoading ? (
              <div className="skeleton-strip">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div className="skeleton-slide" key={i}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </div>

                      <div className="nft__item_wrap">
                        <Skeleton
                          width="100%"
                          height="260px"
                          borderRadius="12px"
                        />
                      </div>

                      <div className="nft__item_info">
                        <Skeleton
                          width="70%"
                          height="18px"
                          borderRadius="8px"
                        />
                        <br />
                        <Skeleton
                          width="40%"
                          height="18px"
                          borderRadius="8px"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              items.map((item) => (
                <div className="item" key={item.id}>
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

                    {tick && getTimeLeft(item.expiryDate) !== "0h 0m 0s" && (
                      <div className="de_countdown">
                        {getTimeLeft(item.expiryDate)}
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
        </div>
      </div>
    </section>
  );
};

export default NewItems;
