import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from 'axios'
import { useState, useEffect } from 'react'
import Seller from "../UI/Seller";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {

  const [sellers, setSellers] = useState([])

  const getSellers = () => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then(response => setSellers(response.data))
  }
  
  useEffect(() => {
    getSellers()
  }, [])

  const loading = sellers.length === 0

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading ? 
              new Array(12).fill(0).map((__dirname, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Skeleton 
                      width="50px"
                      height="50px"
                      borderRadius="50%"
                    />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="author_list_info"
                      style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Skeleton
                      width="100px"
                      height="20px"
                    />
                    <Skeleton
                      width="40px"
                      height="20px"
                    />
                  </div>
                </li>
              ))
              : sellers.map((seller, index) => (
                  <Seller 
                    key={seller.id}
                    index={index} 
                    authorName={seller.authorName}
                    authorImage={seller.authorImage}
                    authorId={seller.authorId}
                    price={seller.price}
                  />
                ))
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
