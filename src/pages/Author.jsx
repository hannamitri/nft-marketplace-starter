import React, {useEffect, useState} from "react";
import axios from "axios"
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link,useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";

const Author = () => {
  const { authorId } = useParams()
  const [author, setAuthor] = useState({})
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    window.scrollTo(0,0)

    const fetchAuthor = async () => {
      try {
        const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
        setAuthor(data)
      } catch (error) {
        console.error("Failed to fetch author data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAuthor()
  }, [authorId])


  const toggleFollow = () => {
    setIsFollowing((prev) => !prev)
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      followers: prevAuthor.followers + (isFollowing ? -1 : 1),
    }))
  }

  const copyAddress = () => {
    if (!author?.address) return
    navigator.clipboard.writeText(author.address)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000);
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
                          <span className="profile_username">@{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button
                            id="btn_copy"
                            className="btn btn-sm btn-outline-secondary ms-2"
                            title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{author.followers} followers</div>
                      <button className="btn-main" onClick={toggleFollow}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} />
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