import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { id } = useParams();

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      )
      .then((response) => {
        console.log("FULL AUTHOR API:", response.data);
        setAuthor(response.data);
         setFollowerCount(Number(response.data.followers) || 0);
      })
      .catch((error) => {
        console.error("Author API error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
const handleFollow = () => {
  if (following) {
    setFollowerCount((count) => Math.max(0, count - 1));
    setFollowing(false);
  } else {
    setFollowerCount((count) => count + 1);
    setFollowing(true);
  }
};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!author) {
    return <div>Author not found.</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
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

                          <span
                            id="wallet"
                            className="profile_wallet"
                          >
                            {author.address}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                     <div className="profile_follower">
  {followerCount} followers
</div>

                      <button
                        type="button"
                        className="btn-main"
                        onClick={handleFollow}
                      >
                        {following ? "Following" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    authorId={id}
                    items={author.nftCollection || author.items || author.nfts || []}
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