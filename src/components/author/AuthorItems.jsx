import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import AuthorFallback from "../../images/author_thumbnail.jpg";
import NftFallback from "../../images/nftImage.jpg";

const PROD_BASE = "https://nft-marketplacee.web.app";

const num = (v) =>
  typeof v === "number" ? v : parseFloat(String(v).replace(/[^\d.]/g, ""));

const AuthorItems = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAuthorAndNfts() {
    setLoading(true);
    try {
      const authorRes = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/author",
        { params: { authorId } }
      );
      setAuthor(authorRes.data ?? null);

      let items = [];
      try {
        const nftsRes = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/authorMoreNFTs",
          { params: { authorId } }
        );
        items = Array.isArray(nftsRes.data) ? nftsRes.data : [];
      } catch {
        const expRes = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        const all = Array.isArray(expRes.data) ? expRes.data : [];
        items = all.filter((it) => String(it.authorId) === String(authorId));
      }

      setNfts(items);
    } catch (e) {
      console.error("author fetch failed:", e);
      setAuthor(null);
      setNfts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authorId) fetchAuthorAndNfts();
  }, [authorId]);

  const sortedNfts = useMemo(() => {
    const arr = [...nfts];
    arr.sort((a, b) => (num(b.price) || 0) - (num(a.price) || 0));
    return arr;
  }, [nfts]);

  return (
    <section id="section-author" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>Author</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        <div className="row" style={{ marginTop: 16, marginBottom: 16 }}>
          <div className="col-12" style={{ textAlign: "center" }}>
            {loading ? (
              <div
                className="skeleton"
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
            ) : (
              <img
                src={author?.authorImage || AuthorFallback}
                alt={author?.name || "Author"}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
            <div style={{ marginTop: 10, fontSize: 20, fontWeight: 600 }}>
              {loading ? (
                <span
                  className="skeleton"
                  style={{
                    display: "inline-block",
                    width: 160,
                    height: 18,
                    borderRadius: 6,
                  }}
                />
              ) : (
                author?.name || author?.authorName || "Unknown"
              )}
            </div>
            {!loading && author?.bio && (
              <div style={{ marginTop: 6, opacity: 0.8 }}>{author.bio}</div>
            )}
          </div>
        </div>

        <div className="row">
          {loading
            ? new Array(8).fill(0).map((_, i) => (
                <div
                  key={`sk-${i}`}
                  className="col-sm-6 col-md-4 col-lg-3"
                  style={{ marginBottom: 16 }}
                >
                  <div
                    className="skeleton"
                    style={{ width: "100%", height: 220, borderRadius: 12 }}
                  />
                  <div
                    className="skeleton"
                    style={{
                      width: "70%",
                      height: 16,
                      borderRadius: 6,
                      marginTop: 10,
                    }}
                  />
                  <div
                    className="skeleton"
                    style={{
                      width: "40%",
                      height: 14,
                      borderRadius: 6,
                      marginTop: 6,
                    }}
                  />
                </div>
              ))
            : sortedNfts.map((it, idx) => (
                <div
                  key={it.nftId ?? idx}
                  className="col-sm-6 col-md-4 col-lg-3"
                  style={{ marginBottom: 16 }}
                >
                  <Link to={`/item-details/${it.nftId}`}>
                    <img
                      src={it.nftImage || NftFallback}
                      alt={it.title || ""}
                      style={{
                        width: "100%",
                        borderRadius: 12,
                        display: "block",
                      }}
                    />
                  </Link>
                  <div style={{ textAlign: "center", marginTop: 8 }}>
                    <Link to={`/item-details/${it.nftId}`}>
                      <h5 style={{ margin: 0 }}>{it.title || "Untitled"}</h5>
                    </Link>
                    <div style={{ opacity: 0.8, marginTop: 4 }}>
                      {typeof it.price === "number" ? `${it.price} ETH` : "—"}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <style>{`
        .skeleton { position: relative; overflow: hidden; background: #e6e6e6; }
        .skeleton::after {
          content: ""; position: absolute; inset: 0; transform: translateX(-100%);
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.6) 50%, rgba(255,255,255,0) 100%);
          animation: shimmer 1.25s infinite;
        }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}</style>
    </section>
  );
};

export default AuthorItems;
