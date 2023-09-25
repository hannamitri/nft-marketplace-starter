import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import SkeletonNftWithTimer from "../components/UI/SkeletonNftWithTimer";

const Author = () => {
  let { authorID } = useParams();
  const url = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorID}`;
  const [authorData, setAuthorData] = useState(null);
  const [followed, setFollow] = useState(false);
  const skeletonArr = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    async function renderData() {
      const response = (await axios.get(url)).data;
      setTimeout(() => {
        setAuthorData(response);
      }, 200);
    }

    renderData();
  }, [url]);

  return (
    <>
      {authorData ? (
        <div id="wrapper">
          <div className="no-bottom no-top" id="content">
            <div id="top"></div>

            <section
              id="profile_banner"
              aria-label="section"
              className="text-light"
              data-bgimage="url(images/author_banner.jpg) top"
              style={{ background: `url(${AuthorBanner}) top` }}></section>

            <section aria-label="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={authorData.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {authorData.authorName}
                              <span className="profile_username">
                                @{authorData.tag}
                              </span>
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
                          {!followed ? (
                            <>
                              <div className="profile_follower">
                                {authorData.followers} followers
                              </div>
                              <button
                                to="#"
                                className="btn-main"
                                onClick={() => setFollow(true)}>
                                Follow
                              </button>
                            </>
                          ) : (
                            <>
                              <div className="profile_follower">
                                {authorData.followers + 1} followers
                              </div>
                              <button
                                to="#"
                                className="btn-main"
                                onClick={() => setFollow(false)}>
                                Unfollow
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems
                        nftCollection={authorData.nftCollection}
                        authorImage={authorData.authorImage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div id="wrapper">
          <div className="no-bottom no-top" id="content">
            <div id="top"></div>

            <section
              id="profile_banner"
              aria-label="section"
              className="text-light"
              data-bgimage="url(images/author_banner.jpg) top"
              style={{ background: `url(${AuthorBanner}) top` }}></section>

            <section aria-label="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar ">
                          <div
                            alt=""
                            className="profile__avatar--skeleton skeleton "></div>

                          <i className="fa fa-check"></i>
                          <div className="profile_name profile__name--skeleton">
                            <h4 className="skeleton author__name--skeleton">
                              Author Name Author
                            </h4>
                            <div className="profile_username profile__username--skeleton skeleton">
                              Author Tag Tag
                            </div>
                            <div
                              id="wallet"
                              className="profile_wallet profile__wallet--skeleton skeleton">
                              Author Address Author Address
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div to="#" className="skeleton follow__button">
                            Follow
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple author__items--skeleton--wrapper">
                      {skeletonArr.map((__, index) => (
                        <SkeletonNftWithTimer key={index} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Author;
