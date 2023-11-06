import React, { useEffect, useState } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getHotCollections() {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
        setCollections(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    if (collections.length === 0 || loading) {
      getHotCollections();
    }
  }, [collections, loading]);

  const carouselOptions = {
    items: 4,
    loop: true,
    dots: false,
    nav: true,
    margin: 8,
    responsive: {
      0: {
        items: 1,
      },
      900: {
        items: 2, 
      },
      1200: {
        items: 3, 
      },
      1500: {
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
            {!loading ? (
              <OwlCarousel className="owl-theme" {...carouselOptions}ç>
                {Array(4).fill().map((_, id) => 
                <div key={id} className="nft_coll">
                <div className="nft__wrap--skeleton">
                <div className="author__img--skeleton">
                  <i className="fa fa-check skeleton__check"></i>
                </div>
                </div>
                <div className="nft__text--skeleton">
                  <span className="collection__name--skeleton"></span>
                  <span className="collection__code--skeleton"></span>
                </div>
              </div>
                )}
              </OwlCarousel>
            ) : (
              <OwlCarousel className="owl-theme" {...carouselOptions}>
                {collections.map((collection, id) => (
                  <div key={id} className="nft_coll">
                    <div className="nft_wrap">
                      <a href="/item-details">
                        <img src={collection.nftImage} className="lazy img-fluid" alt={collection.title} />
                      </a>
                    </div>
                    <div className="nft_coll_pp">
                      <a href="/author">
                        <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                      </a>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <a href="/explore">
                        <h4>{collection.title}</h4>
                      </a>
                      <span>ERC-{collection.code}</span>
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
