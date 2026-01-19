import React, { useEffect, useState } from "react";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";


const ItemDetails = () => {
  const { nftId } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        const data = response.data;
        
        // Transform API response to expected structure
        const transformedData = data ? {
          ...data,
          owner: {
            name: data.ownerName,
            id: data.ownerId,
            image: data.ownerImage || AuthorImage
          },
          creator: {
            name: data.creatorName,
            id: data.creatorId,
            image: data.creatorImage || AuthorImage
          },
          nftImage: data.nftImage || nftImage
        } : null;
        
        setItemData(transformedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching item details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (nftId) {
      fetchItemDetails();
    }
  }, [nftId]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div className="skeleton skeleton-img" style={{ width: "100%", height: "500px", borderRadius: "8px" }}></div>
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <div className="skeleton skeleton-title" style={{ width: "60%", height: "40px", marginBottom: "20px" }}></div>
                    
                    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                      <div className="skeleton skeleton-text" style={{ width: "80px", height: "20px" }}></div>
                      <div className="skeleton skeleton-text" style={{ width: "80px", height: "20px" }}></div>
                    </div>
                    
                    <div className="skeleton skeleton-text" style={{ width: "100%", height: "15px", marginBottom: "10px" }}></div>
                    <div className="skeleton skeleton-text" style={{ width: "100%", height: "15px", marginBottom: "10px" }}></div>
                    <div className="skeleton skeleton-text" style={{ width: "80%", height: "15px", marginBottom: "30px" }}></div>
                    
                    <div className="skeleton skeleton-text" style={{ width: "60px", height: "20px", marginBottom: "10px" }}></div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
                      <div className="skeleton skeleton-avatar" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
                      <div className="skeleton skeleton-text" style={{ width: "100px", height: "20px" }}></div>
                    </div>
                    
                    <div className="skeleton skeleton-text" style={{ width: "60px", height: "20px", marginBottom: "10px" }}></div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
                      <div className="skeleton skeleton-avatar" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
                      <div className="skeleton skeleton-text" style={{ width: "100px", height: "20px" }}></div>
                    </div>
                    
                    <div className="skeleton skeleton-text" style={{ width: "60px", height: "20px", marginBottom: "10px" }}></div>
                    <div className="skeleton skeleton-text" style={{ width: "120px", height: "30px" }}></div>
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
                  <h3>Error: {error}</h3>
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
                  src={itemData?.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {itemData?.title}
                    {itemData?.tag && <span style={{ marginLeft: "10px" }}>#{itemData.tag}</span>}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemData?.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemData?.likes}
                    </div>
                  </div>
                  <p>
                    {itemData?.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={itemData?.owner?.id ? `/author/${itemData.owner.id}` : "/author"}>
                            <img className="lazy" src={itemData?.owner.image} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={itemData?.owner?.id ? `/author/${itemData.owner.id}` : "/author"}>{itemData?.owner.name}</Link>
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
                          <Link to={itemData?.creator?.id ? `/author/${itemData.creator.id}` : "/author"}>
                            <img className="lazy" src={itemData?.creator.image} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={itemData?.creator?.id ? `/author/${itemData.creator.id}` : "/author"}>{itemData?.creator.name}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemData?.price}</span>
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
