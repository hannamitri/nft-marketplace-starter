import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../../css/styles/loadingState.css";
import Skeleton from "../UI/Skeleton";
import NFTCard from "../UI/NFTCard";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      )
      .then((response) => {
        setNewItems(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const options = {
    items: 4,
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    rewind: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  const renderSkeleton = () => <Skeleton type="Items" />;
    
  

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
            {/* brrrrrrpppp */}
          </div>
          {isLoading ? (
            <>
              <OwlCarousel className="owl-theme" {...options}>
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index}>{renderSkeleton()}</div>
                  ))}
              </OwlCarousel>
            </>
          ) : (
            <OwlCarousel className="owl-theme" {...options}>
              {newItems.map((items) => (
                <div key={items.id}>
                   <NFTCard item={items} />
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
