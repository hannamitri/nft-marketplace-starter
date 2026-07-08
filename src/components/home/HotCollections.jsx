import OwlCarousel from "react-owl-carousel2";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";


const HotCollections = () => {
  const options = {
    items: 4,
    nav: true,
    dots: false,
    autoplay: false,
    loop: true,
    margin: 20,
    navText: [
      '<span class="custom-prev"></span>',
      '<span class="custom-next"></span>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1024: {
        items: 4,
      },
    },
  };
  const [collections, setCollections] = useState([]);

  async function fetchCollections() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`,
    );
    setCollections(data);
  }
  useEffect(() => {
    fetchCollections();
  }, []);

  const SkeletonCard = () => (
    <div className="nft_coll skeleton">
      <div className="nft_wrap">
        <div className="skeleton-img"></div>
      </div>

      <div className="nft_coll_pp">
        <div className="skeleton-avatar"></div>
      </div>

      <div className="nft_coll_info">
        <div className="skeleton-title"></div>
        <div className="skeleton-code"></div>
      </div>
    </div>
  );

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
          <div className="col-12">
            {collections.length === 0 ? (
              <div className="row">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="col">
                    <SkeletonCard />
                  </div>
                ))}
              </div>
            ) : (
              <OwlCarousel options={options}>
                {collections?.map((item) => (
                  <div key={item.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
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
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <span>ERC-{item.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
