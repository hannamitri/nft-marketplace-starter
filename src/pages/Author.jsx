import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/HotCollections.css"

const Author = () => {

  const [author, setAuthor] = useState([])
  const [loading, setLoading] = useState(true)
  const { authorId } = useParams()

  async function AuthorData() {
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems?authorId=${authorId}`)
    setAuthor(data)
    setLoading(false)
    console.log(data)
  }

  useEffect(() => {
    AuthorData()
  }, [])

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

              {
                author.map(info => (
                  new Array(1).slice(0,1).fill(0).map((_,index) => (
                    <div className="d_profile de-flex" key={index}>
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={info.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          Name
                          <span className="profile_username">@monicaaaa</span>
                          <span id="wallet" className="profile_wallet">
                            UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7
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
                      <div className="profile_follower">573 followers</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                </div>
                </div>
                  ))
                ))
              }

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
