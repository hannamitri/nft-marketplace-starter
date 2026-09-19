import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../images/author_banner.jpg";

const Author = () => {
  const { id } = useParams();

  const [author, setAuthor] = useState(null);
  const [authorItems, setAuthorItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchAuthor() {
    try {
      const response = await fetch(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?authorId=${id}`
      );

      const data = await response.json();

      const {
        address,
        authorID,
        authorImage,
        authorName,
        followers,
        tag,
        nftCollection,
      } = data;

      setAuthor({
        address,
        authorID,
        authorImage,
        authorName,
        followers,
        tag,
      });

      setAuthorItems(nftCollection);
    } catch (err) {
      console.log("Error fetching author:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAuthor();
  }, [id]);

  if (error)
    return (
      <div className="container text-center author-error">
        <h2>Author profile not found.</h2>
        <p>Target Author ID: {id}</p>
        <Link to="/" className="btn-main">Back to Home</Link>
      </div>
    );

  if (loading || !author)
    return (
      <div className="container text-center">
        <h2>Loading author...</h2>
      </div>
    );

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">

        <section
          id="profile_banner"
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
                      <img src={author.authorImage} alt={author.authorName} />
                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">@{author.address}</span>
                          <span id="wallet" className="profile_wallet">{author.address}</span>
                          <button id="btn_copy" title="Copy Text">Copy</button>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{author.followers} followers</div>
                      <Link to="#" className="btn-main">Follow</Link>
                    </div>
                  </div>

                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={authorItems} loading={loading} />
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





