import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import AuthorSkeleton from "../components/UI/AuthorSkeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState("");
  const [showFollow, setShowFollow] = useState(false);
  const [followers, setFollowers] = useState();
  const [loading, setLoading] = useState(true);

  function followerButton() {
    if (showFollow) {
      setShowFollow(false);
      setFollowers((currentFollowers) => currentFollowers - 1);
    } else {
      setShowFollow(true);
      setFollowers((currentFollowers) => currentFollowers + 1);
    }
  }

  async function fetchAuthor() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthor(data);
    setFollowers(data.followers);
    setLoading(false);
    console.log(data);
  }

  useEffect(() => {
    fetchAuthor();
    setLoading(true);
    window.scrollTo(0, 0);
    AOS.init();
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
              {loading ? (
                <AuthorSkeleton />
              ) : (
                <div className="col-md-12" key={author.id} data-aos="fade-in" data-aos-easing="ease-in-out">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
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
                        <div className="profile_follower">
                          {author.followers}
                        </div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={followerButton}
                        >
                          {!showFollow ? "Follow" : "Unfollow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} />
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
