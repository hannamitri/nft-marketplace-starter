import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import NewItem from "./NewItem";
import Skeleton from "../UI/Skeleton";
import NewItemSkeleton from "./NewItemSkeleton";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNewItems(data);
    }
    getData();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-in">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {newItems.length ? (
            <OwlCarousel
              margin={10}
              loop
              nav={true}
              responsive={{
                0: {
                  items: 1,
                },
                480: {
                  items: 2,
                },
                1000: {
                  items: 3,
                },
                1200: {
                  items: 4,
                },
              }}
            >
              {newItems.map((item) => (
                <NewItem item={item} key={item.id} />
              ))}
            </OwlCarousel>
          ) : (
            <>
              <OwlCarousel
                margin={10}
                loop
                nav={true}
                responsive={{
                  0: {
                    items: 1,
                  },
                  480: {
                    items: 2,
                  },
                  1000: {
                    items: 3,
                  },
                  1200: {
                    items: 4,
                  },
                }}
              >
                {new Array(6).fill(0).map((_, index) => (
                  <NewItemSkeleton key={index} />
                ))}
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
