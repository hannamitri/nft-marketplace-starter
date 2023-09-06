import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopSellers } from "../../api/topsellers";
import { Skeleton } from "@mui/material";


const TopSellersUI = () => {
    const [topSellers, setTopSellers] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchTopSellers() {
        const topSellers = await getTopSellers();
        setTopSellers(topSellers);
        setLoading(false); 
        console.log(topSellers);
      }
      fetchTopSellers();
    }, []);
  
    return (
      <ol className="author_list">
        {topSellers.map((topSeller) => (
          <li key={topSeller.id}>
            <div className="author_list_pp">
              {loading ? (
                <Skeleton variant="circular" width={50} height={50} />
              ) : (
                <Link to={{ pathname: `/author/${topSeller.authorId}` }}>
                  <img
                    className="lazy pp-author"
                    src={topSeller.authorImage}
                    alt=""
                  />
                  <i className="fa fa-check"></i>
                </Link>
              )}
            </div>
  
            <div className="author_list_info">

              <Link to={{ pathname: `/author/${topSeller.authorId}` }}>
                {loading ? <Skeleton /> : topSeller.authorName}
              </Link>
              {loading ? (
              <Skeleton /> 
                ) : (
              <span>{topSeller.price} ETH</span>
                )}
            </div>
          </li>
        ))}
      </ol>
    );
  };
  

export default TopSellersUI;