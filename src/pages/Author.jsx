import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import Profile from "../components/utility/Profile";
import ProfileLoadingState from "../components/utility/ProfileLoadingState";

const Author = () => {
  let { authorId } = useParams();
  const [authorsData, setAuthorsData] = useState([]);
  const [nftCollection, setNftCollection] = useState([]);
  const [authorsImage, setAuthorsImage] = useState("");
  const [followers, setFollowers] = useState();
  const [followClicked, setFollowClicked] = useState(false);
  const [loading, isLoading] = useState();

  const getAuthorsData = async () => {
    isLoading(true);
    let { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setAuthorsData(data);
    setNftCollection(data.nftCollection);
    setAuthorsImage(data.authorImage);
    setFollowers(data.followers);
    setTimeout(() => {
      isLoading(false);
    }, 2000);
  };

  const toggleLikes = () => {
    if (followClicked === false) {
      setFollowers(followers + 1);
      setFollowClicked(!followClicked);
    } else {
      setFollowers(followers - 1);
      setFollowClicked(!followClicked);
    }
  };

  useEffect(() => {
    getAuthorsData();
  }, []);

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
                {!loading ? (
                  <Profile
                    authorsData={authorsData}
                    followers={followers}
                    toggleLikes={toggleLikes}
                    followClicked={followClicked}
                  />
                ) : (
                  <ProfileLoadingState />
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    nftCollection={nftCollection}
                    authorImage={authorsImage}
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
