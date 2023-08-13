import React from "react";
import { Link } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.carousel.css";

const HotCollections = () => {
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsiveClass: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 4,
      },
      1400: {
        items: 4,
      },
    },
  };

  const [loading, setLoading] = useState(true);
  const [usernames, setUsernames] = useState([]);

  async function responseCollections() {
    setLoading(false);

    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );

    setUsernames(data);
    setTimeout(() => {
      setLoading(true);
    }, 500)
  }

  useEffect(() => {
    responseCollections();
  }, []);

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
          <OwlCarousel
            className="owl-theme owl-style"
            items={4}
            lazyLoad
            merge
            {...options}
          >
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="skeleton nft__coll--skeleton ">
                      <div className="skeleton-box nft__img--skeleton"></div>
                      <div className="nfg_coll_user_container skeleton-box"></div>
                    </div>
                    <div className="skeleton nft__name-skeleton skeleton-box"></div>
                    <div className="skeleton nft__id--skeleton skeleton-box"></div>
                  </div>
                ))
              :usernames.map((user, index) => (
                  <div className="" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={user.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_user_container">
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img
                              className="lazy pp-coll"
                              src={user.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{user.title}</h4>
                          </Link>
                          <span>ERC-{user.code}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
