import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";
import Card from "../UI/Card";

const NewItems = () => {
  const [loading, setLoading] = useState(undefined);
  const [items, setItems] = useState([]);

  async function getData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const state = {
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-items" className="no-bottom" data-aos="fade-in" data-aos-duration="1000">
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
              <OwlCarousel
                items={4}
                loop={true}
                nav={true}
                margin={12}
                responsive={state.responsive}
              >
                {items.map((item) => (
                  <Card item={item} key={item.id} />
                ))}
              </OwlCarousel>
            </>
          ) : (
            <>
              <OwlCarousel
                items={4}
                loop={true}
                nav={true}
                margin={12}
                responsive={state.responsive}
              >
                {new Array(5).fill(0).map((_, index) => (
                  <div className="item" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton width={0} height={50} borderRadius={0} />
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft__item_wrap">
                        <Skeleton width={275} height={350} borderRadius={0} />
                      </div>

                      <div className="nft__item_info">
                        <Skeleton width={0} height={35} borderRadius={0} />

                        <Skeleton width={160} height={30} borderRadius={0} />

                        <div className="nft__item_price">
                          <Skeleton width={90} height={20} borderRadius={0} />
                        </div>
                        <div className="nft__item_like">
                          <Skeleton width={30} height={15} borderRadius={0} />
                        </div>
                      </div>
                    </div>
                  </div>
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
