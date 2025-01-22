import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const { authorId } = useParams();
  const [author, setAuthor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
        setTimeout(() => {
          setAuthor(res.data)
          setIsLoading(false)
        }, 1000);
      }
      catch (error) {
        console.log("Error.", error)
        setIsLoading(false);
      }
    };

    fetchData();

  }, [authorId]);

  const handleFollowers = () => {
    if (isFollowing) {
      setIsFollowing(false)
      setAuthor((prevFollowers) => ({
      ...prevFollowers,
      followers: prevFollowers.followers - 1,
    }));
    }
    else {
      setIsFollowing(true)
      setAuthor((prevFollowers) => ({
        ...prevFollowers,
        followers: prevFollowers.followers + 1,
      }));
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
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      { isLoading ? (
                        <Skeleton width="150px" height="150px" borderRadius="50%" />
                      ) : (
                        <img src={author.authorImage} alt="" />
                      )}
                      <i className="fa fa-check"></i>
                      
                      <div className="profile_name">
                        <h4>
                          { isLoading ? (
                            <Skeleton width="150px" height="20px" borderRadius="2px" />
                          ) : (
                            <>{author.authorName}</>
                          )}
                          { isLoading ? (
                            null
                          ) : (
                            <span className="profile_username">@{author.tag}</span>
                          )}
                          { isLoading ? (
                            null
                          ) : (
                            <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          )}
                          { isLoading ? (
                            null 
                          ) : (
                            <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      { isLoading ? (
                        null
                      ) : (
                        <div className="profile_follower">{author.followers} followers</div>
                      )}
                      
                      <Link onClick={handleFollowers} to="#" className="btn-main">
                        { isFollowing ?  "Unfollow" : "Follow"}
                      </Link>
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
