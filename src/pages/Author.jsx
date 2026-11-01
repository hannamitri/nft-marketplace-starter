import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../components/home/NewItems.css";

const Author = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState({
    address: "",
    authorId: "",
    authorImage: "",
    authorName: "",
    followers: 0,
    tag: "",
    id: 0,
    nftCollection: [],
  });
      
  const fetchItems = async () => {
      
      window.scrollTo(0, 0);

      setLoading(true);

      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`,
      );

      const {
        address,
        authorId,
        authorImage,
        authorName,
        followers,
        tag,
        nftCollection,
      } = data;

      setAuthor({
        address,
        authorId,
        authorImage,
        authorName,
        followers,
        tag,
        nftCollection,
      });
    };

  useEffect(() => {

  let timer;

  fetchItems();

  timer = setTimeout(() => {
    setLoading(false);
  }, 2000);

  return () => clearTimeout(timer);
}, [id]);

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
                {loading ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                       <div className="profile_avatar author__skeleton"></div>
                       <div className="profile_check author__skeleton"></div>
                       </div>
                        <div className="profile_name">
                          <h4>
                            <span className="profile_username"></span>
                            <span id="wallet" className="profile_wallet">
                            </span>
                            <button className= "author__skeleton copy__skeleton" id="btn_copy" title="Copy Text"></button>
                          </h4>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower"></div>
                        <Link to="#" className="btn-main copy__skeleton"></Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
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
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
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
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={author.nftCollection} 
                    loading={loading} 
                    authorImage={author.authorImage} 
                    authorId={id} 
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