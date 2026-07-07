import React, { useState, useEffect} from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorSkeleton from "../components/UI/AuthorSkeleton";

const Author = () => {
  const{ id } = useParams()
  const [author, setAuthor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(true)
  const [followers, setFollowers] = useState(0)

  useEffect(() => {
  async function fetchAuthor() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)

    setAuthor(data)
    setFollowers(data.followers)
    setLoading(false)
  }

   
      fetchAuthor();
    }, [id]);

    function toggleFollow() {
  if (isFollowing) {
    setFollowers((prev) => prev - 1);
  } else {
    setFollowers((prev) => prev + 1);
  }

  setIsFollowing(!isFollowing);
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
          {loading ? (
            <AuthorSkeleton />
          ) : (
            <>
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
                <div className="de-flex-col">
                  <div className="profile_follower">
                    {followers} followers
                  </div>
                  <button onClick={toggleFollow} className="btn-main">
                    {isFollowing ? "unfollow" : "Follow"}
                  </button>
                </div>
              </div>
            </>
          )}
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
