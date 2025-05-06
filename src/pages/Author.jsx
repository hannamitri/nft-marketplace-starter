import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AuthorItems from "../components/author/AuthorItems";
import SkeletonAuthor from "../components/SkeletonAuthor";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Author ID from URL', authorId)
    axios
    .get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
    .then ((res) => {
      setAuthor(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching author data', err);
      setLoading(false);
    });
  }, [authorId]);

  if (loading) return <SkeletonAuthor />;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ 
            background: 'url(https://nft-place.web.app/static/media/static-1.0299eed903ee71c8c953.jpg)', 
            backgroundPosition: 'top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
           }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {author?.authorImage && (
                        <img src={author.authorImage} alt={author.authorName} />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">@{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.wallet}
                          </span>
                          <button 
                            id="btn_copy" 
                            title="Copy Text" 
                            onClick={() => navigator.clipboard.writeText(author.wallet)}
                          >
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

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems nftCollection={author.nftCollection} authorImage={author.authorImage} />
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
