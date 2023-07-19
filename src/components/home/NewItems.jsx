import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "../UI/Item";
import ReactOwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  async function fetchItems() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setItems(data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching items:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  }

  useEffect(() => {
    fetchItems();
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
          {loading ? (
            <>
              {new Array(4).fill(0).map((_, index) => (
                <div className="nft__item" style={{
                  width: "315px",
                }}>
                  <div
                    style={{
                      height: "350px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      width={300}
                      height={300}
                      borderRadius={8}
                    ></Skeleton>
                  </div>
                  <div
                    style={{
                      display: "block",
                    }}
                  >
                    <Skeleton width={120} height={18}></Skeleton>
                  </div>
                  <Skeleton width={80} height={18}></Skeleton>
                </div>
              ))}
            </>
          ) : (
            <ReactOwlCarousel
              items={4}
              nav
              margin={12}
              loop
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
              {items.map((item) => (
                <Item item={item} key={item.id}></Item>
              ))}
            </ReactOwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
