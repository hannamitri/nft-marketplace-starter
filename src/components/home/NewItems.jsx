import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import axios from "axios";
import NftCard from "../UI/NftCard";
import NftCardSkeleton from "../UI/NftCardSkeleton";

const NewItems = () => {
  const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const { data } = await axios.get(
      ` https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setItemsData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
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

          <OwlCarousel
            className="owl-theme"
            items={4}
            loop
            margin={10}
            nav
            dots={false}
            responsive={{
              0: { items: 1 },
              500: { items: 2 },
              768: { items: 3 },
              1000: { items: 4 },
            }}
          >
            {loading && itemsData.length === 0 ? (
              <NftCardSkeleton />
            ) : (
              itemsData.map((item) => <NftCard nftInfo={item} />)
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
