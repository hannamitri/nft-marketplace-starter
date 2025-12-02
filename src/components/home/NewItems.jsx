import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        console.log("Fetching new items...");
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        console.log("Response received:", response);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Data received:", data);
        setNewItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new items:", error);
        // Set some fallback data for testing
        setNewItems([
          {
            id: 1,
            title: "Test NFT 1",
            price: "1.5",
            likes: 25,
            authorId: "test-author",
            nftId: "test-nft-1",
            expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            nftImage: null,
            authorImage: null
          },
          {
            id: 2,
            title: "Test NFT 2",
            price: "2.3",
            likes: 42,
            authorId: "test-author-2",
            nftId: "test-nft-2",
            expiryDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
            nftImage: null,
            authorImage: null
          }
        ]);
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  // Update timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeLeft = (expiryDate) => {
    const expiry = new Date(expiryDate).getTime();
    const timeLeft = expiry - currentTime;

    if (timeLeft <= 0) {
      return "Expired";
    }

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (loading) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>New Items</h2>
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
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center animated fadeInDownRight">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className='owl-theme' loop margin={10} nav>
            {newItems.map((item) => (
              <div className='item' key={item.id}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${item.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={`Creator: ${item.authorId}`}
                    >
                      <img 
                        className="lazy" 
                        src={item.authorImage || AuthorImage} 
                        alt="Author" 
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="de_countdown">{formatTimeLeft(item.expiryDate)}</div>

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

                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage || nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title}
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
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

export default NewItems;
