import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import authorData from "../api/authorApi.json";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const targetAuthorId = authorId ? Number(authorId) : 1;
    const foundAuthor = authorData.find(author => author.id === targetAuthorId);
    
    if (foundAuthor) {
      setAuthor(foundAuthor);
      setFollowers(foundAuthor.followers || 0);
    } else {
      console.error(`Author with ID ${targetAuthorId} not found`);
    }
  }, [authorId]);

  const handleCopyAddress = () => {
    if (author && author.address) {
      navigator.clipboard.writeText(author.address)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => {
            setCopySuccess(false);
          }, 2000);
        })
        .catch((err) => {
          console.error('Failed to copy address: ', err);
          const textArea = document.createElement("textarea");
          textArea.value = author.address;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          setCopySuccess(true);
          setTimeout(() => {
            setCopySuccess(false);
          }, 2000);
        });
    }
  };

  const handleFollowToggle = () => {
    setIsFollowing(prev => !prev);
    setFollowers(prev => isFollowing ? prev - 1 : prev + 1);
  };

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
                      <img src={author?.authorImage || AuthorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author?.authorName || "Author"}
                          <span className="profile_username">@{author?.tag || "author"}</span>
                          <span id="wallet" className="profile_wallet">
                            {author?.address || ""}
                          </span>
                          <button 
                            id="btn_copy" 
                            title="Copy Address"
                            onClick={handleCopyAddress}
                            style={{
                              background: copySuccess ? "green" : "",
                              transition: "background-color 0.3s"
                            }}
                          >
                            {copySuccess ? "Copied!" : "Copy"}
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followers} followers</div>
                      <button 
                        className={`btn-main ${isFollowing ? 'btn-following' : ''}`} 
                        onClick={handleFollowToggle}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </button>
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
