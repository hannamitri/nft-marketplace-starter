import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchItemDetails = async () => {
      if (id) {
        try {
          const response = await fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`);
          const data = await response.json();
          setItemData(data);
        } catch (error) {
          console.error('Error fetching item details:', error);
        }
      }
      setLoading(false);
    };
    
    fetchItemDetails();
  }, [id]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <p>Loading item details...</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!itemData) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h2>Item not found</h2>
                  <p>The requested NFT could not be found.</p>
                  <Link to="/explore" className="btn-main">Back to Explore</Link>
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
                  src={itemData.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={itemData.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{itemData.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {Math.floor(Math.random() * 200) + 50}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemData.likes}
                    </div>
                  </div>
                  <p>
                    {itemData.description || 'doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'}
                  </p>
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
                        <Link to={`/author/${itemData.ownerId}`}>{itemData.ownerName || 'Unknown Artist'}</Link>
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
                          <Link to={`/author/${itemData.ownerId}`}>
                          <img className="lazy" src={itemData.ownerImage || AuthorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${itemData.ownerId}`}>{itemData.ownerName || 'Unknown Artist'}</Link>
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
