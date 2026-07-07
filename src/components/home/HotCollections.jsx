import React from "react";
import { Link } from "react-router-dom";
import useHotCollections from "../../hooks/useHotCollections";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const options = {
  loop: true,
  margin: 10,
  nav: true,
  responsive: {
    0: { items: 1 },
    600: { items: 2 },
    900: { items: 3 },
    1200: { items: 4 },
  },
};

const SkeletonCard = () => (
  <div className="nft_coll">
    <div className="nft_wrap">
      <div className="skeleton" style={{ width: "100%", height: "200px", borderRadius: "8px" }}></div>
    </div>
    <div className="nft_coll_pp">
      <div className="skeleton" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
    </div>
    <div className="nft_coll_info">
      <div className="skeleton" style={{ width: "80%", height: "20px", marginBottom: "8px" }}></div>
      <div className="skeleton" style={{ width: "40%", height: "16px" }}></div>
    </div>
  </div>
);

const HotCollections = () => {
  const { data: collections, loading } = useHotCollections();

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>
          <div className="col-lg-12">
            {loading ? (
              <div style={{ display: "flex", gap: "10px" }}>
                {new Array(4).fill(0).map((_, i) => (
                  <div key={i} style={{ flex: "0 0 25%" }}>
                    <SkeletonCard />
                  </div>
                ))}
              </div>
            ) : (
              <OwlCarousel className="owl-theme" {...options}>
                {collections.map((item) => (
                  <div className="nft_coll" key={item.id}>
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt={item.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt={item.title}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
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