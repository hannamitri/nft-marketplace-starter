import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import authorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
 const { id } = useParams();
 const [hotCollections, setHotCollections] = useState([]);
 const [loading, setLoading] = useState(true)

 useEffect(() => {
  async function fetchHotCollections() {
      try {
          console.log("Fetching data...");
          const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`);
          console.log("Data fetched:", data);
          setHotCollections(data);
          setLoading(false);
      } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false); 
      }
  }
  
  fetchHotCollections();

 
  const timeout = setTimeout(() => {
      if (loading) {
          setLoading(false);
      }
  }, 5000);

  return () => clearTimeout(timeout);
}, [id, loading]);

const options = {
  loop: true,
  margin: 10,
  nav: true,
  items: 4,
  autoplay: true,
  autoplayTimeout: 4000,
  dots: false,
  responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 }
  }
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
                  <OwlCarousel className="owl-theme" {...options}>
                      {new Array(8).fill(0).map((_, index) => (
                          <div className="item" key={index}>
                              <div className="nft_coll">
                                  <div className="nft_wrap">
                                      <Link to="/item-details">
                                          <Skeleton width="100%" height="200px" />
                                      </Link>
                                  </div>
                                  <div className="nft_coll_pp">
                                      <Link to="#">
                                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                                      </Link>
                                      <i className="fa fa-check"></i>
                                  </div>
                                  <div className="nft_coll_info">
                                      <Link to="#">
                                          <Skeleton width="100px" height="20px" />
                                      </Link>
                                      <br />
                                      <Skeleton width="60px" height="20px" />
                                  </div>
                              </div>
                          </div>
                      ))}
                  </OwlCarousel>
              ) : (
                  <OwlCarousel className='owl-theme' {...options}>
                      {hotCollections.map((collection) => (
                          <div className="item" key={collection.id}>
                              <div className="nft_coll">
                                  <div className="nft_wrap">
                                      <Link to="/item-details">
                                          <img src={collection.nftImage || nftImage} className="lazy img-fluid" alt="" />
                                      </Link>
                                  </div>
                                  <div className="nft_coll_pp">
                                      <Link to="/author">
                                          <img className="lazy pp-coll" src={collection.authorImage || authorImage} alt="" />
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
