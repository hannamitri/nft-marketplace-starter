import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";

const AUTHORS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setAuthor(null);
    if (!authorId) return undefined;
    const controller = new AbortController();
    axios
      .get(AUTHORS_URL, {
        params: { author: authorId },
        signal: controller.signal,
      })
      .then((res) => setAuthor(res.data?.data ?? res.data))
      .catch(() => {});
    return () => controller.abort();
  }, [authorId]);

  const name = author?.authorName ?? "Monica Lucas";
  const username = author?.tag ?? "@monicaaaa";
  const wallet =
    author?.address ?? "UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7";
  const followers = author?.followers ?? 573;
  const avatar = author?.authorImage ?? AuthorImage;

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
                      <img src={avatar} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {name}
                          <span className="profile_username">{username}</span>
                          <span id="wallet" className="profile_wallet">
                            {wallet}
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
                        {followers} followers
                      </div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={author?.nftCollection}
                    authorImage={avatar}
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
