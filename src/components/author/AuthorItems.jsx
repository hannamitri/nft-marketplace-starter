import React, { useEffect, useState } from "react";
import axios from "axios";
import NFTCard from "../NFTCard"; // Este path depende de tu estructura
import SkeletonCard from "../UI/SkeletonCard";

const AuthorItems = ({ authorId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorItems = async () => {
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setItems(res.data.nftCollection);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching author items:", err);
      }
    };

    fetchAuthorItems();
  }, [authorId]);

  if (loading) {
    return (
      <div className="row">
        {new Array(8).fill(0).map((_, i) => (
          <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={i}>
            <SkeletonCard />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      {items.map((nft) => (
        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={nft.id}>
          <NFTCard nft={nft} />
        </div>
      ))}
    </div>
  );
};

export default AuthorItems;
