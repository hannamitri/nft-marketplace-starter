import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthorImage from '../../images/author_thumbnail.jpg';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ShimmerEffect from '../UI/ShimmerEffect';

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
        console.log("Fetched data:", response.data); // Debug fetched data
        setCollections(response.data);
        setIsLoading(false); // Stop loading on success
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false); // Stop loading on error
      }
    };
  
    fetchData();
  }, []);
  
  // Debugging state values
  console.log("isLoading:", isLoading, "Collections:", collections.length);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  };

  const renderShimmerPlaceholders = () => (
    <React.Fragment>
      {[...Array(4)].map((_, index) => (
        <div className="item" key={index}>
          <ShimmerEffect />
        </div>
      ))}
    </React.Fragment>
  );

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
          <OwlCarousel key={isLoading ? 'loading' : 'loaded'} className="owl-theme" {...options}>
            {isLoading ? 
              renderShimmerPlaceholders() :
              collections.map((collection, index) => (
                <div className="item" key={collection.id || index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img className="lazy pp-coll" src={collection.authorImage || AuthorImage} alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>{`ERC - ${collection.code}`}</span>
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
