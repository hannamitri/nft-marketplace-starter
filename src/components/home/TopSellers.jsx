
import React, { useState, useEffect } from "react"; // Fixed missing imports
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton"

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        if (response.data) {
          setTopSellers(response.data);
        } else {
          setTopSellers([]);
        }
      } catch (error) {
        console.error("Error fetching top sellers:", error);
      } finally {
        setLoading(false);  
        setLoading(true);  
      }
    };
    fetchTopSellers();
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
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key="index">
                          <Skeleton width={50} height={50} borderRadius="50%" />
                      <div className="author_list_info" >
                        <Skeleton width={100} height={20} />
                        <Skeleton width={50} height={15} />
                      </div>
                    </li>
                  ))
                : topSellers.map((seller, index) => (
                    <li key={seller.id || index}>
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
                        <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
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





