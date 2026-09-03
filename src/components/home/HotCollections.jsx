import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const options = useMemo(
    () => ({
      loop: true,
      margin: 10,
      nav: true,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        900: { items: 3 },
        1200: { items: 4 },
      },
    }),
    [],
  );

  const visibleCollections = hotCollections.slice(0, 6);
  const carouselKey = visibleCollections
    .map((collection) => collection.id)
    .join("-");

  useEffect(() => {
    let isMounted = true;

    async function fetchCollections() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );

        if (isMounted) {
          setHotCollections(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (isMounted) {
          setHotCollections([]);
        }
      }
    }

    fetchCollections();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-up">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {hotCollections.length ? (
            <OwlCarousel key={carouselKey} className="owl-theme" {...options}>
              {visibleCollections.map((collection) => (
                <div className="item" key={collection.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <>
              <OwlCarousel key={carouselKey} className="owl-theme" {...options}>
                {visibleCollections.map((collection) => (
                  <div className="item" key={collection.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <Skeleton width="100%" height="200px" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <Skeleton width="100px" height="20px" />
                        </Link>
                        <br />
                        <Skeleton width="60px" height="20px" />
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
