import axios from "axios";
import React, { useState, useEffect } from "react";
import ExploreItem from "../UI/ItemInfo";
import Skeleton from "../UI/Skeleton";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Aos from "aos";
import "aos/dist/aos.css";

const NewItems = () => {
  Aos.init();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const state = {
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };

  async function getNew() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    getNew();
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
          <OwlCarousel
            nav
            loop
            items={4}
            margin={16}
            responsive={state.responsive}
            data-aos="fade-in"
            data-aos-delay="100"
            data-aos-duration="1000"
          >
            {loading ? (
              items.map((item) => {
                return (
                  <ExploreItem
                    key={item.id}
                    title={item.title}
                    authImg={item.authorImage}
                    expire={item.expiryDate}
                    likes={item.likes}
                    nftImg={item.nftImage}
                    price={item.price}
                    authId={item.authorId}
                    nftId={item.nftId}
                    loading={loading}
                  />
                );
              })
            ) : (
              <Skeleton
                width={"284px"}
                height={"422px"}
                borderRadius={"16px"}
              />
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
