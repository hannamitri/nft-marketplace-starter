import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems"; 
import Skeleton from "../components/UI/Skeleton"; 

const Author = () => {
  const { authorId } = useParams(); 
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 1. DYNAMIC FOLLOW TRACKING STATE
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchAuthorProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        if (!response.ok) throw new Error("Failed to fetch author data");
        const data = await response.json();
        
        setAuthorData(data);
        // Initialize the base follower count straight from the API data stream
        setFollowersCount(data.followers || 0);
        setIsFollowing(false); // Reset tracking state if changing profiles
      } catch (error) {
        console.error("Error pulling author profile metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    if (authorId) {
      fetchAuthorProfile();
    }
  }, [authorId]);

  // 2. TOGGLE ACTION LOGIC
  const toggleFollow = () => {
    if (isFollowing) {
      setFollowersCount((prev) => prev - 1);
    } else {
      setFollowersCount((prev) => prev + 1);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        
        <section 
          id="profile_banner" 
          className="text-light" 
          style={{ 
            background: `url(${authorData?.bannerImage || "/images/author_banner.jpg"}) top fixed`,
            backgroundSize: "cover"
          }}
        ></section>
        
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton width="150px" height="150px" borderRadius="50%" />
                      ) : (
                        <img src={authorData?.authorImage} alt="Author Profile" />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <Skeleton width="200px" height="24px" borderRadius="4px" />
                          ) : (
                            authorData?.authorName
                          )}
                          <span className="profile_username">
                            {loading ? (
                              <Skeleton width="120px" height="16px" borderRadius="4px" style={{ marginTop: "5px" }} />
                            ) : (
                              `@${authorData?.tag}`
                            )}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* 3. DYNAMIC FOLLOWER COUNT AND TOGGLE BUTTON */}
                  <div className="profile_follow de-flex-col">
                    <div className="de-flex-col" style={{ paddingRight: "20px", textAlign: "right" }}>
                      {loading ? (
                        <Skeleton width="80px" height="20px" borderRadius="4px" />
                      ) : (
                        <span className="profile_follower" style={{ fontSize: "16px", fontWeight: "600" }}>
                          {followersCount} followers
                        </span>
                      )}
                    </div>
                    {!loading && (
                      <button 
                        className={`btn-main ${isFollowing ? "btn-unfollow" : ""}`}
                        onClick={toggleFollow}
                        style={{
                          backgroundColor: isFollowing ? "#727272" : "#8364e2",
                          color: "#fff",
                          border: "none",
                          padding: "8px 24px",
                          borderRadius: "6px",
                          fontWeight: "bold",
                          transition: "all 0.3s ease"
                        }}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    )}
                  </div>

                </div>
              </div>

              <div className="col-md-12" key={authorData?.id || "loading"}>
                <AuthorItems 
                  nftCollection={authorData?.nftCollection} 
                  authorImage={authorData?.authorImage}
                  loading={loading}
                />
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;