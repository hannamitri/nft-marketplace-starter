import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

function HotCollection({ data, loading }) {
  const [img, setImg] = useState();

  const mountedRef = useRef(true);

  useEffect(() => {
    if (!loading) {
      const image = new Image();
      image.src = data?.nftImage;
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
  }, [data?.nftImage, loading]);

  return (
    <>
      {img && !loading ? (
        <div className="nft_coll">
          <div className="nft_wrap">
            <Link to={`/item-details/${data?.nftId}`}>
              <img src={img.src} className="lazy img-fluid" alt="" />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to={`/author/${data?.authorId}`}>
              <img className="lazy pp-coll" src={data.authorImage} alt="" />
            </Link>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/explore">
              <h4>{data?.title}</h4>
            </Link>
            <span>{`ERC-${data?.code}`}</span>
          </div>
        </div>
      ) : (
        <div className="nft_coll">
          <div className="nft_wrap">
            <Link to="/">
              <Skeleton
                width="100%"
                height="200px"
                borderRadius="8px"></Skeleton>
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to="/">
              <Skeleton
                width="50px"
                height="50px"
                borderRadius="50%"></Skeleton>
            </Link>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/">
              <Skeleton width="100px" height="20px"></Skeleton>
            </Link>
            <br />
            <Skeleton width="60px" height="20px"></Skeleton>
          </div>
        </div>
      )}
    </>
  );
}

export default HotCollection;
