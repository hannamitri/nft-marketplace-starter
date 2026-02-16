import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import AuthorItems from "../components/author/AuthorItems";
import defaultBanner from "../images/author_banner.jpg";

export default function Author() {
  const [sp] = useSearchParams();
  const authorId = sp.get("authorId");

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!authorId) {
      setErr("Missing authorId — open /author?authorId=<id>");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors",
          { params: { author: authorId } }
        );
        console.log("Author API:", data);
        setAuthor(data ?? null);
      } catch (e) {
        console.error("Author fetch failed:", e);
        setErr("Failed to load author.");
      } finally {
        setLoading(false);
      }
    })();
  }, [authorId]);

  if (loading) return <div>Loading author…</div>;
  if (err) return <div style={{ color: "red" }}>{err}</div>;
  if (!author) return <div>Author not found.</div>;

  const bannerUrl = author.bannerImage || author.banner || defaultBanner;

  return (
    <div id="wrapper">
      <section
        style={{
          background: `url(${bannerUrl}) center / cover no-repeat`,
          height: 300,
        }}
      />

      <section style={{ padding: "90px 0" }}>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img
              src={author.authorImage}
              alt={author.authorName}
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #fff",
              }}
            />
            <div>
              <h2 style={{ margin: 0 }}>{author.authorName}</h2>
              {author.tag && (
                <div style={{ color: "#7C6CF1", fontWeight: 600 }}>
                  @{author.tag}
                </div>
              )}
              {author.address && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    id="wallet"
                    className="profile_wallet"
                    title={author.address}
                    style={{ fontFamily: "monospace" }}
                  >
                    {author.address}
                  </span>
                  <button
                    id="btn_copy"
                    title="Copy Text"
                    onClick={() =>
                      navigator.clipboard?.writeText(author.address)
                    }
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: 3,
                      padding: "4px 8px",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Copy
                  </button>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div>{author.followers} followers</div>
            <button
              style={{
                background: "#7C6CF1",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Follow
            </button>
          </div>
        </div>

        <div className="container" style={{ marginTop: 24 }}>
          <AuthorItems
            items={author.nftCollection || []}
            authorImage={author.authorImage || ""}
          />
        </div>
      </section>
    </div>
  );
}
