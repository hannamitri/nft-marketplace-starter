import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import { NftItem } from "../UI/NftItem";

const NewItems = () => {
  const [newItemsData, setNewItemsData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchNewItems() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setNewItemsData(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchNewItems();
  }, [loading]);

  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    draggable: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
          {!loading && newItemsData.length > 0 ? (
            <Slider {...settings}>
              {newItemsData.map((nft) => (
                <div key={nft.id}>
                  <NftItem nft={nft} />
                </div>
              ))}
            </Slider>
          ) : (
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_col">
                <div className="nft_col_pp">
                  <Skeleton  width={50} height={50} borderRadius={99} />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_wrap">
                  <Skeleton width={282} height={270} />
                </div>
                <div className="nft_col_info">
                  <h4>
                    <Skeleton width="40%" height={20} />
                  </h4>
                  <span>
                    <Skeleton height={20} width="20%" />
                  </span>
                </div>
              </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
