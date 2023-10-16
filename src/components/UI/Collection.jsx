import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton.jsx";

function Collection({ collection }) {
  const [img, setImg] = useState();

  const mountedRef = useRef(true);

  useEffect(() => {
    const image = new Image();
    image.src = collection.nftImage;
    image.onload = () => {
      if (mountedRef.current) {
        setImg(image);
      }
    };
    return () => {
      mountedRef.current = false;
    };
  }, [collection.nftImage]);

  return (
    <>
      {!img ? (
        <div className="nft_col--skeleton">
          <Skeleton width={313} height={176.312} />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px"
            }}
            className="nft_col-pfp--skeleton"
          >
            <Skeleton width={60} height={60} borderRadius={100} />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "2px"
            }}
          >
            <Skeleton width={70} height={19.188} />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Skeleton width={55} height={18} />
          </div>
        </div>
      ) : (
        <div>
          <div className="nft_coll">
            <div className="nft_wrap">
              <Link to={`/item-details/${collection.nftId}`}>
                <img
                  src={collection.nftImage}
                  className="lazy img-fluid"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to={`/author/${collection.authorId}`}>
                <img
                  className="lazy pp-coll"
                  src={collection.authorImage}
                  alt=""
                />
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to="/explore">
                <h4>{collection.title}</h4>
              </Link>
              <span>ERC-{collection.code}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Collection;
