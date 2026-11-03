import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ItemCard, { ItemCardSkeleton, validItem } from "../UI/ItemCard";
import useItemClock from "../UI/useItemClock";
import "slick-carousel/slick/slick.css";
import "./NewItems.css";

const NEW_ITEMS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

function CarouselArrow({ direction, onClick }) {
  return (
    <button type="button" className={`new-items-arrow new-items-arrow-${direction}`}
      aria-label={`${direction === "prev" ? "Previous" : "Next"} new items`} onClick={onClick}>
      <span aria-hidden="true">{direction === "prev" ? "‹" : "›"}</span>
    </button>
  );
}

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const now = useItemClock(items);

  useEffect(() => {
    const controller = new AbortController();
    async function loadItems() {
      try {
        const response = await fetch(NEW_ITEMS_URL, { signal: controller.signal });
        if (!response.ok) throw new Error("Unable to load new items");
        const data = await response.json();
        // Fail closed: malformed responses show an error instead of invented card data.
        if (!Array.isArray(data) || !data.every(validItem)) throw new Error("Invalid new items");
        if (!controller.signal.aborted) {
          setItems(data);
          setStatus("success");
        }
      } catch (error) {
        if (!controller.signal.aborted) setStatus("error");
      }
    }
    loadItems();
    return () => controller.abort();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    arrows: true,
    accessibility: true,
    prevArrow: <CarouselArrow direction="prev" />,
    nextArrow: <CarouselArrow direction="next" />,
    responsive: [
      { breakpoint: 1199, settings: { slidesToShow: 3 } },
      { breakpoint: 991, settings: { slidesToShow: 2 } },
      { breakpoint: 575, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="section-items" className="no-bottom new-items" aria-labelledby="new-items-heading">
      <div className="container">
        <div className="text-center">
          <h2 id="new-items-heading">New Items</h2>
          <div className="small-border bg-color-2"></div>
        </div>
        {status === "loading" && (
          <div role="status" aria-label="Loading new items" aria-busy="true">
            <span className="new-items-sr-only">Loading new items…</span>
            <div className="new-items-skeletons" aria-hidden="true">
              {Array.from({ length: 4 }, (_, index) => (
                <div className="new-items-slide" key={index}>
                  <ItemCardSkeleton />
                </div>
              ))}
            </div>
          </div>
        )}
        {status === "error" && <p role="alert" className="text-center">Unable to load new items. Please try again later.</p>}
        {status === "success" && items.length === 0 && <p role="status" className="text-center">No new items available.</p>}
        {status === "success" && items.length > 0 && (
          <div className="new-items-carousel" role="list" aria-label="New items carousel">
            <Slider {...settings}>
              {items.map((item) => (
                <div className="new-items-slide" role="listitem" key={item.id}>
                  <ItemCard item={item} now={now} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewItems;
