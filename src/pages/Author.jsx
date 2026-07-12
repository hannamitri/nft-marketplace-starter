import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";


const Author = () => {
  const { authorId } = useParams()
  const [item, setItem] = useState([])
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const handleFollow = () => {
    setFollowing(!following)
  }

  useEffect(() => {
    setLoading(true)
    fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setItem(data)
        setLoading(false)
      })
      .catch((err) => {
        console.log("Error: ", err);
        setLoading(false);
      })
  }, [authorId])

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
                      <img src={item.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {item.authorName}
                          <span className="profile_username">@{item.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {item.address}
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
                      <div className="profile_follower">{following ? item.followers + 1 : item.followers} followers</div>
                      <Link to="#" className="btn-main" onClick={handleFollow}>
                        {following ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={item.nftCollection} authorImage={item.authorImage} loading={loading} />
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
