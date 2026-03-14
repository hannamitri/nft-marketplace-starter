import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setHotCollections(data);
      } catch (error) {
        // Fallback data for when API is unavailable
        setHotCollections([
          {
            id: 1,
            name: "Pinky Ocean",
            code: "ERC-721",
            authorId: "0x1234...5678",
            nftImage: null,
            authorImage: null
          },
          {
            id: 2,
            name: "Deep Sea Collection",
            code: "ERC-721",
            authorId: "0x2345...6789",
            nftImage: null,
            authorImage: null
          },
          {
            id: 3,
            name: "Cosmic Dreams",
            code: "ERC-721",
            authorId: "0x3456...7890",
            nftImage: null,
            authorImage: null
          },
          {
            id: 4,
            name: "Digital Artifacts",
            code: "ERC-721",
            authorId: "0x4567...8901",
            nftImage: null,
            authorImage: null
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotCollections();
  }, []);

  if (loading) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
                <p>Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            className='owl-theme' 
            loop 
            margin={10} 
            nav 
            responsive={{
              0: {
                items: 1
              },
              600: {
                items: 2
              },
              1000: {
                items: 4
              }
            }}
          >
            {hotCollections.map((collection) => (
              <div className='item' key={collection.id}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img 
                        src={collection.nftImage || nftImage} 
                        className="lazy img-fluid" 
                        alt={collection.name} 
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${collection.authorId}`}>
                      <img 
                        className="lazy pp-coll" 
                        src={collection.authorImage || AuthorImage} 
                        alt="Author" 
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{collection.name}</h4>
                    </Link>
                    <span>{collection.code}</span>
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
