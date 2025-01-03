import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import FollowUnfollowButton from "./FollowUnfollowButton";

const Author = (user) => {
  const [author, setAuthor] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        setAuthor(res.data);
        setLoading(false);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching author detail:", error);
        setLoading(false);
      }
    };
    fetchAuthor();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!author) {
    return <div>Author not found</div>;
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
                        <img src={AuthorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            Monica Lucas
                            <span className="profile_username">@monicaaaa</span>
                            <span id="wallet" className="profile_wallet">
                              UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7
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
                        <div className="profile_follower">573 followers</div>
                        <Link to="#" className="btn-main">
                          Follow
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
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

                    <FollowUnfollowButton 
                    initialFollowing={false} 
                    followers={author.followers}                    
                    />
                  </div>
                </div>
              )}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {author.nftCollection && author.nftCollection.length > 0 ? (
                    <div className="col-md-12">
                      <div className="de_tab tab_simple">
                        <AuthorItems
                          collection={author.nftCollection}
                          author={author}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="col-md-12">
                      <p>No NFTs in this author's collection.</p>
                    </div>
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
