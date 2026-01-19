import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AuthorImage from "../images/author_thumbnail.jpg";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        const data = response.data || {};
        setAuthorData(data);
        setFollowerCount(data.followers || 0);
        setIsFollowing(false);
        
        // Add author image to each NFT item for the card display
        const itemsWithAuthorImage = (data.nftCollection || []).map(item => ({
          ...item,
          authorImage: data.authorImage,
          authorId: data.authorId
        }));
        setItems(itemsWithAuthorImage);
      } catch (error) {
        console.error("Error fetching author data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (authorId) {
      fetchAuthorData();
    }
  }, [authorId]);

  useEffect(() => {
    if (authorData?.followers !== undefined) {
      setFollowerCount(authorData.followers);
      setIsFollowing(false);
    }
  }, [authorData]);

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
    setFollowerCount((prev) => {
      const delta = isFollowing ? -1 : 1;
      const next = prev + delta;
      return next < 0 ? 0 : next;
    });
  };
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <>
                          <div className="skeleton skeleton-avatar" style={{ width: "150px", height: "150px", borderRadius: "50%" }}></div>
                          <div style={{ marginTop: "20px" }}>
                            <div className="skeleton skeleton-title" style={{ width: "200px", height: "30px", marginBottom: "10px" }}></div>
                            <div className="skeleton skeleton-text" style={{ width: "150px", height: "20px", marginBottom: "10px" }}></div>
                            <div className="skeleton skeleton-text" style={{ width: "100%", height: "15px", marginBottom: "10px" }}></div>
                            <div className="skeleton skeleton-text" style={{ width: "80%", height: "15px" }}></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <img src={authorData?.authorImage || AuthorImage} alt="" />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {authorData?.authorName || "Loading..."}
                              <span className="profile_username">@{authorData?.tag || "username"}</span>
                              <span id="wallet" className="profile_wallet">
                                {authorData?.address || "UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7"}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {loading ? (
                          <div className="skeleton skeleton-text" style={{ width: "100px", height: "20px" }}></div>
                        ) : (
                          `${followerCount} followers`
                        )}
                      </div>
                      <button type="button" className="btn-main" onClick={handleFollowToggle} disabled={loading}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={items} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
