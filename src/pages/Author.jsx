import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AuthorSkeletonLoader from "../components/author/AuthorSkeletonLoader";
import { Link, useParams } from "react-router-dom"; 
import { getAuthorItems } from "../api/api";

const Author = () => {
  const { authorId } = useParams(); 
  const [authorData, setAuthorData] = useState(null);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [followersCount, setFollowersCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchAuthorData = async () => {
      const data = await getAuthorItems(authorId); 
      if (data) {
        setAuthorData(data); 
        setCollections(data.nftCollection || []); 
        setFollowersCount(data.followers || 0);
      } else {
        console.error("No data returned for authorId:", authorId);
      }
      setLoading(false);
    };

    fetchAuthorData();
  }, [authorId]); 

  const handleFollowClick = (e) => {
    e.preventDefault();
    if (isFollowing) {
      setFollowersCount((count) => Math.max(count - 1, 0));
    } else {
      setFollowersCount((count) => count + 1);
    }
    setIsFollowing(!isFollowing);
  };

  if (loading) {
    return <AuthorSkeletonLoader />
  }

  if (!authorData) {
    return <div>No author data available.</div>; 
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
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt={authorData.authorName} />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">{authorData.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.address}
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
                      <div className="profile_follower">{followersCount} followers</div>
                      <Link to="#" className="btn-main" onClick={handleFollowClick}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems collections={collections} loading={loading} authorImage={authorData.authorImage} />
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
