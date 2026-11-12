import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { NewItemCard, NewItemsSkeleton, extractItems } from "../UI/NftCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewItems.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

export default function NewItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchItems() {
      const started = Date.now();

      try {
        const response = await axios.get(API_URL, {
          signal: controller.signal,
        });

        const results = extractItems(response.data);
        setItems(results.slice(0, 7));
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError("Unable to load new items.");
        }
      } finally {
        const remaining = Math.max(0, 2000 - (Date.now() - started));

        await new Promise((resolve) => setTimeout(resolve, remaining));

        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchItems();

    return () => controller.abort();
  }, []);

  const settings = {
    dots: false,
    infinite: items.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    accessibility: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: items.length > 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          infinite: items.length > 1,
        },
      },
    ],
  };

  return (
    <section id="section-items" className="no-bottom new-items">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2" />
            </div>
          </div>
        </div>

        {loading && <NewItemsSkeleton />}

        {!loading && error && (
          <p className="ni-status" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="ni-status">No new items available.</p>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="ni-slider">
            <Slider {...settings}>
              {items.map((item) => (
                <div key={item.id} className="ni-slide">
                  <NewItemCard item={item} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
}
