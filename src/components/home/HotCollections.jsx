import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { getHotCollections } from "../../api/collections";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollectionSkeletonCard = () => {
  return (
    <div className="nft_coll hc-skel-card">
      <div className="nft_wrap">
        <div className="hc-skel hc-skel-img" />
      </div>

      <div className="nft_coll_pp">
        <div className="hc-skel hc-skel-avatar" />
        <i className="fa fa-check"></i>
      </div>

      <div className="nft_coll_info">
        <div className="hc-skel hc-skel-title" />
        <div className="hc-skel hc-skel-sub" />
      </div>
    </div>
  );
};

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCollections() {
      try {
        const data = await getHotCollections();
        await new Promise((r) => setTimeout(r, 1500));
        setCollections(data);
      } catch (err) {
        console.error("Failed to load hot collections", err);
      } finally {
        setLoading(false);
      }
    }

    loadCollections();
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

          <div className="col-lg-12">
            <OwlCarousel
              key={loading ? "loading" : `loaded-${collections.length}`}
              className="owl-theme"
              loop={!loading}
              nav
              dots={false}
              margin={20}
              slideBy={1}
              responsive={{
                0: { items: 1 },
                576: { items: 2 },
                992: { items: 4 },
              }}
            >
              {loading
                ? new Array(6).fill(0).map((_, i) => (
                    <div key={`skel-${i}`}>
                      <HotCollectionSkeletonCard />
                    </div>
                  ))
                : collections.slice(0, 6).map((item, index) => (
                    <div key={item.nftId ?? index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage || nftImage}
                              className="lazy img-fluid"
                              alt={item.title || "NFT"}
                            />
                          </Link>
                        </div>

                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img
                              className="lazy pp-coll"
                              src={item.authorImage || AuthorImage}
                              alt={item.title || "Author"}
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
