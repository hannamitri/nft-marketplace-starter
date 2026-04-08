import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "../../components/Skeleton";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );

        setItems(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching new items:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  const Arrow = ({ onClick, direction }) => (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        [direction === "next" ? "right" : "left"]: "-25px",
        zIndex: 10,
        cursor: "pointer",
        background: "rgba(0,0,0,0.6)",
        color: "#fff",
        borderRadius: "50%",
        padding: "10px",
      }}
    >
      {direction === "next" ? "▶" : "◀"}
    </div>
  );

  const settings = {
    dots: true,
    infinite: items.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

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
            <Slider {...settings}>
              {loading
                ? [...Array(4)].map((_, index) => (
                    <NewItemSkeleton key={index} />
                  ))
                : items.map((item, index) => (
                    <div
                      key={item.nftId || item.nft_id || index}
                      style={{ padding: "0 10px" }}
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId || item.author_id}`}
                            title={`Creator: ${item.authorName || "Unknown"}`}
                          >
                            <div
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                overflow: "hidden",
                              }}
                            >
                              <Skeleton
                                src={item.authorImage || item.author_image}
                                alt={item.authorName || "author"}
                                className="lazy pp-author"
                                wrapperStyle={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              />
                            </div>
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="nft__item_wrap">
                          <Link to={`/item-details/${item.nftId || item.nft_id}`}>
                            <Skeleton
                              src={item.nftImage || item.nft_image}
                              alt={item.title}
                              className="nft__item_preview"
                              wrapperStyle={{
                                height: "280px",
                                borderRadius: "8px",
                              }}
                            />
                          </Link>
                        </div>

                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId || item.nft_id}`}>
                            <h4>{item.title}</h4>
                          </Link>

                          <div className="nft__item_price">
                            {Number(item.price || 0).toFixed(2)} ETH
                          </div>

                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

const NewItemSkeleton = () => (
  <div style={{ padding: "0 10px" }}>
    <div className="nft__item">
      <div className="author_list_pp">
        <div
          className="skeleton skeleton-circle"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        ></div>
      </div>

      <div className="nft__item_wrap">
        <div
          className="skeleton skeleton-img"
          style={{
            width: "100%",
            height: "280px",
            borderRadius: "8px",
          }}
        ></div>
      </div>

      <div className="nft__item_info">
        <div
          className="skeleton skeleton-text short"
          style={{ marginBottom: "10px" }}
        ></div>
        <div
          className="skeleton skeleton-text"
          style={{ marginBottom: "10px" }}
        ></div>
        <div className="skeleton skeleton-text"></div>
      </div>
    </div>
  </div>
);

export default NewItems;
