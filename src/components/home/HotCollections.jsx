import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useState, useEffect } from "react";

const HotCollections = () => {
  const [NFTs, setNFTs] = useState([]);

  async function fetchNFTs() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setNFTs(data);
  }

  console.log(NFTs);
  useEffect(() => {
    fetchNFTs();
  }, []);

  function renderNFTs() {
    return NFTs.map((NFT) => (
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={NFT.id}>
        <div className="nft_coll">
          <div className="nft_wrap">
            <Link to="/item-details">
              <img src={NFT.nftImage} className="lazy img-fluid" alt="" />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to="/author">
              <img className="lazy pp-coll" src={NFT.AuthorImage} alt="" />
            </Link>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/explore">
              <h4>{NFT.title}</h4>
            </Link>
            <span>ERC-{NFT.code}</span>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {renderNFTs()}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
