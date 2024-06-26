import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

function HotCollectionsSkeletonHTML() {
  return (
    <div className="slider-item hot-coll__skeleton-item">
      <div className="nft_coll">
        <div className="nft_wrap">
          <div className="skeleton-box hot-coll__skeleton-img"></div>
        </div>
        <div className="nft_coll_pp">
          <div className="skeleton-box hot-coll__skeleton-pp"></div>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <div className="skeleton-box hot-coll__skeleton-title"></div>
          <div className="skeleton-box hot-coll__skeleton-code"></div>
        </div>
      </div>
    </div>
  );
}

function HotCollectionsSkeleton() {
  let width = window.innerWidth;
  if(width >= 992) {
    return (
      <div style={{display: "flex"}}>
        <HotCollectionsSkeletonHTML />
        <HotCollectionsSkeletonHTML />
        <HotCollectionsSkeletonHTML />
        <HotCollectionsSkeletonHTML />
      </div>
    )
  } else if (width >= 576) {
    return (
      <div style={{display: "flex"}}>
        <HotCollectionsSkeletonHTML />
        <HotCollectionsSkeletonHTML />
      </div>
    )
  } else {
    return (
      <HotCollectionsSkeletonHTML />
    )
    }
}

const HotCollections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchHCData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchHCData();
  }, []);

  //Slider Settings
  var settings = {
    infinite: true,
    speed: 150,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
          {loading ? (
            <>
              <HotCollectionsSkeleton />
            </>
          ) : (
            <Slider {...settings} className="slider-wrapper">
              {data.map((item) => (
                <div className="slider-item" key={item.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
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
