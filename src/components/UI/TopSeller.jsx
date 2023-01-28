import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

function TopSeller({ topSellersData }) {
  const [loading, setLoading] = useState(true);

  const mountedRef = useRef(true);

  useEffect(() => {
    const img = new Image();
    img.src = topSellersData.authorImage;
    img.onload = () => {
      setTimeout(() => {
        if (mountedRef) {
          setLoading(false);
        }
      }, 1000);
    };
    return () => {
      mountedRef.current = false;
    };
  }, [topSellersData.authorImage]);

  return (
    <>
      {loading ? (
        <div>
          <li>
            <div className="author_list_pp">
              <Link to="/author">
                <Skeleton width="50px" height="50px" borderRadius="50%" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="author_list_info">
              <Link to="/author">
                <Skeleton width="100px" height="20px" />
              </Link>
              <span>
                <Skeleton width="40px" height="20px" />
              </span>
            </div>
          </li>
        </div>
      ) : (
        <div>
          <li>
            <div className="author_list_pp">
              <Link to="/author">
                <img
                  className="lazy pp-author"
                  src={topSellersData?.authorImage}
                  alt=""
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="author_list_info">
              <Link to="/author">{topSellersData?.authorName}</Link>
              <span>{topSellersData?.price} ETH</span>
            </div>
          </li>
        </div>
      )}
    </>
  );
}

export default TopSeller;
