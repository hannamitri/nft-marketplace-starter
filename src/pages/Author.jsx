import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AuthorImage from "../images/author_thumbnail.jpg";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setAuthorData(data);
        setFollowersCount(data.followers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowersCount(isFollowing ? followersCount - 1 : followersCount + 1);
  };

  if (loading) {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section id="profile_banner" className="text-light" style={{ background: `url(${AuthorBanner}) top` }}></section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <Skeleton width="150px" height="150px" borderRadius="50%" /> {/* Author Image Skeleton */}
                    </div>
                  </div>
                  <div className="de-flex-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{marginLeft: '15px'}}>
                      <Skeleton width="150px" height="30px" />
                    </div> {/* Author Name */}
                    <div style={{marginLeft: '15px'}}>
                      <Skeleton width="100px" height="20px" />
                    </div> {/* Username */}
                    <div style={{marginLeft: '15px'}}>
                      <Skeleton width="250px" height="20px" />
                    </div> {/* Wallet Address */}
                  </div>
                  <div className="profile_follow de-flex" style={{ marginLeft: 'auto', marginTop: '50px' }}>
                    <Skeleton width="200px" height="48px" style={{ margin: '10px 0' }} /> {/* Follow Button */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}



  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section
          id="profile_banner"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage || AuthorImage} alt="" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">@{authorData.tag}</span>
                          <span className="profile_wallet">{authorData.address}</span>
                          <button id="btn_copy" title="Copy Text">Copy</button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followersCount} followers</div>
                      <button onClick={toggleFollow} className="btn-main">
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={authorData.items} />
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
