import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const [data, setData] = React.useState([]);
  const [following, setFollowing] = useState(false);

  const { authorId } = useParams();

  async function getData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  function addFollower() {
    setData((prevData) => ({
      ...prevData,
      followers: prevData.followers + 1,
    }));
    setFollowing(true);
  }

  function unfollow() {
    setData((prevData) => ({
      ...prevData,
      followers: prevData.followers - 1,
    }));
    setFollowing(false);
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
                      <img src={data.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {data.authorName}
                          <span className="profile_username">@{data.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {data.authorId}
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
                      <div className="profile_follower">
                        {data.followers} followers
                      </div>

                      {following ? (
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={unfollow}
                        >
                          Unfollow
                        </Link>
                      ) : (
                        <Link to="#" className="btn-main" onClick={addFollower}>
                          Follow
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple" data-aos="fade-up" data-aos-duration="1000">
                  <AuthorItems
                    nftCollection={data.nftCollection}
                    authorImage={data.authorImage}
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
