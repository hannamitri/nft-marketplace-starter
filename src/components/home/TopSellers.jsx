import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  useEffect(() => {
      const fetchSellers = async () => {
        try {
          const res = await fetch(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
          );
          const data = await res.json();
          console.log("Top Sellers API Data:", data); // 👈 LOG HERE
      setSellers(data);
          setSellers(data);
        } catch (err) {
          console.error("Failed to fetch sellers", err);
        }
      };
      fetchSellers();
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
                {sellers.map((seller, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`} 
                      state={seller}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt={seller.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`} state={seller}>
                    {seller.authorName}

  </Link>
  <span>{seller.price} ETH</span>
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
