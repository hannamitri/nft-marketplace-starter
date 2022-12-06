import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import axios from "axios";
const Author = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [follow, setFollow] = useState(false);

  async function fetchSellers() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );

    setDetail(data);
  }

  useEffect(() => {
    fetchSellers();
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
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={detail.authorImage} alt="img" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          <span className="profile_username">
                            @{detail.authorName}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {detail.address}
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
                        {detail.followers + (follow ? "" : 1)} Followers
                      </div>
                      {!follow ? (
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={() => setFollow(true)}
                        >
                          Follow
                        </Link>
                      ) : (
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={() => setFollow(false)}
                        >
                          unfollow
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                  <AuthorItems detail={detail} />
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
