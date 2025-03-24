import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonExplore from "../components/UI/SkeletonExplore";
import ProfileHeader from "../components/author/ProfileHeader";
import FollowSection from "../components/author/FollowSection";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    if (authorId) {
      fetchAuthorData();
    }
  }, [authorId]);

  async function fetchAuthorData() {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setAuthorData(data);
    setFollowerCount(data.followers);

    setLoading(false);
  }

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount((prevCount) =>
      isFollowing ? prevCount - 1 : prevCount + 1
    );
  };

  const renderAuthor = (isLoading) => (
    <div className={isLoading ? "no-bottom no-top" : "wrapper"} id="content">
      <section
        id="profile_banner"
        className="text-light"
        style={!isLoading ? { background: `url(${AuthorBanner}) top` } : {}}
      >
        {isLoading && <Skeleton height={270} width="100%" />}
      </section>
      <section style={isLoading ? { padding: 0 } : {}}>
        <div className="container">
          <div className="row">
            <div className="d_profile de-flex">
              <ProfileHeader
                image={authorData?.authorImage}
                name={authorData?.authorName}
                tag={authorData?.tag}
                address={authorData?.address}
                isLoading={isLoading}
              />
              <FollowSection
                followerCount={followerCount}
                isFollowing={isFollowing}
                handleFollowClick={handleFollowClick}
                isLoading={isLoading}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="de_tab tab_simple">
              {isLoading ? (
                <div className="row">
                  <SkeletonExplore />
                </div>
              ) : (
                <AuthorItems
                  authorId={authorData?.authorId}
                  nftCollection={authorData?.nftCollection}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return renderAuthor (loading);
};

export default Author;

