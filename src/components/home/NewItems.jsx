import React, { useEffect, useState } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";
import NftCard from "../UI/NftCard";

const carouselOptions = {
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  responsive: {
    0: { items: 1 },
    576: { items: 2 },
    768: { items: 3 },
    1200: { items: 4 },
  },
};

const NewItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch new items:", error);
      }
    }
    fetchItems();
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
          {items.length > 0 ? (
            <OwlCarousel className="owl-theme" {...carouselOptions}>
              {items.map((item) => (
                <NftCard item={item} key={item.id} />
              ))}
            </OwlCarousel>
          ) : (
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <Skeleton width="100%" height="400px" borderRadius="15px" />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
