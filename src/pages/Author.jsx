import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SkeletonAuthor, SkeletonExplore } from "../components/home/SkeletonCard";


const Author = () => {
  const [author, setAuthor] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [following, setFollowing] = React.useState(false);
  const { id } = useParams();


  React.useEffect(() => {
    getAuthor(id);
  }, [id]);

  React.useEffect(() => {
  }, [following]);

  async function getAuthor(authorId) {
    try {
      setLoading(true); 
      const res = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
      setAuthor(res.data);
      setLoading(false);
    } catch(err) {
      console.error(err);
    }
  }

  const changeFollower = () => {
    if (following) {
      author.followers--;
      setFollowing(false);
    }
    else {
      author.followers++;
      setFollowing(true);
    }
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
                {loading ? <SkeletonAuthor /> : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt=""/>

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
                        <button onClick={changeFollower} className="btn-main">
                          {following ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {loading && (
                new Array(8).fill(0).map((_, index) => (
                      <SkeletonExplore key={`skeleton-${index}`} />
                ))
              )}

              {(!loading && Object.keys(author).length !== 0) && <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authId={author.authorId} authImage={author.authorImage} nfts={author.nftCollection}/>
                </div>
              </div>}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
