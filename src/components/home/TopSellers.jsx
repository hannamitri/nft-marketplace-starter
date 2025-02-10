import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);


  async function getSellers() {
    try {
        const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
        setSellers(data);
        setLoading(false); 
    } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false); 
    }
  }

    useEffect(() => {
      getSellers();
    }, []);

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

              // adding multiple loading states using Array - this will multiple it 12 times
              (
                [...Array(12)].map((_, index) => (
                  <>
                  <li className="loading-skeleton">
                  <div className="skeleton-author">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-info">
                      <div className="skeleton-name"></div>
                      <div className="skeleton-price"></div>
                    </div>
                  </div>
                </li>
                </>
                )
                )
              

              ) : (
  
  sellers.map((seller, index) => (
  <li key={index} >
    <div className="author_list_pp">
      <Link to={`/author/${seller.authorId}`}>
        <img
          className="lazy pp-author"
          src={seller.authorImage}
          alt=""
        />
        <i className="fa fa-check"></i>
      </Link>
    </div>
    <div className="author_list_info">
      <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
      <span>{seller.price}</span>
    </div>
  </li>
)))
              }

            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};


export default TopSellers;
