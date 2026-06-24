import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/owl.carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
      .then((response) =>  {
        if (!response.ok) {
          throw new Error('Network response processed an error. Please try again later');
        }
        return response.json();
      })
      .then((data) => {        
        setCollections(data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching the API:', error);
        setLoading(false);
      });
  }, []); 

  const options = {
    loop: true, 
    margin: 10, 
    nav: true,
    dots: false, 
    smartSpeed: 500, 
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      768: { items: 3 },
      1024: { items: 4 },
    },
  };
  
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            
            {loading ? (
              <div className="row">
                {new Array(4).fill(0).map((_, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                    <div className="nft_coll" style={{ background: "#fff", border: "1px solid #eee", padding: "15px", borderRadius: "8px" }}>
                      <div className="skeleton-box" style={{ width: "100%", height: "200px", borderRadius: "8px" }}></div>
                      <div className="skeleton-box" style={{ width: "50px", height: "50px", borderRadius: "50%", margin: "-25px auto 0 auto", border: "2px solid #fff" }}></div>
                      <div style={{ padding: "15px 0 0 0", textAlign: "center" }}>
                        <div className="skeleton-box" style={{ width: "70%", height: "18px", margin: "0 auto 10px auto", borderRadius: "4px" }}></div>
                        <div className="skeleton-box" style={{ width: "40%", height: "14px", margin: "0 auto", borderRadius: "4px" }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              collections.length > 0 && (
                <OwlCarousel key={collections.length} className="owl-theme" {...options}>
                  {collections.map((item) => (
                    <div key={item.id} className="nft-slider-item">
                      <div className="nft_coll" style={{ margin: "0 10px" }}>
                        <div className="nft_wrap">
                          <Link to={`/item-details/${item.nftId}`}>
                            <img src={item.nftImage} className="img-fluid" alt={item.title} />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img className="pp-coll" src={item.authorImage} alt="" />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <span>ERC-{item.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              )
            )}
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;