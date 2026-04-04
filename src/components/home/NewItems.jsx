import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import NftCard, { NftCardSkeleton } from "../NftCard";

const carouselOptions = {
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  responsive: {
    0:   { items: 1 },
    576: { items: 2 },
    768: { items: 3 },
    992: { items: 4 },
  },
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
        setLoading(false);
      }
    };
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

          <div className="col-lg-12">
            {loading ? (
              // ── Skeleton carousel ──────────────────────────────────────────
              <OwlCarousel className="owl-theme" {...carouselOptions} key="skeleton">
                {new Array(8).fill(0).map((_, index) => (
                  <div className="item" key={index}>
                    <NftCardSkeleton />
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              // ── Live data carousel ─────────────────────────────────────────
              <OwlCarousel className="owl-theme" {...carouselOptions} key="items">
                {items.map((item) => (
                  <div className="item" key={item.id}>
                    <NftCard
                      nftId={item.nftId}
                      nftImage={item.nftImage}
                      title={item.title}
                      price={item.price}
                      likes={item.likes}
                      authorId={item.authorId}
                      authorImage={item.authorImage}
                      expiryDate={item.expiryDate}
                    />
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;