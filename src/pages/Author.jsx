import React, { useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFollowing, setIsFollowing] = React.useState(false);
  async function fetchAuthor(authorId) {
    const response = await fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    const data = await response.json();
    setAuthor(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (id) {
      fetchAuthor(id);
      window.scrollTo(0, 0);
    }
  }, [id]);

  useEffect(() => {
    if (!isLoading) {
      AOS.refresh();
    }
  }, [isLoading]);

  const toggleFollow = () => {
    if (isFollowing) {
      setAuthor((prevAuthor) => ({
        ...prevAuthor,
        followers: prevAuthor.followers - 1,
      }));
    } else {
      setAuthor((prevAuthor) => ({
        ...prevAuthor,
        followers: prevAuthor.followers + 1,
      }));
    }
    setIsFollowing(!isFollowing);
  };

  if (isLoading) {
    return (
      <div data-aos="fade-up" id="wrapper">
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
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                        <div className="profile_name">
                          <h4>
                            <Skeleton width="200px" height="20px" />
                            <span className="profile_username">
                              <Skeleton width="100px" height="15px" />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width="250px" height="15px" />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width="100px" height="20px" />
                        </div>
                        <Skeleton width="100px" height="40px" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <Skeleton width="100%" height="300px" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div data-aos="fade-up" id="wrapper">
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
                        {author.followers} followers
                      </div>
                      <button onClick={toggleFollow} className="btn-main">
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={id} authorImage={author.authorImage} />
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