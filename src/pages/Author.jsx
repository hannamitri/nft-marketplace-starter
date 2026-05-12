import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authorId }  = useParams();

  useEffect(() => {
    window.scrollTo(0, 0); 

    axios
      .get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems?authorId=${authorId}`)
      .then((response) => {
        setAuthor(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [authorId]);

  if(!author && !loading){
    return <div className="text-center mt-90">Author not found</div>; 
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                      <Skeleton width={100} height={100} borderRadius={50} />
                      ) : (
                        <>
                        <img src={author?.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            Monica Lucas
                            <span className="profile_username">@monicaaaa</span>
                            <span id="wallet" className="profile_wallet">
                              UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7
                            </span>  
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                        </>
                      )}
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
