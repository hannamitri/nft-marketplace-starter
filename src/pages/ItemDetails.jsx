import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AuthorFallback from "../../images/author_thumbnail.jpg";
import NftFallback from "../../images/nftImage.jpg";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails",
          { params: { nftId } }
        );
        setItem(data);
      } catch (e) {
        console.error("fetch item failed", e);
        setItem(null);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [nftId]);

  if (loading) return <div>Loading…</div>;
  if (!item) return <div>Item not found</div>;

  return (
    <section id="item-details">
      <div className="container">
        <h2>{item.title}</h2>
        <div>
          <img src={item.nftImage || NftFallback} alt={item.title} style={{ maxWidth: "100%" }} />
        </div>
        <div style={{ marginTop: 16 }}>
          <Link to={`/author/${item.authorId}`}>
            <img
              src={item.authorImage || AuthorFallback}
              alt={item.author || "Author"}
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
          </Link>
          <p>{item.author || "Unknown"}</p>
        </div>
        <div style={{ marginTop: 16 }}>
          <strong>{item.price} ETH</strong>
          <div>{item.likes} Likes</div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetails;

