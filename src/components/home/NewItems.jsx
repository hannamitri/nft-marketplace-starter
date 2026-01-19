import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderSettings } from "../common/sliderConfig";
import SliderButton from "../common/SliderButton";
import NFTCard from "../common/NFTCard";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = React.useRef(null);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(response.data || []);
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom section-collections">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div className="skeleton skeleton-avatar"></div>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="skeleton skeleton-image" style={{ height: 250 }}></div>
                  </div>
                  <div className="nft__item_info">
                    <div className="skeleton skeleton-title" style={{ width: '60%' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-lg-12">
              <div style={{ position: 'relative' }}>
                <Slider ref={sliderRef} {...sliderSettings}>
                  {items.map((item, index) => (
                    <div key={index}>
                      <NFTCard item={item} variant="slider" />
                    </div>
                  ))}
                </Slider>
                <SliderButton direction="prev" onClick={() => sliderRef.current.slickPrev()} />
                <SliderButton direction="next" onClick={() => sliderRef.current.slickNext()} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
