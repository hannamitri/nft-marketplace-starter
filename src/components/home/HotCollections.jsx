import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HotCollections = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function main() {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    main();
  }, []);

  const owlCarouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
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
          {loading ? (
            <div className="col-lg-12">
              <OwlCarousel className="owl-theme" {...owlCarouselOptions}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="item" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton height={200} className="img-fluid" />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton circle height={40} width={40} />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Skeleton width={80} />
                        <Skeleton width={50} />
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          ) : (
            <OwlCarousel className="owl-theme" {...owlCarouselOptions}>
              {users.map((user, index) => (
                <div className="item" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                    <Link to={`/item-details/${user.nftId}`}>
                        <img
                          src={user.nftImage}
                          className="lazy img-fluid"
                          alt={user.name}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                    <Link to={`/author/${user.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={user.authorImage}
                          alt={user.name}
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
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
