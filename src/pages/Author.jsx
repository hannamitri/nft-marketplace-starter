import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import "./Author.css";

const Author = () => {
  const { id } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const fetchAuthorData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=73855012`,
      );
      setAuthorData(data);
      setFollowers(data.followers);
    } catch (error) {
      console.error("Error fetching author data:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAuthorData();
  }, [fetchAuthorData]);


  
  function followerCount() {
    setIsFollowing(prev => !prev);
    setFollowers(prev => isFollowing ? prev - 1 : prev + 1)
  }


  function renderAuthorItems(item) {
    return (
      <div className="col-md-12" key={id}>
        <div className="d_profile de-flex">
          <div className="de-flex-col">
            <div className="profile_avatar">
              <img src={item?.authorImage} alt="" />

              <i className="fa fa-check"></i>
              <div className="profile_name">
                <h4>
                  {item?.authorName}
                  <span className="profile_username">@{item?.authorName}</span>
                  <span id="wallet" className="profile_wallet">
                    {item?.address}
                  </span>
                  <button id="btn_copy" title="Copy Text">
                    Copy
                  </button>
                </h4>
              </div>
            </div>
          </div>
          <div className="profile_follow de-flex">
            <div className="de-flex-col">
              <div className="profile_follower">{followers} followers</div>
              <Link to="#" className="btn-main" onClick={followerCount}>
                {isFollowing ? "Unfollow" : "Follow"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }


  function skeletonLoader() {
    return (
      <div className="col-md-12">
        <div className="d_profile de-flex">
          <div className="de-flex-col">
            <div className="profile_avatar">
              <div className="author-skeleton-avatar"></div>
              <i className="fa fa-check"></i>
              <div className="profile_name">
                <h4>
                  <div className="author-skeleton-name"></div>
                  <span className="author-skeleton-username"></span>
                  <span className="author-skeleton-wallet"></span>
                  <div className="author-skeleton-copy-btn"></div>
                </h4>
              </div>
            </div>
          </div>
          <div className="profile_follow de-flex">
            <div className="de-flex-col">
              <div className="author-skeleton-followers"></div>
              <div className="author-skeleton-follow-btn"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  


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
              {loading
                ? skeletonLoader()
                : authorData && renderAuthorItems(authorData)}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    nftCollection={authorData?.nftCollection}
                    authorImage={authorData?.authorImage}
                    authorId={authorData?.authorId}
                    loading={loading}
                  />
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
