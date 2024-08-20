import React, { useEffect, useState } from "react";
import AuthorItems from "../components/author/AuthorItems";
import {useParams } from "react-router-dom";
import axios from "axios";
import Followers from "../components/UI/Followers";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [items, setitems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setitems(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
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
          style={{ background: `url(${items.authorImage}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton
                            width={150}
                            height={150}
                            borderRadius={99}
                          />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <Skeleton width={200} height={30} />
                              <span className="profile_username">
                                <Skeleton width={100} height={20} />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton width={300} height={20} />
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            <Skeleton width={120} height={25} />
                          </div>

                          <Skeleton width={125} height={45} borderRadius={8} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <div className="tab-1">
                          <div className="row">
                            {items
                              ? new Array(8).fill(0).map((_, index) => (
                                  <div
                                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12 pb-3"
                                    key={index}
                                  >
                                    <Skeleton
                                      width="100%"
                                      height={440}
                                      borderRadius={20}
                                    />
                                  </div>
                                ))
                              : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={items.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {items.authorName}
                              <span className="profile_username">
                                @{items.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {items.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        {items.followers ? (
                          <Followers followers={items.followers} />
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems data={items} authorPic={items.authorImage} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;