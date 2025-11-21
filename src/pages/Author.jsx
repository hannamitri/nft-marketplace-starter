import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import AuthorItems from "../components/author/AuthorItems";
import AuthorBannerFallback from "../images/author_banner.jpg";
import AuthorImageFallback from "../images/author_thumbnail.jpg";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
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

        {/* Dynamic Banner */}
        <section
          id="profile_banner"
          className="text-light"
          data-aos="zoom-in"
          data-aos-delay="50"
          style={{
            background: `url(${
              author.nftCollection?.[0]?.nftImage || AuthorBannerFallback
            }) top`,
          }}
        ></section>

        {/* Author Info */}
        <section aria-label="section" data-aos="fade-up" data-aos-delay="200">
          <div className="container">
            <div className="row">

              <div className="col-md-12">

                {/* Profile Box */}
                <div
                  className="d_profile de-flex"
                  data-aos="fade-down"
                  data-aos-delay="300"
                >
                  <div className="de-flex-col">

                    {/* Avatar */}
                    <div
                      className="profile_avatar"
                      data-aos="zoom-in-up"
                      data-aos-delay="400"
                    >
                      <img
                        src={author.authorImage || AuthorImageFallback}
                        alt={author.authorName}
                      />
                      <i className="fa fa-check"></i>

                      {/* Profile Name */}
                      <div
                        className="profile_name"
                        data-aos="fade-left"
                        data-aos-delay="500"
                      >
                        <h4>
                          {author.authorName}
                          <span className="profile_username">@{author.tag}</span>

                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>

                          <button
                            id="btn_copy"
                            title="Copy Text"
                            onClick={() =>
                              navigator.clipboard.writeText(author.address)
                            }
                          >
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>

                  </div>

                  {/* Follow Section */}
                  <div
                    className="profile_follow de-flex"
                    data-aos="fade-left"
                    data-aos-delay="600"
                  >
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {author.followers} followers
                      </div>

                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Author NFTs */}
              <div
                className="col-md-12"
                data-aos="fade-up"
                data-aos-delay="700"
              >
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






