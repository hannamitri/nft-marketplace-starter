import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import OwlCarousel from "react-owl-carousel";
import AOS from "aos"; // Import AOS
import "owl.carousel/dist/owl.carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// ... (Keep your CountdownTimer component as it is) ...

const NewItems = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
      .then((response) => response.json())
      .then((data) => {        
        setCollections(data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching the API:', error);
        setLoading(false);
      });
  }, []); 

  // This is the trigger that makes the animation work!
  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [loading]);

  const newItemsOptions = {
    loop: true, 
    margin: 16, 
    nav: true, 
    dots: false, 
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsive: {
      0: { items: 1},
      576: { items: 2},
      768: { items: 3}, 
      1200: { items: 4}, 
    }
  };

  return (
    <section 
      id="section-items" 
      className="no-bottom"
      data-aos="fade-down" // Added animation here
      data-aos-easing="linear"
      data-aos-duration="1500"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft_item_skeleton">
                  <div className="skeleton-box" style={{ width: "100%", height: "250px" }}></div>
                </div>
              </div>
            ))
          ) : (
            <OwlCarousel className="owl-theme" {...newItemsOptions}>
              {collections.map((item) => (
                <div className="nft__item" key={item.id}>
                  {/* ... rest of your item JSX ... */}
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                     <Link to={`/item-details/${item.nftId}`}>
                      <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
                     </Link>
                  </div>
                  <div className="nft__item_info">
                    <h4>{item.title}</h4>
                    <div className="nft__item_price">{item.price} ETH</div>
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

export default NewItems;
