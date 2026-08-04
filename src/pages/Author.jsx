import React, { useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";

import axios from "axios";
import AuthorSkeleton from "../components/UI/AuthorSkeleton";

const Author = () => {
  const { id } = useParams();

  const [loading, setLoading] = React.useState(true);
  const [author, setAuthor] = React.useState(null);
  const [items, setItems] = React.useState([]);

const [followers, setFollowers] = React.useState(0);
const [isFollowing, setIsFollowing] = React.useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const authorResponse = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );

setAuthor(authorResponse.data);
setItems(authorResponse.data.nftCollection);
setFollowers(authorResponse.data.followers);

      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    if (id) {
      fetchItems();
    }
  }, [id]);

  if (loading || !author) {
    return <AuthorSkeleton />;
  }

  const itemsWithAuthorImage = items.map(item => ({
  ...item,
  authorImage: author.authorImage,
}));

function handleFollow() {
  if (isFollowing) {
    setFollowers((prev) => prev - 1);
  } else {
    setFollowers((prev) => prev + 1);
  }

  setIsFollowing((prev) => !prev);
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
                <div className="d_profile de-flex" data-aos="fade-in">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt={author.authorName} />

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
                      <div className="profile_follower">{followers} followers</div>
                      <button onClick={handleFollow} className="btn-main">
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div data-aos="fade-up" className="col-md-12">
                <div className="de_tab tab_simple">
                 <AuthorItems items={itemsWithAuthorImage} />
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
