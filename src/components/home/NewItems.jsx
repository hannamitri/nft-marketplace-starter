import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../UI/Carousel";
import Countdown from "../UI/Countdown";

const NewItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
        );
        setItems(data);
      } catch (err) {
        console.error("Error fetching items", err);
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
          <Carousel
            items={items.map((item) => ({
              ...item,
              expiryDate: item.expiryDate,
              countdown: <Countdown item={item} />
            }))}
          />
        </div>
      </div>
    </section>
  );
};

export default NewItems;
