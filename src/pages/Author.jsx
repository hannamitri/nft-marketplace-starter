import React, { useEffect, useMemo, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import { findAuthorById, getItemsForAuthor } from "../data/marketplaceData";
import { fetchAuthorProfile } from "../data/marketplaceApi";

const Author = () => {
  const { authorId } = useParams();
  const fallbackAuthor = findAuthorById(authorId);
  const [authorProfile, setAuthorProfile] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadAuthorData = async () => {
      try {
        const loadedProfile = await fetchAuthorProfile(authorId);
        if (isMounted) {
          setAuthorProfile(loadedProfile);
        }
      } catch (error) {
        if (isMounted) {
          setAuthorProfile(null);
        }
      }
    };

    loadAuthorData();

    return () => {
      isMounted = false;
    };
  }, [authorId]);

  const author = authorProfile
    ? {
        ...fallbackAuthor,
        ...authorProfile,
      }
    : fallbackAuthor;

  const authorItems = useMemo(() => {
    if (Array.isArray(authorProfile?.nftCollection) && authorProfile.nftCollection.length > 0) {
      return authorProfile.nftCollection;
    }

    return getItemsForAuthor(author.id);
  }, [author.id, authorProfile]);

  const profileImage = authorProfile?.image || authorItems[0]?.authorImage || author.image;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(author.wallet);
    } catch (error) {
      // No-op: keep behavior aligned with production UI.
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
                      <img src={profileImage} alt={author.name} />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.name}
                          <span className="profile_username">{author.username}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.wallet}
                          </span>
                          <button id="btn_copy" title="Copy Text" type="button" onClick={handleCopy}>
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{author.followers} followers</div>
                      <Link to={`/author/${author.id}`} className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={authorItems} />
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
