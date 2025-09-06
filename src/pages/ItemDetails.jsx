import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SkeletonCard from "../components/UI/SkeletonCard";

const ItemDetails = () => {
  const { id } = useParams();
  const [nft, setNft] = useState(null);

  useEffect(() => {
    const fetchNft = async () => {
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );
        setNft(res.data);
        window.scrollTo(0, 0);
      } catch (err) {
        console.error("Error fetching NFT details:", err);
      }
    };
    fetchNft();
  }, [id]); // 👈 aquí estaba el error

  if (!nft) {
    return (
      <div className="container mt-5">
        <SkeletonCard />
      </div>
    );
  }

  return (
    <section className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img src={nft.nftImage} alt={nft.title} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h2>{nft.title}</h2>
          <div className="d-flex gap-3 my-3">
            <span><i className="fa fa-eye"></i> {nft.views}</span>
            <span><i className="fa fa-heart"></i> {nft.likes}</span>
          </div>
          <p>{nft.description}</p>

          <div className="mt-4">
            <h6>Owner</h6>
            <div className="d-flex align-items-center">
              <img
                src={nft.ownerImage}
                alt="owner"
                style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
              />
              <span>{nft.ownerName}</span>
            </div>
          </div>

          <div className="mt-4">
  <h6>Creator</h6>
  <div className="d-flex align-items-center">
    <img
      src={nft.creatorImage}
      alt="creator"
      style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
    />
    <span>{nft.creatorName}</span>
  </div>
</div>

          <div className="mt-4">
            <h6>Price</h6>
            <div className="d-flex align-items-center">
              <img
                src="/img/icons/eth.png"
                alt="eth"
                style={{ width: "20px", marginRight: "10px" }}
              />
              <span className="h5 mb-0">{nft.price} ETH</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetails;
