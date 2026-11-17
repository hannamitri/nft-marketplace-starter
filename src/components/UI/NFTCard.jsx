import React from "react";
import { Link } from "react-router-dom";
import ExpiryTimer from "./ExpiryTimer";

const NFTCard = ({ item, isCollection = false }) => {
  if (!item) return null;

  const nftId = item.nftId || item.id;
  const authorId = item.authorId;
  const authorImage = item.authorImage || item.authorImg;
  const nftImage = item.nftImage || item.image || item.itemImage;
  const title = item.title || item.name || "Untitled NFT";
  const price = item.price !== undefined ? item.price : "0.00";
  const likes = item.likes || 0;

  return (
    <div 
      className="nft-card-fixed card bg-white shadow-sm border rounded-5 overflow-hidden position-relative"
      style={{ borderRadius: "30px", height: "500px", display: "flex", flexDirection: "column" }}
    >
      
      {/* 1. Image / Banner Container */}
      <div 
        className="position-relative bg-light overflow-hidden flex-shrink-0 rounded-4 m-2" 
        style={{ borderRadius: "30px", width: "calc(100% - 16px)", height: isCollection ? "360px" : "360px" }}
      >
        {/* Author Avatar Top-Left (New Items) */}
        {!isCollection && authorImage && (
          <Link 
            to={`/author/${authorId}`} 
            className="position-absolute" 
            style={{ top: "12px", left: "12px", zIndex: 10 }}
          >
            <div className="position-relative">
              <img
                src={authorImage}
                alt="Author"
                className="rounded-circle border border-2 border-white shadow-sm"
                style={{ width: "71px", height: "71px", objectFit: "cover" }}
              />
              <i
                className="fa fa-check position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center border border-2 border-white"
                style={{ width: "14px", height: "14px", fontSize: "7px" }}
              ></i>
            </div>
          </Link>
        )}

        {/* Expiry Timer (New Items) */}
        {!isCollection && item.expiryDate && (
          <div className="position-absolute" style={{ top: "12px", right: "12px", zIndex: 10 }}>
            <ExpiryTimer expiryDate={item.expiryDate} />
          </div>
        )}

        {/* Full-Bleed Artwork Banner */}
        <Link to={isCollection ? "/explore" : `/item-details/${nftId}`} className="d-block w-100 h-100">
          <img
            src={nftImage}
            alt={title}
            className="w-100 h-100 object-fit-cover"
          />
        </Link>
      </div>

      {/* 2. Hot Collections Overlapping Center Avatar */}
      {isCollection && (
        <div className="d-flex justify-content-center position-relative" style={{ marginTop: "-42px", zIndex: 10 }}>
          <Link to={`/author/${authorId}`} className="position-relative d-inline-block mx-auto">
            <img
              src={authorImage}
              alt="Author"
              className="rounded-circle border border-2 border-white shadow-sm bg-white"
              style={{ width: "77px", height: "77px", objectFit: "cover" }}
            />
            <i
              className="fa fa-check position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center border border-2 border-white"
              style={{ width: "16px", height: "16px", fontSize: "8px" }}
            ></i>
          </Link>
        </div>
      )}

      {/* 3. Card Body */}
      <div className={`card-body d-flex flex-column justify-content-between p-2 flex-grow-1 ${isCollection ? "text-center" : "text-start"}`}>
        <div>
          <Link
            to={isCollection ? "/explore" : `/item-details/${nftId}`}
            className="text-decoration-none text-dark"
          >
            <h5 className="card-title fw-bold fs-6 text-truncate mb-3 text-center">
              {title}
            </h5>
          </Link>

          {isCollection ? (
            <span className="text-muted small fw-semibold text-uppercase">
              ERC-{item.code || `${nftId || 192}`}
            </span>
          ) : (
            <div className="text-muted small"></div>
          )}
        </div>

        {/* Bottom row for price and likes */}
        {!isCollection && (
          <div className="d-flex justify-content-between mt-auto text-center">
            <span className="text-dark small fw-bold">
              {price} ETH
            </span>
            <span className="text-muted small d-flex align-items-center gap-1" style={{ color: "#6c757d" }}>
              <i className="fa fa-heart text-danger"></i>
              <span className="fw-semibold">{likes}</span>
            </span>
          </div>
        )}
      </div>

    </div>
  );
};

export default NFTCard;