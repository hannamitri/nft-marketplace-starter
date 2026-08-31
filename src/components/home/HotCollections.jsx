import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function ProfileCard({ isLoading, data }) {
    if (isLoading) {
      return (
        <div className="card">
          <Skeleton circle width={50} height={50} />
          <h2>
            <Skeleton width={150} />
          </h2>
          <p>
            <Skeleton count={3} />
          </p>
        </div>
      );
    }

    return (
      <div className="card">
        <img
          src={data.avatar}
          alt={data.name}
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
        <h2>{data.name}</h2>
        <p>{data.bio}</p>
      </div>
    );
  }

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch collections");
        }
        const data = await response.json();
        const collectionItems = Array.isArray(data) ? data : data.value;

        if (!Array.isArray(collectionItems)) {
          throw new Error("Invalid collections response");
        }

        setCollections(collectionItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  // Slider Settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  if (loading) {
    return <ProfileCard isLoading={true} />;
  }
  if (error) return <div>Error: {error}</div>;
  if (collections.length === 0) return null;

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

          <Slider {...sliderSettings}>
            {collections.map((item) => (
              <div className="px-2" key={item.id || item.code}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage || nftImage}
                        className="lazy img-fluid"
                        alt={item.title}
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={item.authorImage || AuthorImage}
                        alt={item.authorName}
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
        </div>
      </div>
    </section>
  );
};

export default HotCollections;