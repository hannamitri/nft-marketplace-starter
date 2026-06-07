import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";
import Skeleton from "../components/UI/Skeleton"; 

const ItemDetails = () => {
  const { nftId } = useParams(); 
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setItemData(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchItemData();
  }, [nftId]); 

if (loading) {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <Skeleton width="100%" height="528px" /> {/* For the image */}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <Skeleton width="50%" height="40px" style={{ margin: '10px 0' }} /> {/* For the title */}
                  <div className="item_info_counts">
                    <div style={{ paddingTop: '10px' }} className="item_info_views">
                      <Skeleton width="100%" height="20px" /> {/* For the view count */}
                    </div>
                    <div style={{ paddingTop: '10px' }} className="item_info_like">
                      <Skeleton width="80%" height="20px" /> {/* For the like count */}
                    </div>
                  </div>
                  <div>
                    <Skeleton width="100%" height="120px" style={{ margin: '10px 0' }} />
                  </div> {/* For the description */}

                  {/* Owner Section with Flexbox */}
                  <h6>Owner</h6>
                  <div style={{ marginBottom: '14px' }} className="d-flex align-items-center">
                    <Skeleton width="50px" height="50px" borderRadius="50%" /> {/* For owner image */}
                    <div style={{ marginLeft: '10px' }}>
                      <Skeleton width="150px" height="20px" />
                    </div> {/* For owner name */}
                  </div>

                  {/* Creator Section with Flexbox */}
                  <h6>Creator</h6>
                  <div style={{ marginBottom: '24px' }} className="d-flex align-items-center">
                    <Skeleton width="50px" height="50px" borderRadius="50%" /> {/* For owner image */}
                    <div style={{ marginLeft: '10px' }}>
                      <Skeleton width="150px" height="20px" />
                    </div> {/* For creator name */}
                  </div>

                  <h6>Price</h6>
                  <div className="nft-item-price">
                    <Skeleton width="100px" height="40px" /> {/* For price */}
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
    return <p>Error: {error}</p>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img src={itemData.nftImage} className="img-fluid img-rounded mb-sm-30 nft-image" alt={itemData.title} />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{itemData.title}</h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemData.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemData.likes}
                    </div>
                  </div>
                  <p>{itemData.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemData.ownerId}`}>
                            <img className="lazy" src={itemData.ownerImage || AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemData.ownerId}`}>{itemData.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemData.creatorId}`}>
                            <img className="lazy" src={itemData.creatorImage || AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemData.creatorId}`}>{itemData.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemData.price}</span>
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
