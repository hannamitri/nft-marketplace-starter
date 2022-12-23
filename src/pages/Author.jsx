import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NftCardAuthor from "../components/UI/NftCardAuthor";
import AuthorBanner from "../images/author_banner.jpg";
import axios from 'axios';

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAuthor();
  }, []);

  async function getAuthor() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthor(data);
    console.log(data);
    setLoaded(true);
  }
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
        {loaded &&
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
                        <Link to="#" className="btn-main">
                          Follow
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {
                  author.nftCollection.map(elem => (
                    <NftCardAuthor author={author} nftItem={elem} />
                  ))
                }
                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                  </div>
                </div>
              </div>
            </div>
          </section>
        }
      </div>
    </div>
  );
};

export default Author;
