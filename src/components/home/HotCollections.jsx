import axios from "axios";
import React, { useState, useEffect } from "react";
import CollectionCard from "../UI/CollectionCard";
import Skeleton from "../UI/Skeleton";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Aos from "aos";
import "aos/dist/aos.css";

const HotCollections = () => {
  Aos.init();
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
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

  async function getHotCollection() {
    setLoading(false);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollection(data);
    setLoading(true);
  }

  useEffect(() => {
    getHotCollection();
  }, []);
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel
            items={4}
            nav
            loop
            margin={16}
            responsive={state.responsive}
            data-aos="fade-in"
            data-aos-delay="100"
            data-aos-duration="1000"
          >
            {!loading ? (
              collection.map((item, index) => {
                return (
                  <CollectionCard
                    key={index}
                    img={item.nftImage}
                    authId={item.authorId}
                    author={item.authorImage}
                    title={item.title}
                    code={item.code}
                    url={item.nftId}
                  />
                );
              })
            ) : (
              <Skeleton
                width={"244px"}
                height={"408px"}
                borderRadius={"16px"}
              />
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
