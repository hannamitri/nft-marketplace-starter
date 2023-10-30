import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

function TopSeller({ topSellersData, loading }) {
  const [img, setImg] = useState();

  const mountedRef = useRef(true);

  useEffect(() => {
    if (!loading) {
      const image = new Image();
      image.src = topSellersData?.authorImage;
      image.onload = () => {
        setTimeout(() => {
          if (mountedRef.current) {
            setImg(image);
          }
        }, 300);
      };
      return () => {
        mountedRef.current = false;
      };
    }
  }, [topSellersData?.authorImage, loading]);

  return (
    <>
      {img && !loading ? (
        <div>
          <li>
            <div className="author_list_pp">
              <Link to={`/author/${topSellersData?.authorId}`}>
                <img className="lazy pp-author" src={img.src} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="author_list_info">
              <Link to={`/author/${topSellersData?.authorId}`}>
                {topSellersData?.authorName}
              </Link>
              <span>{topSellersData?.price} ETH</span>
            </div>
          </li>
        </div>
      ) : (
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
      )}
    </>
  );
}

export default TopSeller;
