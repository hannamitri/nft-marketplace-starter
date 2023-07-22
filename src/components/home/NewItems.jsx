import React, { useEffect, useState } from "react";
import ExploreNewItem from "../UI/exploreNewItem";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import axios from "axios";


const NewItems = () => {
  const [newItems, setNewItems] = useState();
  const [loading, setLoading] = useState(false)

  const getNewItems = async () => {
    setLoading(true)
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItems(response.data);
    setLoading(false)
  };

  useEffect(() => {
    getNewItems();
  }, []);

  const responsive = {
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
          {newItems?.length ? (
            <OwlCarousel loop margin={10} responsive={responsive} nav>
              {newItems.map((item) => (
                <div className="" key={item.id}>
                  <ExploreNewItem item={item} />
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel loop margin={10} responsive={responsive} nav>
              {new Array(9).fill(0).map((_, index) => (
                <div className="" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft__item_wrap">
                      <Skeleton width="100%" height="350px" className="mb-10" />
                    </div>
                    <div className="nft__item_info">
                      <div className="nft__item_price">
              
                          <Skeleton width="180px" height="30px" />
              
                        <Skeleton width="100px" height="30px" />
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
