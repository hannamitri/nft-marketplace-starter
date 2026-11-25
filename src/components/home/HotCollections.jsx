import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import $ from "jquery"

window.$ = window.jQuery = $;
require("owl.carousel");

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
        setCollections(response.data);
      } catch(error) {
        console.error("Error fetching hot collections:", error);
        setError("Unable to load collections.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  useEffect(() => {
    if (loading || !collections.length || !carouselRef.current) return;
    
    const $carousel = $(carouselRef.current);
    
    $carousel.owlCarousel({
      loop: collections.length > 1,
      margin: 15,
      nav: true,
      dots: false,
      autoplay: false,
      smartSpeed: 600,
      responsive: {
        0: {
          items: 1
        },
        576: {
          items: 2
        },
        992: {
          items: 4
        }
      }
    });

    return() => {
      $carousel.trigger("destroy.owl.carousel");
    };
  }, [loading, collections]);

  return(
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading && new Array(4).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <Skeleton width="100%" height="200px" />

                <div className="nft_coll_pp">
                  <Skeleton width="55px" height="55px" borderRadius="50%" />
                </div>

                <div className="nft_coll_info">
                  <Skeleton width="120px" height="18px" />
                  <br />
                  <Skeleton width="70px" height="14px" />
                </div>
              </div>
            </div>
          ))}

          {error && (
            <div className="col-lg-12 text-center">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && collections.length > 0 && (
            <div className="col-lg-12">
              <div className="owl-carousel" ref={carouselRef}>
                {collections.map((collection) => (
                  <div className="item" key={collection.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img src={collection.nftImage} alt={collection.title} className="lazy img-fluid" />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img className="lazy pp-coll" src={collection.authorImage} alt={`${collection.title} creator`} />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HotCollections;