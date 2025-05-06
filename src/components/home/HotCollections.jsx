import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import SkeletonCard from '../SkeletonCard';
import Carousel from '../Carousel';


const HotCollections = () => {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
      .then((res) => {
        if (mounted) {
        setCollections(res.data);
        setLoading(false)
        }
      })
      .catch((err) => {
        console.error('Error fetching data', err);
        setLoading(false);
        });

    return () => (mounted = false);
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <div className='col-lg-12'>
            <Carousel>
              {loading
                ? new Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
                : collections.map((item) => (
                  <div key={item.id} className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img 
                          src={item.nftImage} 
                          className="lazy img-fluid" 
                          alt={item.title} 
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img className="lazy pp-coll" src={item.authorImage} alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                ))}
              </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
