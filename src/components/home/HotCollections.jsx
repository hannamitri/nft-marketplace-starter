import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const settings = {
  dots: false,
  loop: true,
  items: 4,
  slideBy: 1,
  autoplay: true,
  autoplayTimeout: 2000,
};

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
nicole_hotcollections
  const fetchCollections = async () => {
    try {
      const response = await fetch(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      Updated upstream
    
      console.log(data);
Stashed changes
      setCollections(data);
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    }
  };

  fetchCollections();
}, []);
    const fetchCollections = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setCollections(data);
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      }
    };

    fetchCollections();
  }, []);
 main
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
    nicole_hotcollections
            <OwlCarousel className="owl-theme" {...settings}>
             {collections.map((item) => (
  <div key={item.id} style={{ padding: "0 10px" }}>
    <div className="nft_coll">
      <div className="nft_wrap">
        <Link to="/item-details">
          <img
            src={item.nftImage || nftImage}
            className="lazy img-fluid"
            alt={item.title}
          />
        </Link>
      </div>

      <div className="nft_coll_pp">
        <Link to="/author">
          <img
            className="lazy pp-coll"
            src={item.authorImage || AuthorImage}
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
            </OwlCarousel>

            {collections.length > 0 ? (
              <OwlCarousel className="owl-theme" {...settings}>
                {collections.map((item) => (
                  <div key={item.id} style={{ padding: "0 10px" }}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={item.nftImage || nftImage}
                            className="lazy img-fluid"
                            alt={item.title}
                          />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={item.authorImage || AuthorImage}
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
              </OwlCarousel>
            ) : (
              <p>Loading collections...</p>
            )}
            main
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
 nicole_hotcollections
;
main
