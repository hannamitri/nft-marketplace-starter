import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import SkeletonAuthor from "../components/UI/SkeletonAuthor";

const Author = () => {
  const [nftCollection, setNftCollection] = useState([]);
  const [localNftData, setLocalNftData] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const { authorId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        
        setLocalNftData(response.data);
        setNftCollection(response.data.nftCollection);

        const followingStatus = localStorage.getItem(`isFollowing-${authorId}`);
        const followersCount = localStorage.getItem(`followersCount-${authorId}`);

        if (followingStatus === 'true') {
          setIsFollowing(true);
        }

        if (followersCount) {
          setLocalNftData(prevData => ({
            ...prevData,
            followers: parseInt(followersCount)
          }));
        }
      } catch (error) {
        console.error("There was an error fetching the NFT data!", error);
      }finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchNFTs();
  }, [authorId]);

  const handleFollowClick = () => {
    const newFollowingStatus = !isFollowing;
    setIsFollowing(newFollowingStatus);

    setLocalNftData(prevData => {
      const newFollowersCount = newFollowingStatus ? prevData.followers + 1 : prevData.followers - 1;
      localStorage.setItem(`followersCount-${authorId}`, newFollowersCount);

      return {
        ...prevData,
        followers: newFollowersCount,
      };
    });

    localStorage.setItem(`isFollowing-${authorId}`, newFollowingStatus);
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
            <div className="col-md-12">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  {isLoading ? (
                    <SkeletonAuthor />
                  ) : (
                    <>
                      <div className="profile_avatar">
                        <img src={localNftData.authorImage} alt="Author" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {localNftData.authorName}
                            <span className="profile_username">{localNftData.tag}</span>
                            <span id="wallet" className="profile_wallet">{localNftData.address}</span>
                            <button id="btn_copy" title="Copy Text">Copy</button>
                          </h4>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">{`${localNftData.followers}`} followers</div>
                          <button className="btn-main" onClick={handleFollowClick}>
                            {isFollowing ? "Unfollow" : "Follow"}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="de_tab tab_simple">
                <AuthorItems localNftData={localNftData} nftCollection={nftCollection} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;