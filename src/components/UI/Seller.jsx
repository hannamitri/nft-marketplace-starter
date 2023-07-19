import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton.jsx";

function Seller({ seller }) {
  const [img, setImg] = useState();

  const mountedRef = useRef(true);

  useEffect(() => {
    const image = new Image();
    image.src = seller.authorImage;
    image.onload = () => {
      if (mountedRef.current) {
        setImg(image);
      }
    };
    return () => {
      mountedRef.current = false;
    };
  }, [seller.authorImage]);

  return (
    <li>
      {!img ? (
        <>
          <div className="author_list_pp">
            <Skeleton width={50} height={50} borderRadius={100} />
          </div>
          <div className="author_list_info">
            <div
              style={{
                height: "21px",
                display: "block",
              }}
            >
              <Skeleton height={21} width={87} />
            </div>
            <Skeleton height={16.797} width={50} />
          </div>
        </>
      ) : (
        <>
          <div className="author_list_pp">
            <Link to={`/author/${seller.id}`}>
              <img className="lazy pp-author" src={seller.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          <div className="author_list_info">
            <Link to={`/author/${seller.id}`}>{seller.authorName}</Link>
            <span>{seller.price} ETH</span>
          </div>
        </>
      )}
    </li>
  );
}

export default Seller;
