import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [nftData, setNftData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Get NFT data from location state (passed from carousel components)
    console.log('Location state:', location.state);
    if (location.state && location.state.nftData) {
      console.log('NFT data received:', location.state.nftData);
      setNftData(location.state.nftData);
      setLoading(false);
    } else {
      console.log('No NFT data received, using fallback data');
      // Fallback: simulate loading and show default data
      setTimeout(() => {
        setNftData({
          id: id || "default",
          title: "Rainbow Style #194",
          description: "doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
          image: nftImage,
          author: {
            name: "Monica Lucas",
            image: AuthorImage
          },
          owner: {
            name: "Monica Lucas",
            image: AuthorImage
          },
          price: "1.85",
          views: "100",
          likes: "74"
        });
        setLoading(false);
      }, 1500); // Simulate loading time
    }
  }, [id, location.state]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                {/* Skeleton for NFT Image */}
                <div className="col-md-6 text-center">
                  <div className="skeleton-box" style={{ width: '100%', height: '400px', borderRadius: '8px' }}></div>
                </div>
                
                {/* Skeleton for Content */}
                <div className="col-md-6">
                  <div className="item_info">
                    {/* Skeleton for Title */}
                    <div className="skeleton-box" style={{ width: '80%', height: '32px', marginBottom: '20px' }}></div>
                    
                    {/* Skeleton for Views/Likes */}
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        <div className="skeleton-box" style={{ width: '30px', height: '16px', display: 'inline-block', marginLeft: '8px' }}></div>
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        <div className="skeleton-box" style={{ width: '30px', height: '16px', display: 'inline-block', marginLeft: '8px' }}></div>
                      </div>
                    </div>
                    
                    {/* Skeleton for Description */}
                    <div className="skeleton-box" style={{ width: '100%', height: '60px', marginBottom: '20px' }}></div>
                    
                    {/* Skeleton for Owner/Creator */}
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <div className="skeleton-box" style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
                          </div>
                          <div className="author_list_info">
                            <div className="skeleton-box" style={{ width: '100px', height: '20px' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <div className="skeleton-box" style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
                          </div>
                          <div className="author_list_info">
                            <div className="skeleton-box" style={{ width: '100px', height: '20px' }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <div className="skeleton-box" style={{ width: '60px', height: '24px', display: 'inline-block', marginLeft: '8px' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <h3>Error loading NFT details</h3>
                  <p>{error}</p>
                  <Link to="/" className="btn-main">Go Back Home</Link>
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
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nftData.image}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={nftData.title}
                  onError={(e) => {
                    e.target.src = nftImage; // Fallback to default image
                  }}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{nftData.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nftData.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nftData.likes}
                    </div>
                  </div>
                  <p>{nftData.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img 
                              className="lazy" 
                              src={nftData.owner.image} 
                              alt={nftData.owner.name}
                              onError={(e) => {
                                e.target.src = AuthorImage; // Fallback to default author image
                              }}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{nftData.owner.name}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img 
                              className="lazy" 
                              src={nftData.author.image} 
                              alt={nftData.author.name}
                              onError={(e) => {
                                e.target.src = AuthorImage; // Fallback to default author image
                              }}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="/author">{nftData.author.name}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{nftData.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
