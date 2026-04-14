import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Author = () => {
  const { authorId } = useParams();
  const [follow, setFollow] = useState(false);
  const [followCount, setFollowCount] = useState(0);

  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFollowCount(data.followers);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [authorId]);

  if (!data) return <div>Loading...</div>;

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
                            {data.address}
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
                      <div className="profile_follower">{followCount} followers</div>
                      <Link to="#" className="btn-main" onClick={(e) => {
                        e.preventDefault();
                        setFollow(!follow);
                        setFollowCount(follow ? followCount - 1 : followCount + 1);
                      }}>
                        {follow ? "Unfollow" : "Follow"}  
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems nftCollection={data?.nftCollection} authorImage={data?.authorImage} authorId={data?.authorId} />
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