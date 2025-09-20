import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [data, setData] = React.useState([]);
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const { authorId } = useParams();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      setData(data);
      setLoading(false);
    }
    getData();
    console.log(data.authorBanner);
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
    <>
      {loading && (
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
                          <Skeleton
                            width={100}
                            height={100}
                            borderRadius={100}
                          />
                          <div className="profile_name">
                            <h4>
                              <Skeleton
                                width={150}
                                height={30}
                                borderRadius={5}
                              />
                              <span className="profile_username">
                                <Skeleton
                                  width={100}
                                  height={20}
                                  borderRadius={5}
                                />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton
                                  width={150}
                                  height={20}
                                  borderRadius={5}
                                />
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                <Skeleton
                                  width={50}
                                  height={20}
                                  borderRadius={5}
                                />
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            <Skeleton
                              width={100}
                              height={20}
                              borderRadius={5}
                            />
                          </div>
                          <Skeleton width={100} height={40} borderRadius={5} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div
                      className="de_tab tab_simple"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      <div className="de_tab_content">
                        <div className="tab-1">
                          <div className="row">
                            {new Array(8).fill(0).map((_, index) => (
                              <div
                                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                key={index}
                              >
                                <div className="nft__item">
                                  <div className="author_list_pp">
                                    <Skeleton
                                      width={50}
                                      height={50}
                                      borderRadius={100}
                                    />
                                  </div>
                                  <div className="nft__item_wrap">
                                    <div className="nft__item_extra">
                                      <Skeleton
                                        width={50}
                                        height={50}
                                        borderRadius={100}
                                      />
                                    </div>
                                    <Skeleton
                                      width={200}
                                      height={200}
                                      borderRadius={10}
                                    />
                                  </div>
                                  <div className="nft__item_info">
                                    <Skeleton width={"60%"} height={20} />
                                    <Skeleton width={"40%"} height={20} />
                                    <div className="nft__item_price">
                                      <Skeleton
                                        width={100}
                                        height={20}
                                        borderRadius={5}
                                      />
                                    </div>
                                    <div className="nft__item_like">
                                      <i className="fa fa-heart"></i>
                                      <Skeleton
                                        width={50}
                                        height={20}
                                        borderRadius={5}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
      {!loading && (
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
                              <span className="profile_username">
                                @{data.tag}
                              </span>
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
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={addFollower}
                            >
                              Follow
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div
                      className="de_tab tab_simple"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
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
      )}
    </>
  );
};

export default Author;
