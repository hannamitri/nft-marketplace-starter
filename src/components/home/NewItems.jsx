import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Item from "../UI/Item";
import ReactOwlCarousel from "react-owl-carousel";

const NewItems = () => {
  const [items, setItems] = useState([]);

  async function fetchItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );

    setItems(data);
  }

  useEffect(() => {
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
          <ReactOwlCarousel
            items={4}
            nav
            margin={12}
            loop
            responsive={{
              0: {
                items: 1,
              },
              500: {
                items: 1,
              },
              600: {
                items: 2,
              },
              1000: {
                items: 4,
              },
            }}
          >
            {items.map((item) => (
              <Item item={item} key={item.id}></Item>
            ))}
          </ReactOwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
