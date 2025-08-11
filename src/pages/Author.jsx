import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthorItems from "../components/author/AuthorItems";

const isValidAuthorId = (id) =>
  id && String(id).toLowerCase() !== "undefined" && !isNaN(Number(id));

const Author = () => {
  const { authorId } = useParams();
  const navigate = useNavigate();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleFollow = () => {
    setAuthorData((prev) => {
      if (!prev) return prev;

      const newIsFollowing = !prev.isFollowing;
      const updatedFollowers = newIsFollowing
        ? prev.followers + 1
        : prev.followers - 1;

      return {
        ...prev,
        isFollowing: newIsFollowing,
        followers: updatedFollowers,
      };
    });
  };

  useEffect(() => {
    if (!isValidAuthorId(authorId)) {
      console.warn("🚫 Invalid authorId:", authorId);
      navigate("/explore");
      return;
    }

    const fetchAuthorDetails = async () => {
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );

        const data = res.data;
        if (
          !data ||
          !data.nftCollection ||
          !Array.isArray(data.nftCollection)
        ) {
          console.warn("❌ Malformed author response:", data);
          navigate("/explore");
          return;
        }

        const hydratedItems = data.nftCollection.map((item) => ({
          ...item,
          authorImage: data.authorImage,
          authorName: data.authorName,
          authorId: data.authorId,
        }));

        setAuthorData({
          ...data,
          nftCollection: hydratedItems,
        });
      } catch (err) {
        console.error("❌ Author fetch failed:", err);
        navigate("/explore");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorDetails();
  }, [authorId, navigate]);

  if (loading)
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top" />
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light animate-pulse"
            style={{
              backgroundColor: "#333",
              height: "240px",
            }}
          />
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div
                          className="animate-pulse"
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            backgroundColor: "#ccc",
                          }}
                        />
                        <i className="fa fa-check" />
                        <div className="profile_name animate-pulse">
                          <h4
                            style={{
                              width: "180px",
                              height: "24px",
                              backgroundColor: "#ddd",
                              borderRadius: "4px",
                            }}
                          />
                          <span
                            style={{
                              width: "120px",
                              height: "16px",
                              display: "inline-block",
                              backgroundColor: "#eee",
                              borderRadius: "4px",
                              marginTop: "8px",
                            }}
                          />
                          <div
                            className="profile_follow"
                            style={{
                              position: "absolute",
                              right: "20px",
                              top: "50px",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              zIndex: 10,
                              gap: "12px",
                            }}
                          >
                            <div
                              style={{
                                width: "120px",
                                height: "16px",
                                backgroundColor: "#ddd",
                                borderRadius: "4px",
                              }}
                            />
                            <div
                              style={{
                                width: "140px",
                                height: "48px",
                                backgroundColor: "#ccc",
                                borderRadius: "8px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 👇 Skeleton NFT grid while loading */}
              <AuthorItems items={[]} loading={true} />
            </div>
          </section>
        </div>
      </div>
    );

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top" />
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{
            backgroundImage: `url(${
              authorData.authorBanner || "/images/default-banner.jpg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        />
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={authorData.authorImage}
                        alt={authorData.authorName}
                      />
                      <i className="fa fa-check" />
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">
                            @{authorData.tag || "unknown"}
                          </span>
                        </h4>
                        <div
                          className="profile_follow"
                          style={{
                            position: "absolute",
                            right: "20px",
                            top: "50px",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            zIndex: 10,
                            gap: "12px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: "500",
                              color: "#333",
                            }}
                          >
                            {authorData.followers} followers
                          </span>
                          <button
                            className="btn-main"
                            onClick={toggleFollow}
                            style={{
                              height: "48px",
                              minWidth: "140px",
                              fontSize: "18px",
                              padding: "0 24px",
                              fontWeight: "600",
                              borderRadius: "8px",
                            }}
                          >
                            {authorData.isFollowing ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ✅ Hydrated content passed in */}
            <AuthorItems items={authorData.nftCollection} loading={false} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
