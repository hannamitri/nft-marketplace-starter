import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import "../css/styles/HotCollection.css";
//import authorBanner from "../images/author_banner.jpg"; vercel issue workaround//


const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchAuthor = async () => {
      if (!authorId) {
        setIsLoading(false);
        return;
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );

        if (isMounted) {
          setAuthor(response.data);
        }
      } catch (error) {
        console.error("Error fetching author details:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAuthor();

    return () => {
      isMounted = false;
    };
  }, [authorId]);

 const handleFollowClick = () => {
    if (isFollowing) {
        setAuthor((prevAuthor) => ({
            ...prevAuthor,
            followers: (prevAuthor.followers || 1) - 1, 
        }));
        setIsFollowing(false);
    } else {
        setAuthor((prevAuthor) => ({
            ...prevAuthor,
            followers: (prevAuthor.followers || 0) + 1,
        }));
        setIsFollowing(true);
    }
};
     

const AuthorSkeleton = (
    <div className="d_profile de-flex">
      <div className="de-flex align-items-center">
        <div className="profile_avatar">
          <Skeleton width="100px" height="100px" borderRadius="50%" />
        </div>

        <div className="profile_info_column" style={{ marginLeft: "10px" }}>
          <Skeleton
            width="150px"
            height="24px"
            borderRadius="3px"
            style={{ marginBottom: "8px" }}
          />
          <div className="wallet_row" style={{ marginBottom: "8px" }}>
            <Skeleton width="300px" height="16px" borderRadius="3px" />
          </div>
          <Skeleton width="100px" height="16px" borderRadius="3px" />
        </div>
      </div>

      <div className="profile_follow de-flex">
        <div className="de-flex-col">
          <Skeleton
            width="100px"
            height="16px"
            borderRadius="3px"
            style={{ marginBottom: "8px" }}
          />
          <Skeleton width="80px" height="36px" borderRadius="3px" />
        </div>
      </div>
    </div>
  );

  const fallbackAuthorImage =
    "https://placehold.co/100x100/cccccc/333333?text=Author";

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{
            backgroundImage: `url(/images/author_banner.jpg`,
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {isLoading ? (
                  AuthorSkeleton
                ) : (
                 <div className="d_profile de-flex">
  
  <div className="de-flex align-items-center">
    <div className="profile_avatar">
      <img
        src={author.authorImage || fallbackAuthorImage}
        alt={author.authorName?.trim() || "Author"}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackAuthorImage;
        }}
      />
      <i className="fa fa-check"></i>
    </div>

    <div className="profile_info_column" style={{marginLeft: "10px"}}>
      <h4 className="author_name">{author.authorName}</h4>
      <div className="wallet_row">
        <span className="profile_wallet">
          {author.address || "Wallet address unavailable"}
        </span>
        <button
          id="btn_copy"
          className="copy_btn"
          title="Copy wallet address"
          onClick={() =>
            navigator.clipboard.writeText(author.address || "")
          }
        >
          Copy
        </button>
      </div>

      <div className="author_tag">@{author.tag || "unknown"}</div>
    </div>
  </div>
  <div className="profile_follow de-flex">
    <div className="de-flex-col">
      <div className="profile_follower">
        {author.followers || 0} followers
      </div>
      <Link to="#" className="btn-main" onClick={handleFollowClick}>
      {isFollowing ? "Following"  : "Follow"}
      </Link>
    </div>
  </div>
</div>
 
                  
                 
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {!isLoading && (
                    <AuthorItems authorId={authorId} authorData={author} />
                  )}
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
