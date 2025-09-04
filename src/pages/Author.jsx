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
                width: 150,
                height: 150,
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #fff",
              }}
            />
            
            <i
              className="fa fa-check"
              style={{
                borderRadius: "100%",
                color: "#fff",
                display: "block",
                margin: "110px 0 0 110px",
                padding: "10px",
                position: "absolute",
                background: "#7C6CF1",
              }}
            />
            <div>
              <h2 style={{ margin: -5, fontSize: "24px", lineHeight: "1.3em" }}>{author.authorName}</h2>
              {author.tag && (
                <div style={{ color: "#7C6CF1", fontWeight: 600 }}>
                  @{author.tag}
                </div>
              )}
              {author.address && (
                <div style={{ position: "relative", display: "inline-block" }}>
                  <span
                    id="wallet"
                    className="profile_wallet"
                    style={{
                      color: "#727272",
                      display: "block",
                      float: "left",
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontFamily: "monospace",
                    }}
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
                      display: "inline-block",
                      fontSize: 12,
                      lineHeight: "1em",
                      outline: "none",
                      padding: "4px 10px",
                      position: "absolute",
                      right: -45,
                      top: "30%",
                      transform: "translateY(-50%)",
                      background: "#f0f0f0",
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
