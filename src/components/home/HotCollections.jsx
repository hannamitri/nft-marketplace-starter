import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CollectionCard from "./CollectionCard";
import HotCollectionsSkeleton from "./HotCollectionsSkeleton";
import SliderArrow from "../UI/SliderArrow";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
      )
      .then((response) => {
        setCollections(response.data);
      })
      .catch((error) => {
        console.error("Unable to load hot collections", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const settings = {
    dots: false,
    arrows: true,
    nextArrow: <SliderArrow label="Next collection" />,
    prevArrow: <SliderArrow label="Previous collection" />,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
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
          <div className="col-lg-12">
            {loading ? (
              <HotCollectionsSkeleton />
            ) : (
              <Slider {...settings}>
                {collections.map((collection) => (
                  <div key={collection.id}>
                    <CollectionCard collection={collection} />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
