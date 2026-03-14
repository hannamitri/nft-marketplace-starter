import React, { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import { Link, useParams } from "react-router-dom";
import CountDown from "../CountDown";

const NftCard = ({ data, authorImage }) => {
  const { authId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    data && setLoading(false);
  }, [data]);

  return (
    <>
      {loading ? (
        <>
          {/* Loading State */}
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                className="image-wrapper"
              >
                <Skeleton width="50px" height="50px" borderRadius="50%" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="nft__item_wrap">
              <Link to="/item-details" className="image-wrapper">
                <Skeleton width="100%" height="100%" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <Skeleton width="180px" height="30px" />
              </Link>
              <Skeleton width="100px" height="20px" />
            </div>
            <div className="nft__item_like">
              <Skeleton width="30px" height="15px" />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Populate from prop data */}
          <div className="nft__item">
            <div className="author_list_pp">
              {/* Accommodate data from prop or useParams */}
              <Link
                to={`../author/${data.authorId || authId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Creator"
                className="image-wrapper"
              >
                {/* Accommodate varying data from API */}
                <img
                  src={data.authorImage || authorImage}
                  alt=""
                  className="lazy"
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {data.expiryDate && <CountDown expiryDate={data.expiryDate} />}
            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a
                      href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a
                      href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>

              <Link to={`../item-details/${data.nftId}`}>
                <img
                  src={data.nftImage}
                  alt=""
                  className="lazy nft__item_preview image-wrapper"
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`../item-details/${data.nftId}`}>
                <h4>{data.title}</h4>
              </Link>
              <div className="nft__item_price">{data.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{data.likes}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NftCard;
