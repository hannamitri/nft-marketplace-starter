import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [owlOptions, setOwlOptions] = useState([]);

  async function fetchHotCollections() {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
    setHotCollections(data);
  }

  useEffect(() => {
      fetchHotCollections();
  }, []);

  useEffect(() => {
    const owlOptions = {
      items: 4,
      loop: true,
      nav: true,
      margin: 10,
      dots: false,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        992: { items: 3 },
        1200: { items: 4 },
      },
    };
    setOwlOptions(owlOptions);
  }, [hotCollections]);


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
          {
            hotCollections ? (
              <OwlCarousel className="owl-theme" {...owlOptions}>
                {hotCollections.map((_, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img src={hotCollections[index].nftImage} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img className="lazy pp-coll" src={hotCollections[index].authorImage} alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{hotCollections[index].title}</h4>
                      </Link>
                      <span>ERC-{hotCollections[index].code}</span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img className="skeleton-box" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="skeleton-box" alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4 className="skeleton-box"></h4>
                  </Link>
                  <span className="skeleton-box"></span>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
