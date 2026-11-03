import React, { useEffect, useState } from "react";
import axios from "axios";
import SimpleSlider from "../UI/SimpleSlider";
import NFTItemCard from "../UI/NFTItemCard";
import NFTItemSkeleton from "../UI/NFTItemSkeleton";

const newItemsUrl =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getNewItems() {
    setLoading(true);
    try {
      const { data } = await axios.get(newItemsUrl);
      setNewItems(data);
    } catch (error) {
      console.error("Error fetching new items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNewItems();
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
          <SimpleSlider>
            {loading
              ? [1, 2, 3, 4].map((_, index) => <NFTItemSkeleton key={index} />)
              : newItems.map((item) => (
                  <NFTItemCard key={item.id} item={item} />
                ))}
          </SimpleSlider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
