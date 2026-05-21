import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import AuthorBanner from "../images/author_banner.jpg"
// import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthor(data);
        setIsFollowing(false);
      } catch (error) {
        console.error("Error fetching author:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAuthorData();
    }
  }, [id]);

const handleFollowClick = () => {
  setIsFollowing((prev) => !prev);
};

if (loading || !author) {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
            <section
              id="profile_banner"
              aria-label="section"
              className="text-light"
              style={{ backgroud: `url(${AuthorBanner}) top`, height: "300px" }}
            ></section>
             
            
            <section aria-label="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton width="150px" height="150px" borderRadius="50%" />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <Skeleton width="200px" height="30px" />
                              <span className="profile_username">
                                <Skeleton width="150px" height="20px" />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton width="250px" height="16px" />
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex-col">
                          <Skeleton width="120px" height="40px" borderRadius="4px" />
                         </div>
                         </div>
                         </div>
                         <div className="col-md-12">
                          <div className="row">
                            {new Array(4).fill(0).map((_, index) => (
                              <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                <div className="nft__item">
                                  <Skeleton width="100%" height="250px" borderRadius="8px" />
                                  <div className="nft__item_info">
                                  <Skeleton width="120px" height="20px" />
                                  <Skeleton width="60px" height="15px" />
                                  </div>
                                  </div>
                                  </div>
                            ))}
                          </div>
                         </div>
                         </div>
                         </div>
                         </section>
                         </div>
                         </div>
                          )
                        }

                        const finalFollowerCount = isFollowing ? author.followers + 1 : author.followers;

                        return (
                          <div id="wrapper">
                            <div className="no-bottom no-top" id="content">
                              <div id="top">

                                <section id="profile_banner"
                                aria-label="section"
                                className="text-light"
                                style={{ backgroud: `url(${AuthorBanner})top` }}
                                ></section>

                                <section aria-label="section">
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="d_profile de-flex">
                                          <div className="profile_avatar">
                                            <img className="lazy" src={author.authorImage} alt={author.authorName} />
                                            <i className="fa fa-check"></i>
                                            <div className="profile_name">
                                              <h4>
                                                {author.authorName}
                                                <span className="profile_username">@{author.tag}</span>
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

                                        <div className="profile_follow de-flex-col">
                                          <div className="profile_followers">
                                            {finalFollowersCount} followers
                                          </div>
                                          <button onClick={handleFollowClick} className="btn-main">
                                            {isFollowing ? "unfollow" : "Follow"}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="row">
                                        {author.nftCollection && author.nftCollection.length > 0 ? (
                                          author.nftCollection.map((nft) => (
                                            <div key={nft.id || nft.nftId}
                                            className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                            >
                                              <div className="nft__item">
                                                <div className="author_list_pp">
                                                  <Link to={`/author/${author.authorId}`}>
                                                  <img className="lazy"
                                                  src={author.authorImage}
                                                  alt=""
                                                  />
                                                  <i className="fa fa-check"></i>
                                                  </Link>
                                               </div>
                                               <div className="nft__item_wrap">
                                                <Link to={`/item-details/${nft.nftId}`}>
                                                <img 
                                                src={nft.nftImage}
                                                className="lazy nft__item_preview"
                                                alt=""
                                                />
                                                </Link>
                                               </div>
                                               <div className="nft__item_info">
                                                <Link to={`/item-details/${nft.nftId}`}>
                                                <h4>{nft.title}</h4>
                                                </Link>
                                                <div className="nft__item_price">
                                                  {nft.price} ETH
                                                </div>
                                                <div className="nft__item_like">
                                                  <i className="fa fa-heart"></i>
                                                  <span>{nft.likes}</span>
                                                </div>
                                               </div>
                                               </div>
                                               </div>
                                            ))
                                          ) : (  
                                            <div className="col-md-12 text-center">
                                              <p>No NFTs found for this author.</p>
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

                      export default Authors;
                