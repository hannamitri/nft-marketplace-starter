import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { fetchAuthor } from "../services/marketplace";
import {
  AuthorProfileSkeleton,
  NftGridSkeleton,
} from "../components/UI/LoadingSkeletons";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(Boolean(authorId));
  const [error, setError] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsFollowing(false);

    if (!authorId) {
      setAuthor(null);
      setError("");
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError("");
    setAuthor(null);

    fetchAuthor(authorId)
      .then((profile) => {
        if (isMounted) {
          setAuthor(profile);
          setError(profile ? "" : "This creator profile could not be found.");
          setLoading(false);
        }
      })
      .catch((fetchError) => {
        console.error("Unable to load creator profile:", fetchError);
        if (isMounted) {
          setError("This creator profile could not be loaded.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [authorId]);

  const profileName = author ? author.authorName : "Monica Lucas";
  const profileImage = author ? author.authorImage : AuthorImage;
  const profileTag = author ? author.tag : "monicaaaa";
  const profileAddress = author
    ? author.address
    : "UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7";
  const followerCount = Number(author ? author.followers : 573);
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(profileAddress);
    } catch (copyError) {
      console.error("Unable to copy creator address:", copyError);
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
                {loading && <AuthorProfileSkeleton />}
                {error && <p role="alert">{error}</p>}
                {!loading && !error && (!authorId || author) && (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={profileImage} alt={profileName} />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {profileName}
                            <span className="profile_username">
                              {`@${profileTag}`}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {profileAddress}
                            </span>
                            <button
                              id="btn_copy"
                              type="button"
                              title="Copy wallet address"
                              onClick={copyAddress}
                            >
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {`${followerCount + (isFollowing ? 1 : 0)} followers`}
                        </div>
                        <button
                          type="button"
                          className="btn-main"
                          onClick={() => setIsFollowing((following) => !following)}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {loading && (
                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <div className="tab-1">
                        <NftGridSkeleton count={8} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!loading && !error && (!authorId || author) && (
                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems
                      items={author ? author.nftCollection : undefined}
                      author={author}
                    />
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
