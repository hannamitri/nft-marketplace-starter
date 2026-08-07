import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";

const Author = () => {
  const { id } = useParams();
  const [authorProfile, setAuthorProfile] = useState(null);
  const [authorCollection, setAuthorCollection] = useState([]);
  const [loading, setLoading] = useState(Boolean(id));
  const [baseFollowers, setBaseFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  const buildProfileUsername = (name) => {
    const normalizedName = String(name || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");

    return normalizedName ? `@${normalizedName}` : "@author";
  };

  const parseFollowersCount = (followersValue) => {
    const asNumber = Number(followersValue);
    if (Number.isFinite(asNumber) && asNumber >= 0) {
      return Math.floor(asNumber);
    }

    const matched = String(followersValue ?? "").match(/\d+/);
    return matched ? Number(matched[0]) : 0;
  };

  useEffect(() => {
    if (!id) {
      setAuthorProfile(null);
      setAuthorCollection([]);
      setBaseFollowers(0);
      setIsFollowing(false);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const fetchAuthor = async () => {
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        const author = Array.isArray(data) ? data[0] : data;
        const parsedFollowers = parseFollowersCount(author?.followers);

        setAuthorProfile(
          response.ok
            ? {
                id,
                name: author?.authorName || author?.author || author?.name || "Unknown Author",
                username: buildProfileUsername(
                  author?.authorName || author?.author || author?.name || "Unknown Author"
                ),
                wallet: author?.wallet || author?.address || "No wallet linked",
                authorImage: author?.authorImage || "",
              }
            : {
                id,
                name: "Unknown Author",
                username: "@author",
                wallet: "No wallet linked",
                authorImage: "",
              }
        );

        setBaseFollowers(response.ok ? parsedFollowers : 0);
        setIsFollowing(false);

        setAuthorCollection(
          response.ok && Array.isArray(author?.nftCollection) ? author.nftCollection : []
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          setAuthorProfile(null);
          setAuthorCollection([]);
          setBaseFollowers(0);
          setIsFollowing(false);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchAuthor();

    return () => controller.abort();
  }, [id]);

  const displayedFollowers = Math.max(baseFollowers + (isFollowing ? 1 : 0), 0);

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
                      <img src={authorProfile?.authorImage || AuthorImage} alt={authorProfile?.name || "Author"} />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? "Loading author..." : authorProfile?.name || "Unknown Author"}
                          <span className="profile_username">{authorProfile?.username || "@unknown"}</span>
                          <span id="wallet" className="profile_wallet">
                            {authorProfile?.wallet || "No wallet linked"}
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
                      <div className="profile_follower">{displayedFollowers} followers</div>
                      <button className="btn-main" type="button" onClick={() => setIsFollowing((prev) => !prev)}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    authorId={id}
                    authorCollection={authorCollection}
                    authorImage={authorProfile?.authorImage}
                    authorName={authorProfile?.name}
                    loading={loading}
                  />
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
