import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const [loading, setLoading] = useState(true);

  const [cards, setCards] = useState([]);

  async function fetchHotCollections() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    console.log(data);
    setCards(data);
    setLoading(false);
  }

  console.log(loading);

  useEffect(() => {
    fetchHotCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <Skeleton cards={cards} loading={loading} />
          ) : (
            <Slider {...settings}>
              {cards.map((card, id) => (
                <div className="col-lg-12 col-md-6 col-sm-6 col-xs-12" key={id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={card.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={card.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{card.title}</h4>
                      </Link>
                      <span>{card.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
