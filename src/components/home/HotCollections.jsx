import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./HotCollections.css";


const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );

        const data = await response.json();

        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

  let settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
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
  <div className="skeleton__collections">
    {[1, 2, 3, 4].map((item) => (
      <div className="skeleton__card" key={item}>
        <div className="skeleton skeleton__image"></div>

        <div className="skeleton__profile-wrapper">
          <div className="skeleton skeleton__profile"></div>
        </div>

        <div className="skeleton skeleton__title"></div>
        <div className="skeleton skeleton__text"></div>
        <div className="skeleton skeleton__text skeleton__text--small"></div>
      </div>
    ))}
  </div>
) : (
  <Slider {...settings}>
    {collections.map((data, index) => (
      <div key={index}>
        <div className="nft_coll">
          <div className="nft_wrap">
            <Link to={`/item-details/${data.nftId}`}>
              <img
                src={data.nftImage}
                className="lazy img-fluid"
                alt=""
              />
            </Link>
          </div>

          <div className="nft_coll_pp">
            <Link to={`/author/${data.authorId}`} data-bs-toggle="tooltip" data-bs-placement="top" > 
              <img
                className="lazy pp-coll"
                src={data.authorImage}
                alt=""
              />
            </Link>
            <i className="fa fa-check"></i>
          </div>

          <div className="nft_coll_info">
            <Link to="/explore">
              <h4>{data.title}</h4>
            </Link>
            <span>ERC-{data.code}</span>
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