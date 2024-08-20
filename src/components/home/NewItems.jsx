import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import "aos/dist/aos.css";
import Aos from "aos";
import AllItems from "../allitems";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(33.33);

  async function fetchItems() {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
      );
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch items", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
    Aos.init();

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCenterSlidePercentage(100);
      } else {
        setCenterSlidePercentage(33.33);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it initially to set the correct value

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="section-collections" className="">
      <div className="container">
        <div className="row">
          <div className="text-center">
            <h2 data-aos="fade-in">New Items</h2>
            <div className=" bg-color-2"></div>
          </div>
        </div>
        <div className="row justify-center align-center">
          <div>
            <Carousel
              showArrows={true}
              showThumbs={false}
              infiniteLoop={true}
              centerMode={true}
              centerSlidePercentage={centerSlidePercentage}
              showStatus={false}
            >
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div className="p-2" key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton width={500} height={270} />
                        </div>
                        <div className="nft_coll_pp">
                          <Skeleton width={50} height={50} borderRadius={99} />
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <h4>
                            <Skeleton height={20} width="40%" />
                          </h4>
                          <span>
                            <Skeleton height={20} width="20%" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                : items.map((item, index) => (
                  <div className="p-2" key={index}>
                  <AllItems item={item} loading={loading} />
                </div>
              ))}

            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;