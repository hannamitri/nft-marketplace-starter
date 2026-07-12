import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Slider from "react-slick";
import 'aos/dist/aos.css'; // You can also use <link> for styles


// Import the CountdownTimer component
import CountdownTimer from "../CountdownTimer"; // Adjust the path if necessary

// Don't forget to import the CSS for react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const NewItems = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
       setData({ data });
       setIsLoading(false);
    }, 2000);
 }, []);

  const [collections, setCollections] = useState([]);

  async function getData() {
    try {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`);
      // Important: Assuming the API provides an 'expiryDate' for each item.
      // If not, you'll need to add a placeholder or generate one for demonstration.
      // Example of adding a placeholder expiry date if your API doesn't provide it:
      const collectionsWithExpiry = data.map(item => ({
        ...item,
        // Example: Add 24 hours to the current time for demonstration
        // In a real application, this would come from your API
        expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).getTime() // Example: 24 hours from now
      }));
      setCollections(collectionsWithExpiry); // Use the data with expiry dates
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Set loading to false after fetch completes
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const sliderRef = useRef(null);

  // Custom Next Arrow Component
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }} // Added borderRadius and padding for circular look, zIndex for visibility
        onClick={onClick}
      />
    );
  }

  // Custom Prev Arrow Component
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }} // Added borderRadius and padding for circular look, zIndex for visibility
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />, // Pass the component directly
    prevArrow: <SamplePrevArrow />, // Pass the component directly
    responsive: [
      {
        breakpoint: 1200, // lg
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 992, // md
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 768, // sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div data-aos="fade-in" data-aos-duration="300" className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center">Loading new items...</div>
          ) : (
            <Slider ref={sliderRef} {...settings} key={collections.length}>
              {collections.map((collection, index) => (
                <div data-aos="fade-in" data-aos-duration="300" className="sslick-arrow px-1" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${collection.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${collection.authorName || 'Unknown Author'}`}
                      >
                        <img className="lazy" src={collection.authorImage} alt={`Author: ${collection.authorName || 'Unknown'}`} />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    {/* Integrate the CountdownTimer component here */}
                    {/* Make sure collection.expiryDate exists and is a valid timestamp/date string */}
                    {collection.expiryDate && (
                      <CountdownTimer expiryDate={new Date(collection.expiryDate).getTime()} />
                    )}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img
                            src={collection.nftImage}
                            className="lazy nft__item_preview"
                            alt={collection.title || 'NFT Image'}
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${collection.id || index}`}>
                          <h4>{collection.title}</h4>
                        </Link>
                        <div className="nft__item_price">{collection.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{collection.likes}</span>
                      </div>
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

export default NewItems;
