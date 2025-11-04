import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../css/styles/style.css";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000 });

    const fetchAuthor = async () => {
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        const data = await res.json();
        setAuthor(data);
      } catch (err) {
        console.error("Error fetching author:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [authorId]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(author.address);
    alert("Wallet address copied!");
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="author-skeleton">
          <div className="skeleton-circle mb-3" style={{ width: "120px", height: "120px", borderRadius: "50%" }} />
          <div className="skeleton-line mb-2" style={{ width: "40%", height: "20px" }} />
          <div className="skeleton-line mb-2" style={{ width: "30%", height: "15px" }} />
          <div className="skeleton-line mb-2" style={{ width: "50%", height: "15px" }} />
          <div className="skeleton-line mb-2" style={{ width: "60%", height: "15px" }} />
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="container text-center mt-5">
        <p className="text-danger">Author not found.</p>
      </div>
    );
  }

  return (
    <div className="author-page container">
      <div className="author-profile text-center" data-aos="fade-down">
        <img
          src={author.authorImage}
          alt={author.authorName}
          className="author-avatar"
        />
        <h2>
          {author.authorName}
          {author.isVerified && (
            <span className="verified-badge" title="Verified">✔️</span>
          )}
        </h2>
        <p className="author-tag">@{author.tag}</p>
        <div className="author-wallet">
          <span>{author.address.slice(0, 20)}...</span>
          <button onClick={copyToClipboard}>Copy</button>
        </div>
        <p className="author-followers">{author.followers} followers</p>
        <button className="btn btn-primary follow-btn">Follow</button>
      </div>

      <div className="nft-gallery row mt-4" data-aos="fade-up">
        {author.nftCollection?.map((nft, index) => (
          <div key={index} className="nft-card col-md-4 mb-4">
            <Link to={`/item-details/${nft.nftId}`} className="nft-link">
              <div className="nft-image-wrapper">
                <img src={nft.nftImage} alt={nft.title} className="nft-image" />
                <div className="nft-overlay">
                  <p>{nft.title}</p>
                  <p>Price: {nft.price} ETH</p>
                  <p>{nft.likes}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Author;