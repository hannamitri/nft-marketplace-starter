import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SkeletonLoading from "../components/reusable-components/SkeletonLoading";

const Author = () => {
  const [loading, setLoading] = useState(false);
  const [uniqueUserData, setUniqueUserData] = useState([]);
  const [follower, setFollower] = useState();
  const { id } = useParams();

  async function getUserIdResponse() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );

    // Map over each item in the nftCollection array; for each nftUser (each item in array)
    // create a new object by "spreading" property of original nftUser, and add "authorImage" value
    const userDataWithAuthorImage = data.nftCollection.map((nftUser) => ({
      ...nftUser,
      authorImage: data.authorImage,
    }));

    // merged userData with newly created nftCollection; now all objects have data.authorImage prop
    const userData = {
      ...data,
      nftCollection: userDataWithAuthorImage,
    };

    // setting object into an array to map over
    setUniqueUserData([userData]);
    setLoading(false);
  }

  const handleAddFollow = () => {
    setFollower(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserIdResponse();
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

        {loading && (
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex skeleton--container--margin">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        className="skeleton author__skeleton--pp"
                        src=""
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          <div className="skeleton author__skeleton--name"></div>
                          <div className="skeleton author__skeleton--tag"></div>
                          <div className="skeleton author__skeleton--address"></div>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="skeleton author__space--between"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container">
          <div className="row">
            <div className="col-md-12"></div>
            <div className="col-md-12">
              <div className="de_tab tab_simple">
                <div className="tab-1">
                  <div className="row">
                    <div className="author__info--container">
                      {loading
                        ? new Array(8)
                            .fill(0)
                            .map((_, index) => (
                              <SkeletonLoading
                                index={uniqueUserData}
                                key={index}
                              />
                            ))
                        : uniqueUserData &&
                          uniqueUserData.map((user, index) => (
                            <section aria-label="section" key={index}>
                              <div className="container">
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="d_profile de-flex">
                                      <div className="de-flex-col">
                                        <div
                                          className="profile_avatar"
                                          key={index}
                                        >
                                          <img
                                            src={user.authorImage}
                                            alt="authorImage"
                                          />

                                          <i className="fa fa-check"></i>
                                          <div className="profile_name">
                                            <h4>
                                              {user.authorName}
                                              <span className="profile_username">
                                                @{user.tag}
                                              </span>
                                              <span
                                                id="wallet"
                                                className="profile_wallet"
                                              >
                                                {user.address}
                                              </span>

                                              <button
                                                id="btn_copy"
                                                title="Copy Text"
                                              >
                                                Copy
                                              </button>
                                            </h4>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="profile_follow de-flex">
                                        <div className="de-flex-col">
                                          <div className="profile_follower">
                                            {follower
                                              ? user.followers + 1
                                              : user.followers}{" "}
                                            followers
                                          </div>

                                          <Link
                                            to="#"
                                            className="btn-main"
                                            onClick={handleAddFollow}
                                          >
                                            {follower ? (
                                              <div>{`${"Unfollow"}`}</div>
                                            ) : (
                                              <div>Follow</div>
                                            )}
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="de_tab tab_simple">
                                      <div className="author--skeleton--container">
                                        {
                                          <AuthorItems
                                            nftCollection={
                                              uniqueUserData.length > 0
                                                ? uniqueUserData[0]
                                                    .nftCollection
                                                : []
                                            }
                                          />
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
