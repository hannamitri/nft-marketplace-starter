import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import { Link, useSearchParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import EthImage from "../images/ethereum.svg";

const Author = () => {
  const [searchParams] = useSearchParams();
  const authorId = searchParams.get("author") || "83937449";

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchAuthor() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        const data = await res.json();
        setAuthor(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAuthor();
  }, [authorId]);

  const handleCopy = () => {
    if (author?.address) {
      navigator.clipboard.writeText(author.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
                      {loading ? (
                        <Skeleton width="150px" height="150px" borderRadius="50%" />
                      ) : (
                        <img src={author?.authorImage} alt={author?.authorName} />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <Skeleton width="160px" height="24px" borderRadius="4px" />
                          ) : (
                            author?.authorName
                          )}
                          <span className="profile_username">
                            {loading ? "" : `@${author?.tag}`}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {loading ? (
                              <Skeleton width="300px" height="16px" borderRadius="4px" />
                            ) : (
                              author?.address
                            )}
                          </span>
                          <button id="btn_copy" title="Copy Text" onClick={handleCopy}>
                            {copied ? "Copied!" : "Copy"}
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {loading ? (
                          <Skeleton width="80px" height="16px" borderRadius="4px" />
                        ) : (
                          `${author?.followers} followers`
                        )}
                      </div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <div className="de_tab_content">
                    <div className="tab-1">
                      <div className="row">
                        {loading
                          ? new Array(8).fill(0).map((_, i) => (
                              <div
                                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                key={i}
                              >
                                <div className="nft__item">
                                  <div className="nft__item_wrap">
                                    <Skeleton
                                      width="100%"
                                      height="200px"
                                      borderRadius="10px"
                                    />
                                  </div>
                                  <div className="nft__item_info">
                                    <Skeleton
                                      width="120px"
                                      height="20px"
                                      borderRadius="4px"
                                    />
                                    <br />
                                    <Skeleton
                                      width="80px"
                                      height="16px"
                                      borderRadius="4px"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))
                          : author?.nftCollection?.map((nft) => (
                              <div
                                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                key={nft.id}
                                data-aos="fade-up"
                              >
                                <div className="nft__item">
                                  <div className="nft__item_wrap">
                                    <div className="nft__item_extra">
                                      <div className="nft__item_buttons">
                                        <button>Buy Now</button>
                                        <div className="nft__item_share">
                                          <h4>Share</h4>
                                          <a href=" " target="_blank" rel="noreferrer">
                                            <i className="fa fa-facebook fa-lg"></i>
                                          </a>
                                          <a href=" " target="_blank" rel="noreferrer">
                                            <i className="fa fa-twitter fa-lg"></i>
                                          </a>
                                          <a href=" ">
                                            <i className="fa fa-envelope fa-lg"></i>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <Link to={`/item-details?nftId=${nft.nftId}`}>
                                      <img
                                        src={nft.nftImage}
                                        className="lazy nft__item_preview"
                                        alt={nft.title}
                                      />
                                    </Link>
                                  </div>
                                  <div className="nft__item_info">
                                    <Link to={`/item-details?nftId=${nft.nftId}`}>
                                      <h4>{nft.title}</h4>
                                    </Link>
                                    <div className="nft__item_price">
                                      <img src={EthImage} alt="" style={{ width: 16, marginRight: 4 }} />
                                      {nft.price} ETH
                                    </div>
                                    <div className="nft__item_like">
                                      <i className="fa fa-heart"></i>
                                      <span>{nft.likes}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                      </div>
                    </div>
                  </div>
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
