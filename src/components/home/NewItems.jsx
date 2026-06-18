import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading new items:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container no-top">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <OwlCarousel
            className="owl-theme"
            loop={true}
            margin={20}
            nav={true}
            dots={false}
            responsive={{
              0: { items: 1 },
              576: { items: 2 },
              768: { items: 3 },
              1200: { items: 4 },
            }}
          >
            {items.map((item, index) => (
              <div className="item" key={item.nftId || index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        src={item.authorImage}
                        alt={item.title}
                        className="lazy"
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        alt={item.title}
                        className="lazy nft__item_preview"
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
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
