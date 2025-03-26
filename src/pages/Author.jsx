import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const Author = ({nftCollection}) => {
  const { id } = useParams();
  const [read, setRead] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alter, setAlter] = useState(0);
  const [followed, setFollowed]= useState(false)


  useEffect(() => {
    async function fetchAuthor() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        setRead(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {setLoading(false)}
    }
    fetchAuthor();
  }, [id]);
  const handleChange = () => {
  setFollowed((prevfollowed) => !prevfollowed)
  setAlter((prevFollower) => (followed ? prevFollower -1 : prevFollower + 1));

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
          >
          {loading && <Skeleton height={200} />}
        </section>
        
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                    {loading ? (
                        <Skeleton
                          circle
                          height={120}
                          width={120}
                          style={{ marginBottom: "10px" }}
                        />
                      ) :                    
                        
                        <img src={read?.authorImage} alt="" />

                      }

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                        {loading ? (
                            <Skeleton width={120} />
                          ) : 
                          read?.authorName
                          }
                          <span className="profile_username">
                          {loading ? (
                              <Skeleton width={80} />
                            ) : 
                              read?.tag
                            }
                          </span>
                          <span id="wallet" className="profile_wallet">
                          {loading ? (
                              <Skeleton width={170} />
                            ) : 
                              read?.address
                            }
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
                      {loading ? <Skeleton width={80} /> : read?.followers + alter}
                     
                      </div>
                      <Link to="#" className="btn-main" onClick={handleChange}>
                      {followed ? 'Unfollow' : 'Follow'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems nftCollection={read.nftCollection} />
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