import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import SkeletonCard from "../components/UI/SkeletonCard";
import SkeletonAuthor from "../components/SkeletonAuthor";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowers((prev) => prev - 1);
    } else {
      setFollowers((prev) => prev + 1);
    }
    setIsFollowing((prev) => !prev)
  };
   
useEffect(() => {
    async function fetchAuthor() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/authors?author=${authorId}`);
           console.log("Fetched author data:", data);
        setAuthor(data);
        setFollowers(data.followers);
        
      
      } catch (err) {
        console.error("Error fetching author:", err);
      } finally {
        setIsLoading(false);
      }

  
    }
    fetchAuthor();
  }, [authorId]);


     if (isLoading) {
    return (
      <div id="wrapper">
        <SkeletonAuthor />
        <div className="container">
          <div className="row">
            {Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <SkeletonCard />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

     if (!author) return <p>Loading author details...</p>;


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
                          <button id="btn_copy" title="Copy Text"
                          onClick={() => navigator.clipboard.writeText(author.address)}>
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followers} followers</div>
                      <Link to="#" className="btn-main" 
                      onClick={(event) => {
                        event.preventDefault();
                        handleFollowToggle();
                      }}
                    >
                        {isFollowing ? "Unfollow" : "Follow"}  
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems nftCollection={author.nftCollection} author={author} isLoading={!author} />
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
