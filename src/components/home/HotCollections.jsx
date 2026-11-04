import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HotCollections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
      .then((response) => {
        setData(response.data); 
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
      <OwlCarousel className='owl theme' loop margin={10} nav>
          {data.map((item) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img src={item.nftImage} className="lazy img-fluid" alt="" />
                    </Link>
                  </div>
                    <Link to="/author">
                      <img className="lazy pp-coll" src={item.authorImage} alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                    <Link to="/explore">
                      <h4>{item.title}</h4>
                    </Link>
                    <span>ERC-{item.code}</span>
              </div>
            ))}
        </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
