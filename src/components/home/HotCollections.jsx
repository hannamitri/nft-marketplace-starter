import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from 'axios';

const HotCollections = () => { 
  const [hotCollections, setHotCollections] = useState([]);
    async function fetchHotCollectionsData() {
      const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
      setHotCollections(data.slice(0,6));
    }
    useEffect(() => {
      fetchHotCollectionsData();
    }, [])
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
          {hotCollections.map((collection) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={collection.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${collection.nftId}`}>
                    <img src={collection.nftImage} className="lazy img-fluid" alt="collection.title" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={`/author/${collection.authorId}`}>
                    <img className="lazy pp-coll" src={collection.authorImage} alt={`Author ${collection.authorId}`} />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to={`/explore/${collection.id}`}>
                    <h4>{collection.title}</h4>
                  </Link>
                  <span>ERC-{collection.code}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
