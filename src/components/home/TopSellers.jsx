import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      getData();
    }, []);
  

   const getData = async () => {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      console.log(data);
      setCollections(data);
     
    setTimeout(() => {
      setLoading(false);
    }, 1000); 

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section id="section-popular" className="pb-5" >
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
             {loading
              ? new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp skeleton-box"></div>
                    <div className="author_list_info">
                      <span className="skeleton-text"></span>
                      <span className="skeleton-text"></span>
                    </div>
                  </li>
                ))
              : collections.map((seller) => (
                  <li key={seller.id}>
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
