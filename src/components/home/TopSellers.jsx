import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setSellers] = useState([])

  async function fetchSellers(){
    const {data} =await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`)
    setSellers(data)
  }

  useEffect(()=>{
    fetchSellers()
  },[])
  console.log(sellers)
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
            {
              sellers.map((seller, index)=>(
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{seller.authorName}</Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
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
