import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import { Link, useLocation, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const location = useLocation();

  const authorId = id || location.state?.authorId || null;

  const [authorData, setAuthorData] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        if (!authorId) {
          setLoading(false);
          return;
        }

        setLoading(true);

        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        const data = await res.json();

        setAuthorData(data);
        setNfts(data?.nftCollection || []);
        setFollowers(data?.followers || 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [authorId]);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowers((prev) => prev - 1);
      setIsFollowing(false);
    } else {
      setFollowers((prev) => prev + 1);
      setIsFollowing(true);
    }
  };

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section
            id="profile_banner"
            className="text-light"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>

          <section>
            <div className="container">
              <div className="row">
                {new Array(4).fill(0).map((_, i) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
                    <Skeleton />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!authorId || !authorData) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <section
            id="profile_banner"
            className="text-light"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>

          <section>
            <div className="container">
              <h3>Author not found</h3>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section
          id="profile_banner"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={authorData.authorImage}
                        alt={authorData.authorName}
                      />
                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">
                            @{authorData.tag}
                          </span>

                          <span className="profile_wallet">
                            {authorData.address}
                          </span>

                          <button>Copy</button>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {followers} followers
                      </div>
                      <button className="btn-main" onClick={handleFollowToggle}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="row">
                  {nfts.map((nft, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={nft.nftId || nft.id || index}
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link to={`/author/${authorId}`}>
                            <img
                              className="lazy"
                              src={authorData.authorImage}
                              alt={authorData.authorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="nft__item_wrap">
                          <Link to={`/item-details/${nft.nftId}`}>
                            <img
                              src={nft.nftImage}
                              className="lazy nft__item_preview"
                              alt={nft.title}
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
                  ))}
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