import React from "react";
import { Link } from "react-router-dom";
import { SkeletonHC } from "./SkeletonCard";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HotCollections = () => {
  const [hotCollections, setHotCollections] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getHotCollections();
  }, [])

  async function getHotCollections() {
    try {
      setLoading(true); 
      const res = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
      setHotCollections(res.data);
      setLoading(false);
    } catch(err) {
      console.error(err);
    }
  }

  const options = {
    loop: true,
    margin: 0,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      700: {
        items: 2,
      },
      990: {
        items: 3,
      },
      1300: {
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
              {/* Loading State */}
              {loading && (
                <OwlCarousel {...options}>
                  {[0, 1, 2, 3, 4].map((_, index) => (
                       <SkeletonHC key={`skeleton-${index}`} />
                  ))}
                </OwlCarousel>
              )}

              {/* Actual Carousel */}
              {!loading && hotCollections.length > 0 && (
                <OwlCarousel {...options}>
                  {(hotCollections).map((collection, idx) => (
                    <div id="container" className="item-container col-lg-3 col-md-6 col-sm-6 col-xs-12" key={`collection-${collection.id}-${idx}`}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${collection.nftId}`}>
                            <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${collection.authorId}`}>
                            <img className="lazy pp-coll" src={collection.authorImage} alt="" />
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
            )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
