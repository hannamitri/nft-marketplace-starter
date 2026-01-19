import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(expiryDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft("Ended");
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

const NFTCard = ({ item, variant = "grid" }) => {
  if (variant === "slider") {
    return (
      <div className="nft_coll" style={{ position: "relative", paddingTop: "30px" }}>
        {item.expiryDate && (
          <div
            style={{
              position: "absolute",
              top: "5px",
              right: "10px",
              background: "#ffffff",
              color: "#000",
              padding: "4px 12px",
              borderRadius: "50px",
              fontSize: "12px",
              fontWeight: "600",
              zIndex: 5,
              whiteSpace: "nowrap",
              border: "1px solid #000"
            }}
          >
            <CountdownTimer expiryDate={item.expiryDate} />
          </div>
        )}
        <div className="nft_wrap" style={{ padding: "15px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Link to={item.nftId ? `/item-details/${item.nftId}` : "/item-details"} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={item.nftImage || nftImage} className="lazy img-fluid" alt="" style={{ maxWidth: "85%", maxHeight: "170px", height: "auto" }} />
          </Link>
        </div>
        <div className="nft_coll_pp">
          <Link to={item.authorId ? `/author/${item.authorId}` : "/author"}>
            <img className="lazy pp-coll" src={item.authorImage || AuthorImage} alt="" />
          </Link>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <Link to={item.nftId ? `/item-details/${item.nftId}` : "/item-details"}>
            <h4>{item.title || "Pinky Ocean"}</h4>
          </Link>
          <span>{item.code || "ERC-192"}</span>
          <div style={{ marginTop: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", paddingLeft: "10px" }}>
              {item.price || "3.08"} ETH
            </div>
            <div style={{ fontSize: "14px", color: "#ddd", paddingRight: "10px" }}>
              <i className="fa fa-heart"></i>
              <span style={{ marginLeft: "5px" }}>{item.likes || 69}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid variant (for Explore page)
  return (
    <div
      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={{ display: "block", backgroundSize: "cover" }}
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to={item.authorId ? `/author/${item.authorId}` : "/author"}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
          >
            <img className="lazy" src={item.authorImage || AuthorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}

        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button>Buy Now</button>
              <div className="nft__item_share">
                <h4>Share</h4>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-facebook fa-lg"></i>
                </a>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-twitter fa-lg"></i>
                </a>
                <a href="">
                  <i className="fa fa-envelope fa-lg"></i>
                </a>
              </div>
            </div>
          </div>
          <Link to={item.nftId ? `/item-details/${item.nftId}` : "/item-details"}>
            <img src={item.nftImage || nftImage} className="lazy nft__item_preview" alt="" />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to={item.nftId ? `/item-details/${item.nftId}` : "/item-details"}>
            <h4>{item.title || "Untitled"}</h4>
          </Link>
          <div className="nft__item_price">{item.price || "0"} ETH</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{item.likes || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
