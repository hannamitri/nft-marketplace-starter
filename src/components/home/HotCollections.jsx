import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [owlOptions, setOwlOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchHotCollections() {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
    setHotCollections(data);
  }

  useEffect(() => {
      fetchHotCollections();
      setIsLoading(false);
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
          <OwlCarousel className="owl-theme" {...owlOptions}>
            { isLoading ? (
                new Array(6).fill(0).map((_, index) => (
                  <div className="display: flex" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img className="skeleton-box" Style={'width:100%; height: 200px'} alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <div className="skeleton-box" Style={'width:50px; height: 50px; border-radius: 50%'}></div>
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4 className="skeleton-box" Style={'width:100px; height: 20px'}></h4>
                        </Link>
                        <span className="skeleton-box" Style={'width:60px; height: 20px; display: block; margin: auto'}></span>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              hotCollections.map((_, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to="/item-details/">
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
              ))
            )
          }
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
