import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useEffect, useState } from "react";
import { fetchNewItems } from "../../api"; // calls your env-based endpoint
import CarouselOwl from "../UI/CarouselOwl"; // reusable carousel component
import Skeleton from "../UI/Skeleton"; // (skeleton loading state)
import Message from "../Message";
import Countdown from "../UI/Countdown";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchNewItems();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("Failed to load new items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

          {/* ---------- Loading (Skeletons) ---------- */}
          {loading && (
            <div className="row">
              {[0, 1, 2, 3].map((i) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
                  <div className="nft__item">
                    <div className="nft__item_wrap">
                      <Skeleton />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton />
                      <Skeleton />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ---------- Error State ---------- */}
          {error && !loading && (
            <Message
              title="New Items"
              text={error}
              actionLabel="Retry"
              onAction={loadData}
            />
          )}

          {/* ---------- Loaded Items ---------- */}
          {!loading && !error && (
            <div className="row">
              {/* ⬇️ Owl carousel wrapper, shows 4 at a time, moves 1 per click */}
              <div className="owl-stage">
                <CarouselOwl>
                  {items.map((item) => (
                    <div className="item" key={item.id}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img
                              className="lazy"
                              src={item.authorImage || AuthorImage}
                              alt={item.author}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <Countdown endTime={item.expiryDate} />
                        <div className="nft__item_wrap">
                          <Link to="/item-details">
                            <img
                              src={item.nftImage || nftImage}
                              className="lazy nft__item_preview"
                              alt={item.title}
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
                    </div>
                  ))}
                </CarouselOwl>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
