import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AuthorImage from "../images/author_thumbnail.jpg";
import { FaPlus } from "react-icons/fa";


const Author = () => {
  const { authorId } = useParams()
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  async function fetchAuthors() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setAuthors(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchAuthors();
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
          <div className="container" key={authors.id}>
            <div className="row">
              {loading ? (
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                    <div className="skeleton profile_avatar-skeleton"></div>
                    <br />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <div>
                          <div className="skeleton authorName-skeleton"></div>

                          <span className="profile_username">
                            <div className="skeleton profile_username-skeleton"></div>
                            </span>

                          <span id="wallet" className="profile_wallet">
                            <div className="skeleton profile_wallet-skeleton"></div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        <div className="skeleton profile_follower-skeleton"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)
              
              
              :
              
              (<div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authors.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authors.authorName}
                          <span className="profile_username">@{authors.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {authors.address}
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
                      <div className="profile_follower">{following ? authors.followers + 1 : authors.followers} followers</div>
                      <Link to="#" className="btn-main" onClick={() => (following ? setFollowing(false) : setFollowing(true))}>
                        {following ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>)}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authors={authors} loading={loading}/>
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
