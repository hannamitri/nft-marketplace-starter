import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [nftCollections, setNftCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHotCollections() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
      );
        setIsLoading(false);
        setNftCollection(data);
    }
    fetchHotCollections();
  }, []);

  const carouselResponsiveness = {
    0: {
      items: 1,
      nav: true,
    },
    478: {
      items: 2,
      nav: true,
    },
    768: {
      items: 3,
      nav: true,
      loop: true,
    },
    1200: {
      items: 4,
      nav: true,
      loop: true,
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
          <div>
            {isLoading ? (
              <OwlCarousel
                loop={true}
                nav
                margin={10}
                items={4}
                autoplay={true}
                dots={false}
                responsive={carouselResponsiveness}
              >
                {new Array(6).fill(0).map((_, index) => (
                  <div className="" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <div className="carousel__image--skeleton"></div>
                      </div>
                      <div className="nft_coll_pp">
                        <div className="carousel__image--author"></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <span className="carousel__title--skeleton">
                          Loream
                        </span>
                        <br></br>
                        <span className="carousel__title--skeleton">
                          Loream
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              nftCollections.length > 1 && (
                <OwlCarousel
                  loop={true}
                  nav
                  margin={10}
                  items={4}
                  autoplay={true}
                  dots={false}
                  responsive={carouselResponsiveness}
                >
                  {nftCollections.map((collection) => (
                    <div className="" key={collection.id}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${collection.nftId}`}>
                            <img
                              src={collection.nftImage}
                              className="lazy img-fluid carousel__image"
                              alt=""
                              
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author${collection.authorId}`}>
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
                          <span>ERC-{collection.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
