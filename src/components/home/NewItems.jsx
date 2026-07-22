import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Card from "../UI/Card";
import CardSkeleton from "../UI/CardSkeleton";


const carouselOptions = {
  className: "owl-theme",
  loop: true,
  nav: true,
  dots: false,
  margin: 8,
  navText: ["<", ">"],
  responsive: {
    0: { items: 1 },
    572: { items: 2 },
    992: { items: 3 },
    1200: { items: 4 },
  },
};

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewItems();
  }, []);

  async function fetchNewItems() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNewItems(data);
      setLoading(false);
    } catch {
      setLoading(false);
      console.error("There was an error fetching New Items");
    }
  }

  return (
    <>
      <section id="section-items" className="no-bottom" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000" id="section-collections" >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>New Items</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <OwlCarousel key={loading} {...carouselOptions}>
              {loading
                ? new Array(4).fill(0).map((_, index) => (
                  <CardSkeleton key={index} />
                  ))
                : 
                (newItems.map(
                    (item) => (
                      <Card key={item.nftId} {...item} />
                    )
                  ))    
                    }
            </OwlCarousel>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewItems;
