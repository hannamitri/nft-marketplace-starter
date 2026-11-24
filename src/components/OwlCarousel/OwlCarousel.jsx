import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`);
        if (!response.ok) {
          throw new Error("Failed to fetch collections");
        }

        const data = await response.json();
        console.log(data);
        setCollections(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCollections();
  }, []);


  return (
    <>
  {collections.map((collection) => (
    <div className="nft_coll" key={collection.id}>
      <div className="nft_wrap">
        <Link to={`/item-details/${collection.id}`}>
            <img src={collection.nftImage} className="lazy img-fluid" alt="" />
        </Link>
        </div>
        <div className="nft_coll_pp">
        <Link to={`/author/${collection.authorId}`}>
            <img className="lazy pp-coll" src={collection.authorImage} alt="" />
        </Link>
        <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
        <Link to={`/explore/${collection.nftId}`}>
            <h4>{collection.title}</h4>
        </Link>
        <span>ERC-{collection.code}</span>
        </div>
    </div>
  ))}
    </>
  );
};

export default HotCollections;
