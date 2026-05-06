import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useLocation, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import "../css/styles/author.css";

const Author = () => {
  const location = useLocation();
  const authorFromState = location.state?.author;
  const { authorId } = useParams();
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followerCount, setFollowerCount] = useState();

  const increaseFollowers = () => {
    setAuthor((prev) => ({
      ...prev,
      followers: prev.followers + 1,
    }))
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    const getAuthor = async () => {
      try {
        const fetchAuthor = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
        );
        setAuthor(fetchAuthor.data);
        console.log(fetchAuthor.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getAuthor();
  }, [authorId]);

  return (
    <div id="wrapper">
      {loading ? (
        <div className="no-bottom no-top" id="content" key={author.id}>
          <div id="top"></div>
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light skeleton"
            data-bgimage="url(images/author_banner.jpg) top"
            style={{
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></section>

          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div className="profile__img--loading skeleton"></div>
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <div className="author__name author__name--loading skeleton"></div>
                            <span className="profile_username profile_username--loading skeleton"></span>
                            <span
                              id="wallet"
                              className="profile_wallet profile_wallet--loading skeleton"
                            ></span>
                            <button
                              id="btn_copy"
                              className="btn__copy--loading skeleton"
                              title="Copy Text"
                            ></button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower profile_follower--loading skeleton"></div>
                        <Link to="#" className="btn-main">
                          Follow
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems loading={loading} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        author && (
          <div className="no-bottom no-top" id="content" key={author.id}>
            <div id="top"></div>
            <section
              id="profile_banner"
              aria-label="section"
              className="text-light"
              data-bgimage="url(images/author_banner.jpg) top"
              style={{
                background: `url(${author.nftCollection?.[0]?.nftImage}) top`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></section>

            <section aria-label="section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={author.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author.authorName}
                              <span className="profile_username">
                                {author.tag}
                              </span>
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
                          <div className="profile_follower">
                            {author.followers}
                          </div>
                          <button
                            to="#"
                            className="btn-main"
                            onClick={increaseFollowers}
                          >
                            Follow
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems
                        authorProfile={author.authorImage}
                        nftCollection={author.nftCollection}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )
      )}
    </div>
  );
};

export default Author;
