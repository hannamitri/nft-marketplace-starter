import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAuthor = async () => {
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );

        const text = await response.text();
        console.log("RAW AUTHOR RESPONSE:", text);

        if (!text || text.trim() === "") {
          setAuthor(null);
          return;
        }

        const data = JSON.parse(text);
        const authorData = Array.isArray(data) ? data[0] : data;

        console.log("PARSED AUTHOR DATA:", authorData);

        setAuthor(authorData);
        setFollowers(authorData.followers || 0);
      } catch (error) {
        console.log("AUTHOR PAGE ERROR:", error);
        setAuthor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  const handleFollow = () => {
    if (isFollowing) {
      setFollowers((prev) => prev - 1);
    } else {
      setFollowers((prev) => prev + 1);
    }
    setIsFollowing(!isFollowing);
  };

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  if (!author) {
    return <div style={{ padding: "40px" }}>Author not found.</div>;
  }

  return (
    <div>
      <section
        style={{
          minHeight: "360px",
          backgroundImage:
            "url('https://nft-marketplacee.web.app/static/media/profile_banner.44cde9e5.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></section>

      <section style={{ padding: "60px 0" }}>
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "24px",
              marginBottom: "50px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ position: "relative" }}>
                <img
                  src={author.authorImage}
                  alt={author.authorName}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <i
                  className="fa fa-check"
                  style={{
                    position: "absolute",
                    right: "8px",
                    bottom: "8px",
                    background: "#8364e2",
                    color: "#fff",
                    borderRadius: "50%",
                    padding: "10px",
                    fontSize: "12px",
                  }}
                ></i>
              </div>

              <div>
                <h2
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "42px",
                    fontWeight: "700",
                    lineHeight: "1.1",
                  }}
                >
                  {author.authorName}
                </h2>

                <div
                  style={{
                    color: "#8364e2",
                    fontWeight: "600",
                    marginBottom: "8px",
                  }}
                >
                  @{author.tag}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      color: "#727272",
                      fontSize: "16px",
                    }}
                  >
                    {author.address}
                  </span>

                  <button
                    onClick={() => navigator.clipboard.writeText(author.address)}
                    style={{
                      fontSize: "12px",
                      padding: "4px 10px",
                      border: "1px solid #ddd",
                      borderRadius: "3px",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontWeight: "600",
                  color: "#555",
                  fontSize: "20px",
                }}
              >
                {followers} followers
              </div>

              <button
                className="btn-main"
                onClick={handleFollow}
                style={{
                  background: "#8364e2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "12px 28px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
            }}
          >
            {author.nftCollection &&
              author.nftCollection.map((nft) => (
                <div
                  key={nft.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "15px",
                    background: "#fff",
                    padding: "20px",
                  }}
                >
                  <div style={{ marginBottom: "16px", position: "relative" }}>
                    <Link to={`/author/${id}`}>
                      <img
                        src={author.authorImage}
                        alt={author.authorName}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          position: "absolute",
                          top: "0",
                          left: "0",
                          zIndex: "2",
                        }}
                      />
                    </Link>

                    <div style={{ paddingTop: "28px" }}>
                      <Link to={`/item-details/explore/${nft.nftId}`}>
                        <img
                          src={nft.nftImage}
                          alt={nft.title}
                          style={{
                            width: "100%",
                            height: "260px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </Link>
                    </div>
                  </div>

                  <div>
                    <Link
                      to={`/item-details/explore/${nft.nftId}`}
                      style={{
                        textDecoration: "none",
                        color: "#111",
                        fontWeight: "800",
                        fontSize: "18px",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      {nft.title}
                    </Link>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ fontWeight: "600" }}>{nft.price} ETH</span>
                      <span style={{ color: "#888" }}>
                        <i className="fa fa-heart" style={{ marginRight: "6px" }}></i>
                        {nft.likes}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Author;