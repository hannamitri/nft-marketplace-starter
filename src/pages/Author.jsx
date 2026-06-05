import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems"; 
import Skeleton from "../components/UI/Skeleton"; // Clean loader proxy

const Author = () => {
  const { authorId } = useParams(); 
  console.log("Current Author ID from URL path:", authorId);
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchAuthorProfile = async () => {
    try {
      setLoading(true);
      console.log("Fetching data for ID:", authorId);
      
      // Change from: .../authors?authorId=${authorId}
// Change to: .../authors/${authorId}

const response = await fetch(
  `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
);
      const data = await response.json();
      
      console.log("Raw API Response data:", data); // Check what this prints!
      
      // If the API returns an array instead of a single object, unpack it safely
      if (Array.isArray(data)) {
        setAuthorData(data[0]);
      } else {
        setAuthorData(data);
      }
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
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        
        {/* Profile Banner */}
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
                </div>
              </div>

              {/* 1. Pass down the live arrays and the profile pfp to the items layout */}
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