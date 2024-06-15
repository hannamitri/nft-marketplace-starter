import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import ItemCard from "../UI/ItemCard";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  async function fetchNewItems() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNewItems(data);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching new items:", error);
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    fetchNewItems();
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
          {isLoaded ? (
            <OwlCarousel
              className="owl-theme"
              margin={10}
              loop
              items={4}
              nav
              dots={false}
              lazyLoad
              responsiveClass={true}
              responsive={{
                0: {
                  items: 1,
                },
                740: {
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
              {newItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel
              className="owl-theme"
              margin={10}
              loop
              items={4}
              nav
              dots={false}
              lazyLoad
              responsiveClass={true}
              responsive={{
                0: {
                  items: 1,
                },
                740: {
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
             {[...Array(4)].map((_, index) => (
                  <div key={index}>
                      <div className="author_list_pp">
                        <Skeleton
                          width="60px"
                          height="60px"
                          alt=""
                        />
                      <i className="fa fa-check"></i>
                      </div>
                      
                    <div className="nft__item">
                      <Skeleton
                        className="lazy img-fluid"
                        width="275px"
                        height="300px"
                      />

                      <div className="nft__item_info">
                        <Skeleton width="160px" height="15px" />
                        <h4>
                          <Skeleton width="60px" height="15px" />
                        </h4>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>
                            <Skeleton width="30px" height="15px" />
                          </span>
                        </div>
                      </div>
                    </div>
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
