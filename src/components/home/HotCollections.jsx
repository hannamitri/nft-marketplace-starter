import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useState, useEffect, useMemo } from 'react';
import { getHotCollections } from "../../api/hotCollections";
import OwlCarousel from 'react-owl-carousel';
import HotSkeleton from "../UI/HotSkeleton";

function HotCollections() {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const options = useMemo(() => ({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 2 },
      992: { items: 4 }
    }
  }), []);

  

  useEffect(() => {
    const fetchCollections = async () => {
      console.log('Fetching started');
      try {
        const data = await getHotCollections();
        console.log('Data received:', data);
        setCollections(data);
      } catch (error) {
        console.error('Fetch error:', error); // Add error logging
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };
  
    fetchCollections();
  }, []);
  
  // Add log before render
  console.log('Current state:', { loading, collections });
  

 
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
            {!loading && collections.length > 0 && (
              <OwlCarousel className='owl-theme' {...options}>
                {collections.map((collection) => (
                  <div className="lg-3 md-6 sm-6 xs-12" key={collection.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.id}`}>
                          <img src={collection.nftImage || nftImage} className="lazy img-fluid" alt={collection.name} />
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
                        <span>EFC - {collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
            {loading && (
              <div className="d-flex flex-wrap">
                {Array(4).fill(0).map((_, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={`skeleton-${index}`}>
                    <HotSkeleton />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    </section>
  );
};

export default HotCollections;
