import React, { useState, useEffect } from "react";
import axios from "axios";
import NewItem from "../UI/NewItem";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const NewItems = () => {
  const [newItemsData, setnewItemsData] = useState();
  const [loading, setLoading] = useState(false);

  const getNewItemsData = async () => {
    try {
      setLoading(true);
      await axios
        .get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
        )
        .then(({ data }) => {
          setnewItemsData(data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getNewItemsData();
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
            {newItemsData?.map((newItemsData, id) => (
              <NewItem newItemsData={newItemsData} key={id} loading={loading} />
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
