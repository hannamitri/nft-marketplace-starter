import React, { useEffect, useState } from "react";
import axios from "axios";
import Collection from "../UI/Collection";
import OwlCarousel from "react-owl-carousel";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  async function fetchCollections() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );

    setCollections(data);
  }

  useEffect(() => {
    fetchCollections();
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
            margin={12}
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
            {
              collections.map((collection) => (
                <Collection collection={collection} key={collection.id} />
              ))
            }
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
