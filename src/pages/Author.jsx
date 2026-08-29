import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import AuthorSkeleton from "../components/author/AuthorSkeleton";
import NewItemCard from "../components/home/NewItemCard";

const Author = () => {
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [authorItems, setAuthorItems] = useState([]);
  const [loading, setLoading] = useState(Boolean(authorId));

  useEffect(() => {
    if (!authorId) return;

    setLoading(true);

    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors",
        {
          params: {
            author: authorId,
          },
        },
      )
      .then((response) => {
        setAuthor(response.data);
        setFollowerCount(response.data.followers);
        setIsFollowing(false);
        setAuthorItems(
          (response.data.nftCollection || []).map((item) => ({
            ...item,
            authorId: response.data.authorId,
            authorImage: response.data.authorImage,
          })),
        );
      })
      .catch((error) => {
        console.error("Unable to load author:", error);
        setAuthor(null);
        setAuthorItems([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authorId]);
  if (authorId && loading) {
    return <AuthorSkeleton />;
  }

  if (authorId && !author) {
    return (
      <div className="container mt90">
        <p>Author could not be found.</p>
      </div>
    );
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
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={author?.authorImage || AuthorImage}
                        alt={author?.authorName || "Monica Lucas"}
                      />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author?.authorName || "Monica Lucas"}
                          <span className="profile_username">
                            @{author?.tag || "monicaaaa"}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {author?.address ||
                              "UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7"}
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
                        {`${followerCount} followers`}
                      </div>
                      <button
                        className="btn-main"
                        onClick={() => {
                          setFollowerCount(
                            (count) => count + (isFollowing ? -1 : 1),
                          );
                          setIsFollowing((following) => !following);
                        }}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {authorId ? (
                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <div className="row">
                        {authorItems.length > 0 ? (
                          authorItems.map((item) => (
                            <div
                              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                              key={item.id}
                            >
                              <NewItemCard item={item} />
                            </div>
                          ))
                        ) : (
                          <div className="col-md-12">
                            <p>No items were found for this author.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
