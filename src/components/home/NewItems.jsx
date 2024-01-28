import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "../slider/Slider";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then(({ data }) => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching new items:", error);
      })
  }, [])

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-in">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-in">New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <Slider data={items} loading={loading} from={"newItems"} />


        </div>
      </div>
    </section>
  );
};

export default NewItems;
