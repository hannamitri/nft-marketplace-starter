import React, { useState, useEffect } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import Item from "./Item";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };

    fetchData();
  }, []);

  const options = {
    loop: true,
    nav: true,
    dots: false,
    margin: 20,
    responsive: {
      1440: { items: 4 },
      1024: { items: 3 },
      768: { items: 2 },
      375: { items: 1 },
    },
  };

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
          <OwlCarousel className="owl-theme" {...options}>
            {items.length === 0 && loading
              ? new Array(4).fill(0).map((_, index) => (
                <div className=" col-lg-12 col-md-12 col-xs-12" key={index}>
                  <div className="nft_coll nft_coll--loading">
                    <div className="nft_wrap">
                      <Skeleton width="100%" height="80%" />
                    </div>
                    <div className="nft_coll_pp--loading">
                      <Skeleton
                        width="60px"
                        height="60px"
                        borderRadius={'50%'}
                      />
                    </div>
                    <div className="nft_coll_info--loading">
                      <Skeleton width="120px" height="18px" />
                      <div className="margin">
                        <Skeleton width="56px" height="18px" />
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                items.map((item) => (
                  <Item key={item.id} item={item} />
                ))
              )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );

};

export default NewItems;
