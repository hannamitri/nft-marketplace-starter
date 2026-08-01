import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import NftCard from "../UI/NftCard";
import NftCardSkeleton from "../UI/NftCardSkeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NEW_ITEMS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 992, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } },
  ],
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const { data } = await axios.get(NEW_ITEMS_URL);
        setItems(data.slice(0, 6));
      } catch (requestError) {
        console.error("Unable to fetch new items:", requestError);
        setError("Unable to load new items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {error && (
            <div className="col-12 text-center" role="alert">
              <p>{error}</p>
            </div>
          )}

          {loading && (
            <div className="col-12" role="status" aria-live="polite">
              <span className="sr-only">Loading new items...</span>
              <Slider {...sliderSettings} className="hot-collections-slider">
                {Array.from({ length: 6 }, (_, index) => (
                  <NftCardSkeleton key={index} showCountdown />
                ))}
              </Slider>
            </div>
          )}

          {!loading && items.length > 0 && (
            <div className="col-12">
              <Slider {...sliderSettings} className="hot-collections-slider">
                {items.map((item) => (
                  <NftCard key={item.id} item={item} />
                ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
