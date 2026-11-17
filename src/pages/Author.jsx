import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthorItems from '../components/author/AuthorItems';
import Skeleton from '../components/UI/Skeleton';

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const fetchAuthorData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      setAuthorData(response.data);
    } catch (error) {
      console.error('Error fetching author data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthorData();
  }, [authorId]);

  return (
    <div id="wrapper" style={{ width: "100%", maxWidth: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="no-bottom no-top" id="content" style={{ width: "100%", flex: "1" }}>
        <div id="top"></div>

        {/* Profile Header Section */}
        <section 
          aria-label="section" 
          style={{ paddingTop: "120px", paddingBottom: "80px", width: "100%", maxWidth: "100%" }}
        >
          <div className="container-fluid px-5" style={{ width: "100%", maxWidth: "100%" }}>
            <div className="row">
              {loading ? (
                <div className="col-md-12">
                  <div className="d-flex align-items-center profile_avatar mb-4">
                    <Skeleton width="150px" height="150px" borderRadius="50%" />
                    <div className="ms-4 w-50">
                      <Skeleton width="60%" height="30px" className="mb-2" />
                      <Skeleton width="40%" height="20px" className="mb-3" />
                      <Skeleton width="120px" height="40px" borderRadius="20px" />
                    </div>
                  </div>
                </div>
              ) : authorData ? (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img 
                          src={authorData.authorImage} 
                          alt={authorData.authorName} 
                          className="rounded-circle shadow-sm"
                          style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />
                        <i className="fa fa-check"></i>
                        <div className="profile_name mt-3">
                          <h4 className="fw-bold">
                            {authorData.authorName}
                            <span className="profile_username text-muted d-block fs-6">
                              @{authorData.tag || "creator"}
                            </span>
                            <span id="wallet" className="profile_wallet text-muted fs-6">
                              {authorData.address}
                            </span>
                          </h4>
                          <button 
                            className="btn btn-main mt-2 px-4 py-2 rounded-pill shadow-sm" 
                            onClick={() => setIsFollowing(!isFollowing)}
                          >
                            {isFollowing ? 'Unfollowed' : 'Follow'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-12 text-center py-5">
                  <h3>Author not found.</h3>
                </div>
              )}

              {/* Author Items Grid / Skeleton Loader */}
              <div className="col-md-12 mt-5">
                {loading ? (
                  <div className="row g-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-12">
                        <Skeleton width="100%" height="380px" borderRadius="16px" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <AuthorItems
                    items={authorData?.nftCollection}
                    authorImage={authorData?.authorImage}
                    authorId={authorId}
                  />
                )}
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;