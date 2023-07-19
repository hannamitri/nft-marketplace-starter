import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "../UI/CardSkeleton";

// HC

const HotCollections = () => {
  const [profile, setprofile] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setprofile(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [loading]);

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

          {profile.length > 0 && (
            <OwlCarousel
              className="owl-theme"
              items={4}
              loop
              margin={10}
              nav
              responsive={{
                0: { items: 1 },
                500: { items: 2 },
                768: { items: 3 },
                1000: { items: 4 },
              }}
            >
              {loading ? (
                <CardSkeleton />
              ) : (
                profile.slice(0, 6).map((user) => (
                  <div
                    key={user.id}
                  >
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
                        <span>ERC - {user.code}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
