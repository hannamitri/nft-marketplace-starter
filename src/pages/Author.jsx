import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorImageFallback from "../images/author_thumbnail.jpg";

const Author = () => {
  const { authorId } = useParams(); // get authorId from URL
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        console.log(res.data); // check what API returns
        setAuthor(res.data);
      } catch (err) {
        console.error("Error fetching author:", err);
        setAuthor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
    window.scrollTo(0, 0);
  }, [authorId]);

  if (loading) return <div className="text-center mt-4">Loading author...</div>;
  if (!author) return <div className="text-center mt-4">Author not found.</div>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* Banner */}
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        {/* Author Info */}
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={author.authorImage || AuthorImageFallback}
                        alt={author.authorName}
                      />
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

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{author.followers} followers</div>
                      <a href="#" className="btn-main">Follow</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Author NFTs */}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems nftCollection={author.nftCollection} />
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




