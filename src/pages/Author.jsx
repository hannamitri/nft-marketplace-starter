import React, {useState, useEffect} from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import SkeletonAuthorpage from "../components/UI/SkeletonAuthorpage";

const Author = () => {

  const { id } = useParams()
  const baseUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`

  const [author, setAuthor] = useState({})
  const [loading, setLoading] = useState(true)
  const [followers, setFollowers] = useState(author.followers)
  const [followBtnText, setFollowBtnText] = useState("Follow")

  async function getAuthorbyId() {
    const { data } = await axios.get(`${baseUrl}`)
    setAuthor(data)
    setLoading(false)
  }

  function followAuthor() {
    if (followers === author.followers + 1){
      setFollowers(author.followers)
      setFollowBtnText("Follow")
    } else {
      setFollowers(author.followers + 1)
      setFollowBtnText("Unfollow")
      }
  }

  useEffect(() => {
    getAuthorbyId()
  })

  const {nftCollection} = author

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
              {loading ? (
              <SkeletonAuthorpage />
              ) : ( 
                <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">{author.tag}</span>
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

                    { loading ? (
                      ""
                    ) : (
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          { followers ? followers : author.followers} followers
                       </div>
                      <Link to="#" className="btn-main" onClick={followAuthor}>
                        {followBtnText}
                      </Link>
                    </div>
                    )}
                  </div>
                </div>
              </div>
              )
              }
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems 
                  author={author}
                  nftCollection={nftCollection}
                  loading={loading}
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
