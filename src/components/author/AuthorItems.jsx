import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";

export default function AuthorItems() {
  const [sp] = useSearchParams();
  const authorId = sp.get("authorId");

  const [author, setAuthor] = useState(null);
  const [items, setItems] = useState([]);
  const [loadingAuthor, setLoadingAuthor] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authorId) {
      setError("Missing authorId in URL (use /author?authorId=YOUR_ID).");
      setLoadingAuthor(false);
      setLoadingItems(false);
      return;
    }

    (async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/author",
          { params: { authorId } }
        );
        setAuthor(data ?? null);
      } catch (e) {
        console.error("author fetch failed:", e);
        setAuthor(null);
        setError("Failed to fetch author.");
      } finally {
        setLoadingAuthor(false);
      }
    })();

    (async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/authorMoreNFTs",
          { params: { authorId } }
        );
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.warn("authorMoreNFTs failed, falling back to explore:", e);
        try {
          const res = await axios.get(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
          );
          const all = Array.isArray(res.data) ? res.data : [];
          setItems(all.filter((x) => String(x.authorId) === String(authorId)));
        } catch (err) {
          console.error("explore fallback failed:", err);
          setItems([]);
        }
      } finally {
        setLoadingItems(false);
      }
    })();
  }, [authorId]);

  if (error && !author && items.length === 0) return <div>{error}</div>;
  if (loadingAuthor || loadingItems) return <div>Loading author & items…</div>;

  return (
    <div>
      <h2>Author</h2>
      {!author ? (
        <div>Author not found.</div>
      ) : (
        <div>
          <div><strong>{author.name || author.authorName || "Unknown Author"}</strong></div>
          <img
            src={author.authorImage || "/images/author_thumbnail.jpg"}
            alt={author.name || "Author"}
            style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover", marginTop: 8 }}
          />
        </div>
      )}

      <h3 style={{ marginTop: 16 }}>Items</h3>
      {items.length === 0 ? (
        <div>No items for this author.</div>
      ) : (
        <ul>
          {items.map((it, i) => (
            <li key={it.nftId ?? i}>
              <Link to={`/item-details?nftId=${it.nftId}`}>{it.title || "Untitled"}</Link>
              {" — "}{typeof it.price === "number" ? `${it.price} ETH` : "—"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
