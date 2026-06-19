import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactOwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";
import NewItem from "./NewItem";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  async function getItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
    );
    return data;
  }

  useEffect(() => {
    async function load() {
      const results = await getItems();
      setItems(results);
      setLoading(false);
    }
    load();
  }, []);

  // Only delay Owl mounting, if it loads first then nothing displays
  useEffect(() => {
    if (!loading) {
      setReady(true);
    }
  }, [loading]);

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
          {ready ? (
            <ReactOwlCarousel
              className="owl-theme"
              loop
              margin={10}
              nav
              responsive={{
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 4 },
              }}
            >
              {loading
                ? new Array(5).fill(0).map((_, i) => (
                    <div className="item" key={i}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="de_countdown">
                          <Skeleton width="80px" height="20px" />
                        </div>
                        <div className="nft__item_wrap">
                          <Skeleton
                            width="100%"
                            height="200px"
                            borderRadius="10px"
                          />
                        </div>
                        <div className="nft__item_info">
                          <Skeleton
                            width="120px"
                            height="20px"
                            style={{ marginBottom: "10px" }}
                          />
                          <div className="nft__item_price">
                            <Skeleton width="80px" height="20px" />
                          </div>
                          <div className="nft__item_like">
                            <Skeleton width="30px" height="20px" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : items.map((item) => (
                    <NewItem 
                      item={item}
                      author={item}
                      style={{
                        display: "block",
                        width: "100%",
                        maxWidth: "100%",
                        padding: "0"
                      }}
                      key={item.id}  
                    />
                  ))}
            </ReactOwlCarousel>
          ) : (
            <div className="row">
              <ReactOwlCarousel
                className="owl-theme"
                loop
                margin={10}
                nav
                responsive={{
                  0: { items: 1 },
                  600: { items: 2 },
                  1000: { items: 4 },
                }}
              >
                {new Array(5).fill(0).map((_, i) => (
                  <div className="item" key={i}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="de_countdown">
                        <Skeleton width="80px" height="20px" />
                      </div>
                      <div className="nft__item_wrap">
                        <Skeleton
                          width="100%"
                          height="200px"
                          borderRadius="10px"
                        />
                      </div>
                      <div className="nft__item_info">
                        <Skeleton
                          width="120px"
                          height="20px"
                          style={{ marginBottom: "10px" }}
                        />
                        <div className="nft__item_price">
                          <Skeleton width="80px" height="20px" />
                        </div>
                        <div className="nft__item_like">
                          <Skeleton width="30px" height="20px" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactOwlCarousel>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
