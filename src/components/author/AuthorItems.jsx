import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";
import nftImage from "../../images/nftImage.jpg";

export default function AuthorItems() {
  const [sp] = useSearchParams();
  const authorId = sp.get("authorId");

  const [author, setAuthor] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetch() {
      if (!authorId) {
        setError("Missing authorId—use `/author?authorId=123`");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors",
          { params: { author: authorId } }
        );
        setAuthor(data);
        setItems(Array.isArray(data.nftCollection) ? data.nftCollection : []);
      } catch (e) {
        console.error("Failed to fetch author data:", e);
        setError("Could not load author data.");
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [authorId]);

  if (loading) return <div>Loading author...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!author) return <div>Author not found.</div>;

  const { name, authorName, avatar, username, wallet, followers } = author;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section>
          <div className="container" style={{ padding: "20px 0" }}>
            {items.length === 0 ? (
              <div>No items for this author.</div>
            ) : (
              <div className="row" style={{ gap: 12 }}>
                {items.map((it, idx) => (
                  <div
                    key={it.nftId ?? idx}
                    style={{ flex: "1 1 calc(25% - 12px)" }}
                  >
                    <div className="nft__item">
                      <Link to={`/item-details?nftId=${it.nftId}`}>
                        <img
                          src={it.nftImage || nftImage}
                          alt={it.title || ""}
                          style={{ width: "100%", borderRadius: 8 }}
                        />
                      </Link>
                      <Link to={`/item-details?nftId=${it.nftId}`}>
                        <h4 style={{ margin: "8px 0 4px" }}>
                          {it.title || "Untitled"}
                        </h4>
                      </Link>
                      <div style={{ fontSize: 14 }}>
                        {typeof it.price === "number" ? `${it.price} ETH` : "—"}
                      </div>
                      <div style={{ fontSize: 12, color: "#666" }}>
                        <i className="fa fa-heart" /> {it.likes ?? 0}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
