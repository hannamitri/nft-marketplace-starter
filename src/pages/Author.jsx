import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Author = () => {
  const { authorId } = useParams();
  const [authorNFTs, setAuthorNFTs] = useState([]);
  const [authorInfo, setAuthorInfo] = useState(null);

  useEffect(() => {
    const fetchAuthorNFTs = async () => {
      try {
        const res = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
        const data = await res.json();

        // Filter NFTs by authorId
        const filteredNFTs = data.filter(
          (item) => String(item.authorId) === String(authorId)
        );
        setAuthorNFTs(filteredNFTs);

        // Use the first NFT to extract author profile info
        if (filteredNFTs.length > 0) {
          const { authorImage, authorName } = filteredNFTs[0];
          setAuthorInfo({ authorImage, authorName });
        } else {
          setAuthorInfo(null);
        }
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };

    fetchAuthorNFTs();
  }, [authorId]);

  if (!authorInfo) {
    return (
      <section className="container mt-5">
        <h2 className="text-center">Author not found or no items available</h2>
      </section>
    );
  }

  return (
    <section className="container mt-5">
      {/* Author Header */}
      <div className="text-center mb-4">
        <img
          src={authorInfo.authorImage}
          alt={authorInfo.authorName}
          className="rounded-circle"
          width="150"
          height="150"
        />
        <h2 className="mt-3">{authorInfo.authorName}</h2>
      </div>

      {/* Author's NFTs */}
      <div className="row">
        {authorNFTs.map((item) => (
          <div className="col-md-4 mb-4" key={item.nftId}>
            <div className="card">
              <img src={item.nftImage} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.price} ETH</p>
                <p className="card-text">{item.likes} Likes</p>
                <p className="card-text">
                  Expires: {new Date(item.expiryDate).toLocaleString()}
                </p>
                <Link
                  to={`/item-details/${item.nftId}`}
                  state={{ collection: item }}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Author;







