import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const[loading, setLoading] = useState(true);
  const [collections, setCollections] = useState( [] );

  async function getCollections() {
    setLoading(true);
    const  { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`);
    setLoading(false);
    setCollections(data);
  }
  useEffect(() => {
    getCollections();
  }, []);

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
          <Splide options={{
            perPage: 4,
          }}>        
 {
  loading ?  
 new Array(6).fill(0).map((_, index) => 
(
     (
<Skeleton />
     ))):
    
      (collections.map(collection => (  
        <SplideSlide>
     <div className="col-lg-3 col-md-6 col-sm-6 
     col-xs-12" key={collection.id}>
        <div className="nft_coll" style={{width: "18.5rem"}}>
          <div className="nft_wrap">
            <Link to="/item-details">
              <img src={collection.nftImage} className="lazy img-fluid" alt="" />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to="/author">
              <img className="lazy pp-coll" src={collection.authorImage} alt="" />
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
          </SplideSlide>  
   ) ) 
    )}    </Splide>  
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
