import axios from "axios";
import React, { useState, useEffect } from "react";
import HotCollection from "../UI/HotCollection";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [hotCollectionsData, setHotCollectionsData] = useState();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      await axios
        .get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
        )
        .then(({ data }) => {
          setHotCollectionsData(data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getData();
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
          {loading ? null : (
            <OwlCarousel
              className="owl-theme"
              dots={false}
              items={4}
              nav={true}
              margin={10}
              responsive={{
                600: {
                  items: 1,
                },
                800: {
                  items: 2,
                },
                1000: {
                  items: 3,
                },
                1200: {
                  items: 4,
                },
              }}
              loop>
              {hotCollectionsData?.map((data, index) => {
                return (
                  <HotCollection key={index} data={data} loading={loading} />
                );
              })}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
