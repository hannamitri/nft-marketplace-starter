import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

function HotCollection({ data }) {
  const [loading, setLoading] = useState(true);

  const mountedRef = useRef(true);

  useEffect(() => {
    const img = new Image();
    img.src = data.nftImage;
    img.onload = () => {
      setTimeout(() => {
        if (mountedRef.current) {
          setLoading(false);
        }
      }, 300);
    };
    return () => {
      mountedRef.current = false;
    };
  }, [data.nftImage]);

  return (
    <>
      {loading ? (
        <div className="nft_coll">
          <div className="nft_wrap">
            <Link to="/">
              <Skeleton width="100%" height="200px" borderRadius="8px">
                <img src={data?.nftImage} className="lazy img-fluid" alt="" />
              </Skeleton>
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to="/">
              <Skeleton width="50px" height="50px" borderRadius="50%">
                <img className="lazy pp-coll" src={data?.authorImage} alt="" />
              </Skeleton>
            </Link>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/">
              <Skeleton width="100px" height="20px">
                <h4>{data?.title}</h4>
              </Skeleton>
            </Link>
            <br />
            <Skeleton width="60px" height="20px"></Skeleton>
          </div>
        </div>
      ) : (
        <div className="nft_coll">
          <div className="nft_wrap">
            <Link to="/item-details">
              <img src={data.nftImage} className="lazy img-fluid" alt="" />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to="/author">
              <img className="lazy pp-coll" src={data.authorImage} alt="" />
            </Link>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/explore">
              <h4>{data.title}</h4>
            </Link>
            <span>{`ERC-${data.code}`}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default HotCollection;
