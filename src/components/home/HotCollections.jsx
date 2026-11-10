import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../../css/styles/style.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer;

    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );

        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        // Keep skeleton visible for at least 1.5 seconds
        timer = setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };

    fetchCollections();

    // Cleanup function
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const options = {
    loop: true,
    margin: 8,
    nav: true,
    dots: false,
    items: 4,
    slideBy: 1,

    navText: ["‹", "›"],

    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      992: {
        items: 4,
      },
    },
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
            <OwlCarousel
              className="owl-theme"
              {...options}
              key={loading ? "loading" : "loaded"}
            >
              {loading
                ? [1, 2, 3, 4].map((item) => (
                    <div className="item" key={item}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton
                            width="100%"
                            height="200px"
                            borderRadius="8px"
                          />
                        </div>

                        <div className="nft_coll_pp">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </div>

                        <div className="nft_coll_info">
                          <Skeleton
                            width="70%"
                            height="20px"
                            borderRadius="5px"
                          />
                          <Skeleton
                            width="40%"
                            height="15px"
                            borderRadius="5px"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                : collections.map((collection) => (
                    <div className="item" key={collection.id}>
                      <div className="w-100">
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <Link
                              to="/item-details"
                              state={{ item: collection }}
                            >
                              <img
                                src={collection.nftImage}
                                className="lazy img-fluid"
                                alt={collection.title}
                              />
                            </Link>
                          </div>

                          <div className="nft_coll_pp">
                            <Link
                              to="/author"
                              state={{
                                author: {
                                  authorId: collection.authorId,
                                  authorImage: collection.authorImage,
                                  authorName:
                                    collection.authorName || "Unknown author",
                                },
                              }}
                            >
                              <img
                                className="lazy pp-coll"
                                src={collection.authorImage}
                                alt="Collection author"
                              />
                            </Link>

                            <i className="fa fa-check"></i>
                          </div>

                          <div className="nft_coll_info">
                            <Link
                              to="/item-details"
                              state={{ item: collection }}
                            >
                              <h4>{collection.title || "Untitled NFT"}</h4>
                            </Link>

                            <span>ERC-{collection.code}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
