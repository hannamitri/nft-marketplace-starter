import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const HotCollections = () => {
const [collections, setCollections] = useState([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      
      try {
        const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
        
        if (!response.ok) {
          throw new Error("Failed to fetch collections");
        }
        
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          
        }
      }
    ]
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
            <div className="row">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={index}>
                  <div className="collection-skeleton">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-avatar"></div>
                    <div className="skeleton-title"></div>
                    <div className="skeleton-code"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Slider {...settings} className="collection-slide">
              {collections.map((collection) => (
                <div key={collection.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                    <Link to="/item-details">
                      <img src={collection.nftImage} className="lazy img-fluid" alt={collection.name} />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={collection.authorImage} alt={`${collection.title} creator`} />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{collection.title}</h4>
                  </Link>
                  <span>{collection.code}</span>
                </div>
              </div>
            </div>
          ))}
          </Slider>
        )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
