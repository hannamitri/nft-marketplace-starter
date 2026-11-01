import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Aos from "aos";
import 'aos/dist/aos.css';

const TopSellers = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const showPlaceholders = loading || topSellers.length === 0;

  useEffect(() => {
    let active = true;
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((response) => response.json())
      .then((data) => {
        if (active) {
          setTopSellers(data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch top sellers:", error);
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  console.log(topSellers);

  function animateIndex (index) {
    if (index % 2 === 0) {
      return "fade-up";
    } else {
      return "fade-down";
    }
  }

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {showPlaceholders
                ? Array(12).fill(0).map((_, index) => (
                <li key={index} data-aos={animateIndex(index)}>
                  <div className="author_list_pp">
                    <div className="skeleton skeleton-avatar"></div>
                          <i className="fa fa-check"></i>
                  </div>
                  <div className="author_list_info">
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-subtitle"></div>
                  </div>
                </li>
              ))
                : topSellers.map((seller, index) => (
                <li key={index} data-aos={animateIndex(index)}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`} >
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
