import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Click handler
  const handleSellerClick = (seller) => {
    console.log("Seller clicked:", seller);
  };

  useEffect(() => {
    async function fetchTopSellers() {
      try {
        const { data } = await axios.get(
             "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
          console.log(data[0]);
        setSellers(data);
      } catch (error) {
      
      } finally {
        setLoading(false);
      }
    }

    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Top Sellers</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? Array.from({ length: 12 }).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </div>
                      <div className="author_list_info">
                        <Skeleton width="100px" height="20px" />
                        <Skeleton width="40px" height="15px" />
                      </div>
                    </li>
                  ))
                : sellers.map((seller) => (
                    <li
                      key={seller.id}
                      onClick={() => handleSellerClick(seller)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt={seller.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>
                          {seller.authorName}
                        </Link>
                        <span>{seller.total.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;

                    
            
