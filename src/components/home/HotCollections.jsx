import axios from "axios"
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HotCollection = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    async function fetchCollection() {
      const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
      setCollection(response.data);
      console.log(response.data)
    }
    fetchCollection()
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
          {collection.length && (
          <OwlCarousel className="owl-nav" autoWidth items="4" nav loop >
            
          {collection.map((_, id) => (

           
               <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" key={id}>
              <div className="nft_coll">
              <div className="item">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={_.nftImage || <Skeleton />}  className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={_.authorImage || <Skeleton />} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{_.title || <Skeleton />}</h4>
                  </Link>
                  <span>ERC-{_.code || <Skeleton />}</span>
                </div>
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


export default HotCollection;
