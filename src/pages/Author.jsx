import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";

const AuthorProfileSkeleton = () => {
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
                      <div className="skeleton-box" style={{ width: '150px', height: '150px', borderRadius: '50%' }}></div>
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          <div className="skeleton-box" style={{ width: '200px', height: '24px', marginBottom: '8px' }}></div>
                          <div className="skeleton-box" style={{ width: '150px', height: '16px', marginBottom: '8px' }}></div>
                          <div className="skeleton-box" style={{ width: '300px', height: '14px' }}></div>
                        </h4>
                      </div>
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
                  <AuthorItems authorId={null} authorImage={AuthorImage} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
        if (!response.ok) {
          throw new Error('Failed to fetch author data');
        }
        const data = await response.json();
        
        if (authorId) {
          // Find the specific author by authorId
          const foundAuthor = data.find(seller => seller.authorId.toString() === authorId);
          if (foundAuthor) {
            setAuthor(foundAuthor);
          } else {
            setError('Author not found');
          }
        } else {
          // Default to first author if no authorId provided
          setAuthor(data[0] || null);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching author data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  const handleImageError = (e) => {
    e.target.src = AuthorImage;
  };

  if (loading) {
    return <AuthorProfileSkeleton />;
  }

  if (error || !author) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="text-center">
                    <p>Error loading author information: {error || 'Author not found'}</p>
                    <Link to="/" className="btn-main">Go Back Home</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
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
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img 
                        src={author.authorImage || AuthorImage} 
                        alt={author.authorName}
                        onError={handleImageError}
                      />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">@{author.authorName.toLowerCase().replace(/\s+/g, '')}</span>
                          <span id="wallet" className="profile_wallet">
                            Author ID: {author.authorId}
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
                  <AuthorItems authorId={authorId} authorImage={author.authorImage || AuthorImage} />
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
