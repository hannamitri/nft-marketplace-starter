import React, { useEffect, useState } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import Card from "../UI/Card";

const NewItems = () => {
  const [collection, setCollection] = useState([]);

  async function fetchCollection() {
    try {
      const res = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setCollection(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
      fetchCollection();
  }, []);


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div data-aos="fade" className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <OwlCarousel
          data-aos="fade"
            key={collection.length}
            loop
            margin={10}
            nav
            responsive={{
              0: {
                items: 1,
              },
              600: {
                items: 2,
              },
              1000: {
                items: 3,
              },
              1400: {
                items: 4,
              },
            }}
          >
            <Card collection={collection} />
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
