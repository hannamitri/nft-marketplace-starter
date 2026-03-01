import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImageFallback from "../images/author_thumbnail.jpg";

const Author = () => {
  const { authorId } = useParams();

  const [authorName, setAuthorName] = useState("Author");
  const [authorUsername, setAuthorUsername] = useState("@author");
  const [authorImage, setAuthorImage] = useState(AuthorImageFallback);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!authorId) return;

    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

        const found = data.find(
          (s) => String(s?.authorId) === String(authorId)
        );

        if (!found) return;

        const name = found?.authorName || "Author";
        const img = found?.authorImage || AuthorImageFallback;

        setAuthorName(name);
        setAuthorImage(img);

        setAuthorUsername(
          found?.authorUsername ||
            `@${String(name).toLowerCase().replace(/\s+/g, "")}`
        );
      })
      .catch((err) => console.error("author header error:", err));
  }, [authorId]);

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
                      <img src={authorImage} alt="" />
                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {authorName}
                          <span className="profile_username">
                            {authorUsername}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">0 followers</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
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