import React, { useEffect, useState } from "react";
//import ethImage from '../images/ethereum.svg'; vercel issue workaround//
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import '../css/styles/HotCollection.css';


{/*Skeleton Loading State*/}
const SkeletonItemDetails = () => (
  <div className="container">
    <div className="row">
      {/* LEFT COLUMN: IMAGE SKELETON */}
      <div className="col-md-6 text-center">
        <div className="skeleton skeleton-img mb-sm-30" style={{ height: '400px' }}></div>
      </div>
      
      {/* RIGHT COLUMN: INFO SKELETONS */}
      <div className="col-md-6">
        <div className="item_info">
          {/* Title Skeleton */}
          <div className="skeleton skeleton-text" style={{ width: '80%', height: '36px' }}></div>

          {/* Counts Skeleton */}
          <div className="item_info_counts d-flex my-3">
            <div className="skeleton skeleton-text" style={{ width: '60px', height: '24px', marginRight: '20px' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '60px', height: '24px' }}></div>
          </div>
          
          {/* Description Skeleton */}
          <div className="skeleton skeleton-text" style={{ width: '100%' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '90%' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '95%' }}></div>
          
          <div className="d-flex flex-row mt-4">
            {/* Owner Skeleton */}
            <div className="mr40">
              <div className="skeleton skeleton-text" style={{ width: '50px' }}></div>
              <div className="item_author d-flex align-items-center">
                <div className="skeleton skeleton-avatar me-2"></div>
                <div className="skeleton skeleton-text" style={{ width: '100px' }}></div>
              </div>
            </div>
          </div>
          
          {/* Price Skeleton */}
          <div className="spacer-40"></div>
          <div className="skeleton skeleton-text" style={{ width: '50px' }}></div>
          <div className="nft-item-price d-flex align-items-center mt-2">
            <div className="skeleton skeleton-text" style={{ width: '120px', height: '30px' }}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


const ItemDetails = () => {
  const {id} =useParams();
  const[itemData, setItemData]= useState(null);
  const[loading, setLoading]= useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try{
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`);
        setItemData(response.data);
        }catch(error){
          console.error("Error fetching item details:", error);
          } finally {
            setLoading(false);
        }
      };

      fetchData();
    }, [id]);

    if (loading) {
      return (
        <div id="wrapper">
        <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
        <div className="container">
        <h2 className="text-center"> Loading Item Details...</h2>
        <SkeletonItemDetails/>
        </div>
        </section>
        </div>
        </div>
      );
    }

    if (!itemData || Object.keys(itemData).length === 0) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <h2 className="text-center">Item Not Found</h2>
            </div>
          </section>
        </div>
      </div>
    );
  }

  const {
    nftImage,
    title,
    views,
    likes,
    description,
    ownerImage,
    ownerName,
    ownerId,
    creatorImage,
    creatorName,
    creatorId,
    price,
  } = itemData;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nftImage} 
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{title}</h2> 

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {likes}
                    </div>
                  </div>
                  <p>{description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${ownerId}`}> 
                            <img className="lazy" src={ownerImage} alt="Owner" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${ownerId}`}>{ownerName}</Link>
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
                          <Link to={`/author/${creatorId}`}> 
                            <img className="lazy" src={creatorImage} alt="Creator" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${creatorId}`}>{creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src="/images/ethereum.svg" alt="Ethereum" />
                      <span>{price}</span>
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
