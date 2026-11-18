import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import Countdown from "../UI/Countdown";
import NftCard from "../UI/NftCard";
import NftCardSkeleton from "../UI/NftCardSkeleton";


const responsiveSettings = {
  0: { items: 1 },
  576: { items: 2 },
  768: { items: 3 },
  1200: { items: 4 },
};

const NewItems = () => {
  const [newUsers, setNewUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchNewUsers() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
    setNewUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchNewUsers();
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
          {loading ? (
            <OwlCarousel key="loading" className="owl-theme" loop margin={10} nav responsive={responsiveSettings}>
              {new Array(4).fill(0).map((_, index) => (
              <div className="item" key={index}>
                <NftCardSkeleton />
              </div>
              ))}
            </OwlCarousel>
          ) : (
          <OwlCarousel key="loaded"
            className="owl-theme" loop margin={10} nav responsive={responsiveSettings}>
            {newUsers.map((user) => (
            <div className="item" key={user.id}>
              <NftCard item={user} />
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
