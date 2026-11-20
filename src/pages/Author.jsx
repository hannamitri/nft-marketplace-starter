import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";


const Author = () => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      
      try {
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`);
        setAuthor(response.data);
        console.log("author data:", response.data)
      } catch (error) {
        console.error("Error fetching author:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAuthor();
    }
  }, [id]);

  const handleFollowClick = (e) => {
    e.preventDefault();
    setIsFollowing((prev) => !prev);
  };
   
  const handleCopyWallet = () => {
    if (!author?.address) return;
    navigator.clipboard.writeText(author.address)
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  const followerCount =
   (author?.followers || 0) + (isFollowing ? 1 : 0);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section id="profile_banner"
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
                      {loading ? (
                        <Skeleton width="150px"
                         height="150px" 
                         borderRadius="50%"
                          />
                      ) : (
                        <img
                        src={author?.authorImage}
                        alt={author?.authorName || "Author Name"}
                        />
                       )} 

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <Skeleton width="180px" height="24px" borderRadius="4px" />
                          ) : (
                            author?.authorName 
                          )}
                          <span className="profile_username">{loading ? (
                            <Skeleton width="120px" height="20px" borderRadius="4px" />
                          ) : (
                            `@${author?.tag}`
                          )}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {loading ? (
                              <Skeleton width="200px" height="20px" borderRadius="4px" />
                            ) : (
                              author?.address
                            )}
                          </span>
                          {!loading && author?.address && (
                          <button 
                          id="btn_copy"
                          title="Copy Text"
                          type="button" 
                          onClick={handleCopyWallet}
                          >
                            {copied ? "Copied" : "Copy"}
                          </button>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {loading ? (
                          <Skeleton width="90px" height="20px" borderRadius="4px"
                           />
                      ) : (
                        `${followerCount} followers`
                      )}
                      </div>
                      <Link
                        to="#"
                        className="btn-main"
                        onClick={handleFollowClick}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} loading={loading} />
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
