import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState([]);
  const [follow, setFollow] = useState(false);
  const loading = authorData.length === 0;

  async function fetchAuthor() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      setAuthorData(data);
    } catch (error) {
      console.error("Error fetching api:", error);
      setAuthorData([]);
    }
  }

  console.log(authorData);

  useEffect(() => {
    fetchAuthor();
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
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton circle={true} height={150} width={150} />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton />
                            <span className="profile_username">
                              <Skeleton />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width={200} /> 
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width={100}/>
                        </div>
                        <Skeleton className="btn-main"/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems
                      authorData={authorData}
                      fetchAuthor={fetchAuthor}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {!loading && (
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
                        <div className="profile_follower">
                          {follow
                            ? authorData.followers + 1
                            : authorData.followers}{" "}
                          followers
                        </div>
                        <button
                          className="btn-main"
                          onClick={() => {
                            setFollow(!follow);
                          }}
                        >
                          {follow ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems
                      authorData={authorData}
                      fetchAuthor={fetchAuthor}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Author;
