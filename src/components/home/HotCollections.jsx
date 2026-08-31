import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";




const carouselOptions = {
  loop: true,
  margin: 20,
  nav: true,
  dots: false,
  responsive: {
    0: { items: 1 },
    576: { items: 2 },
    992: { items: 4 },
  },
};

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
 

  


useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true);
      setError(null);


      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        console.error("HotCollections fetch failed:", fetchError);
        setError("Unable to load hot collections.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const renderCollections = () =>
    collections.map((collection, index) => {
      const itemImage = collection?.nftImage || collection?.image || nftImage;
      const authorImage =
        collection?.authorImage || collection?.authorImg || AuthorImage;
      const title = collection?.title || collection?.name || "Collection";
      const key = collection?.id || index;

      return (
        <div className="pe-3" style={{ minWidth: "320px" }} key={key}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <Link to="/item-details">
                <img src={itemImage} className="lazy img-fluid" alt={title} />
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to="/author">
                <img
                  className="lazy pp-coll"
                  src={authorImage}
                  alt={`${title} author`}
                />
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to="/explore">
                <h4>{title}</h4>
              </Link>
              <span>ERC-192</span>
            </div>
          </div>
        </div>
      );
    });

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
        </div>

        {isLoading ? (
          <div className="row">
            <div className="col-lg-12 text-center">
              <p>Loading hot collections...</p>
            </div>
          </div>
        ) : error ? (
          <div className="row">
            <div className="col-lg-12 text-center">
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-12">
              <OwlCarousel className="owl-theme" {...carouselOptions}>
                {renderCollections()}
              </OwlCarousel>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HotCollections;
