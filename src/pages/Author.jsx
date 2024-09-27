import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const { id } = useParams();
  const URL = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`;
  const [author, setAuthor] = useState([]);
  const [img, setImg] = useState();
  const [nft, setNft] = useState([]);
  const [follow, setFollow] = useState(false);
  const [noFollowers, setNoFollowers] = useState(author.followers);

  async function fetchAuthors() {
    setImg(false);
    const { data } = await axios.get(URL);
    setAuthor(data);
    setImg(true);
    setNft(data.nftCollection);
  }

  useEffect(() => {
    fetchAuthors();
  }, []);

  function followers() {
    if (follow === false) {
      setNoFollowers(author.followers + 1);
      setFollow(true);
    } else {
      setNoFollowers(author.followers + 1 - 1);
      setFollow(false);
    }
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
                        {noFollowers || author.followers} followers
                      </div>
                      <Link to="#" className="btn-main" onClick={followers}>
                        {!follow ? "Follow" : "Following"}
                      </Link>{" "}
                      :
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems nft={nft} author={author} img={img} />
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
