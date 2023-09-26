import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchNFTs() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setNFTs(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchNFTs();
  }, []);

  function renderNFTs() {
    return loading
      ? new Array(12).fill(0).map((_, index) => (
          <li>
            <div className="author_list_pp">
              <a href="/">
                <div
                  className="skeleton-box"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                ></div>
                <i className="fa fa-check"></i>
              </a>
            </div>
            <div className="author_list_info">
              <a href="/">
                <div
                  className="skeleton-box"
                  style={{ width: "100px", height: "20px" }}
                ></div>
              </a>
              <span>
                <div
                  className="skeleton-box"
                  style={{ width: "40px", height: "20px" }}
                ></div>
              </span>
            </div>
          </li>
        ))
      : NFTs.map((NFT, index) => (
          <li key={index}>
            <div className="author_list_pp">
              <Link to={`author/${NFT.authorId}`}>
                <img className="lazy pp-author" src={NFT.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="author_list_info">
              <Link to={`author/${NFT.authorId}`}>{NFT.authorName}</Link>
              <span>{NFT.price} ETH</span>
            </div>
          </li>
        ));
  }

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">{renderNFTs()}</ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
