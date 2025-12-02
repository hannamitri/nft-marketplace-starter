import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [follow, setFollow] = useState(false);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        console.log("API response:", res.data);
        setAuthor(res.data);
        setFollowers(res.data.followers);
      } catch (error) {
        console.error("Error fetching author:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [authorId]);

  const handleFollowClick = () => {
    if (follow) {
      setFollowers ((prev) => prev - 1)
    }
    else {
      setFollowers ((prev) => prev + 1)
    }
    setFollow(!follow);
  }


  if (loading) {
    return (
      <div className="container py-5">
        <div className="d_profile de-flex mb-4">
          <Skeleton width="80px" height="80px" borderRadius="50%" />{" "}
          <div className="ml-3">
            <Skeleton width="200px" height="24px" />
            <Skeleton width="150px" height="18px" />
          </div>
        </div>
        <div className="row">
          {[...Array(4)].map((_, i) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
              <Skeleton width="100%" height="250px" borderRadius="12px" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!author) {
    return <div className="text-center py-5">Author not found.</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{
            backgroundImage: `url(${AuthorBanner})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">
                            {"@" + author.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
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
                      <div className="profile_follower">{followers + " followers"}</div>
                      <Link to="#" className="btn-main" onClick={handleFollowClick}>
                        {follow ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    nftCollection={author.nftCollection}
                    authorImage={author.authorImage}
                  />
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
