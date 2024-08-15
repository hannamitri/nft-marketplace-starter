import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    fetchAuthorItems();
  }, [id]);

  async function fetchAuthorItems() {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      setAuthor(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleFollowersClick() {
    if (author.clicked) {
      setAuthor((prevState) => ({
        ...prevState,
        followers: prevState.followers - 1,
        clicked: false,
      }));
    } else {
      setAuthor((prevState) => ({
        ...prevState,
        followers: prevState.followers + 1,
        clicked: true,
      }));
    }
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
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading ? (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton height={150} width={150} borderRadius={100}/>
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton width={200} height={24}/>
                            <span className="profile_username"><Skeleton width={100} height={16}/></span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width={250} height={16}/> 
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        
                        <Skeleton height={40} width={150}/>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                author && (
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img
                            src={author.authorImage}
                            alt={author.authorName}
                          />
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
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={handleFollowersClick}
                          >
                            {author.clicked ? "Unfollow" : "Follow"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {author && (
                    <AuthorItems
                      data={author.nftCollection}
                      authorImage={author.authorImage}
                    />
                  )}
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