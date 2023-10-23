import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "./components/UI/Skeleton";
import { useState, useEffect } from "react";

const Author = () => {
  const { authorId } = useParams()
  const [items, setitems] = useState(null)
  const [follow, setfollow] = useState(false)
  async function fetchData() {
    await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
      .then((data) => {
        setitems(data.data)
      })
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData === null])

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
              {items ? <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={items?.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {items?.authorName}
                          <span className="profile_username">@{items?.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {items?.address}
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
                      <div className="profile_follower">{follow ? items?.followers + 1 : items?.followers}</div>
                      <Link to="#" onClick={() => { setfollow(!follow) }} className="btn-main">
                        {follow ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div> :
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width={150} height={150} borderRadius={"50%"}></Skeleton>

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton width={200}></Skeleton>
                            <span className="profile_username"><Skeleton width={100}></Skeleton></span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width={250}></Skeleton>
                            </span>

                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower"><Skeleton width={100}></Skeleton></div>
                        <Skeleton width={150} height={40}></Skeleton>
                      </div>
                    </div>
                  </div>
                </div>
              }

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={items} />
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
