import React, { useEffect, useState } from "react";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState([])
  const [banner, setBanner] = useState()
  const [followers, setFollowers] = useState()
  const [following, setFollowing] = useState(false)

  async function fetchAuthor() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );

    setAuthor(data)
    setFollowers(data.followers)
    setBanner(data.nftCollection[Math.floor(Math.random() * data.nftCollection.length)].nftImage)
  }

  function copyAddress() {
    navigator.clipboard.writeText(author.address)

    document.getElementById("btn_copy").innerText = "Copied"
    setTimeout(() => {
      document.getElementById("btn_copy").innerText = "Copy"
    }, 1000)
  }

  function followAuthor() {
    if (following) {
      setFollowing(false)
      setFollowers(followers - 1)
      document.querySelector("#follow-btn").innerText = "Follow"
      return
    }
    setFollowing(true)
    setFollowers(followers + 1)
    document.querySelector("#follow-btn").innerText = "Unfollow"
  }

  useEffect(() => {
    fetchAuthor();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${banner}) top` }}
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
                          <span className="profile_username">@{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button onClick={copyAddress} id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followers} followers</div>
                      <button onClick={followAuthor} className="btn-main" id="follow-btn">
                        Follow
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={author.nftCollection} author={author} />
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
