import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../service/service";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const getHotCollections = async () => {
    try {
      const data = await Service.fetchHotCollections();
      setLoading(false);
      setHotCollections(data);
    } catch (error) {
      console.error("Error getting recipe categories", error);
    }
  };

  const settings = {
    loop: true,
    margin: 10,
    nav: true,
    items: 4,
    dots: false,
    responsive: {
      1200: { items: 4 },
      992: { items: 3 },
      768: { items: 2 },
      0: { items: 1 },
    },
  };
  useEffect(() => {
    getHotCollections();
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
          {!loading && hotCollections.length > 0 ? (
          <OwlCarousel className="owl-carousel" {...settings}>
            {hotCollections.map((hotCollection) => (
                <div className="nft_coll" key={hotCollection.id}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${hotCollection.nftId}`}>
                      <img
                        src={hotCollection.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${hotCollection.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={hotCollection.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to={`/explore`}>
                      <h4>{hotCollection.title}</h4>
                    </Link>
                    <span>ERC-{hotCollection.code}</span>
                  </div>
                </div>
       
            ))}
          </OwlCarousel>
          ) : (
            new Array(4).fill(0).map((_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
              >
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton width="100%" height="100%" />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton width={60} height={60} borderRadius={9999} />
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton width="40%" height={20} borderRadius={5} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
