import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileFollow from "../components/UI/ProfileFollow";
import Skeleton from "../components/UI/Skeleton";

const authorUrlAuthor =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);

  async function getAuthor(authorId) {
    setLoading(true);
    try {
      const url = authorUrlAuthor + authorId;
      const { data } = await axios.get(url);
      setAuthor(data);
    } catch (error) {
      console.error("Error fetching author:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      getAuthor(id);
    }
  }, [id]);

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
                      {!loading ? (
                        <img src={author.authorImage} alt="" />
                      ) : (
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        {!loading ? (
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
                        ) : (
                          <h4>
                            <Skeleton width="200px" />
                            <span className="profile_username">
                              <Skeleton width="100px" />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width="250px" />
                            </span>
                          </h4>
                        )}
                      </div>
                    </div>
                  </div>
                  <ProfileFollow followersCount={author.followers} />
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={author.nftCollection || []}
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
