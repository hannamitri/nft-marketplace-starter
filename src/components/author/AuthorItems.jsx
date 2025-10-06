import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ authorId, authorNfts = [] }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorItems = async () => {
      try {
      
        setLoading(true);
        
        
        if (authorNfts && authorNfts.length > 0) {
          console.log(`Using ${authorNfts.length} NFTs passed from parent for author ${authorId}`);
          console.log("Author NFTs from parent:", authorNfts);
          setItems(authorNfts);
          setLoading(false);
          return;
        }
        
        
        const [newItemsResponse, hotCollectionsResponse] = await Promise.all([
          axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"),
          axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
        ]);
        
        
        const allNfts = [...newItemsResponse.data, ...hotCollectionsResponse.data];
        
        
        const filteredItems = authorId 
          ? allNfts.filter(item => 
              item.authorId === authorId || 
              item.author?.id === authorId ||
              item.authorId === parseInt(authorId) ||
              item.author?.id === parseInt(authorId) ||
              item.creatorId === authorId ||
              item.creator?.id === authorId ||
              item.creatorId === parseInt(authorId) ||
              item.creator?.id === parseInt(authorId)
            )
          : allNfts;
        
        
        const uniqueItems = filteredItems.filter((item, index, self) => 
          index === self.findIndex(t => 
            (t.nftId || t.id) === (item.nftId || item.id)
          )
        );
        
        console.log(`Found ${uniqueItems.length} NFTs for author ${authorId}`);
        console.log("Author NFTs:", uniqueItems);
        
        setItems(uniqueItems);
        setError(null);
      } catch (error) {
        console.error("Error fetching author items:", error);
        setError(error.message || "Failed to load author items");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorItems();
  }, [authorId, authorNfts]);

  const SkeletonLoader = () => (
    <div className="row">
      {new Array(8).fill(0).map((_, index) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
          <div className="nft__item">
            <div className="author_list_pp">
              <Skeleton width="50px" height="50px" borderRadius="50%" />
            </div>
            <div className="nft__item_wrap">
              <Skeleton width="100%" height="250px" borderRadius="8px" />
            </div>
            <div className="nft__item_info">
              <Skeleton width="120px" height="20px" borderRadius="4px" />
              <Skeleton width="80px" height="16px" borderRadius="4px" />
              <Skeleton width="40px" height="16px" borderRadius="4px" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="text-center" style={{ padding: "40px 0" }}>
            <div style={{ 
              background: "#f8f9fa", 
              padding: "20px", 
              borderRadius: "8px",
              border: "1px solid #e9ecef"
            }}>
              <i className="fa fa-exclamation-triangle" style={{ fontSize: "48px", color: "#6c757d", marginBottom: "16px" }}></i>
              <h4 style={{ color: "#6c757d", marginBottom: "8px" }}>Unable to Load Items</h4>
              <p style={{ color: "#6c757d", marginBottom: "16px" }}>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items && items.length > 0 ? items.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id || index} data-aos="fade-up">
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${item.authorId || item.author?.id || 'unknown'}`}>
                    <img 
                      className="lazy" 
                      src={item.authorImage || item.author?.avatar || item.author?.image || item.author?.profileImage || AuthorImage} 
                      alt={item.author?.name || item.author?.authorName || 'Author'}
                      onError={(e) => {
                        e.target.src = AuthorImage;
                      }}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftId || item.id}`}>
                    <img
                      src={item.image || item.nftImage || nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title || item.name || 'NFT'}
                      onError={(e) => {
                        e.target.src = nftImage;
                      }}
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId || item.id}`}>
                    <h4>
                      {(() => {
                        const generateDisplayNumber = (nftId) => {
                          const num = parseInt(nftId) || 0;
                          return (num % 1000) + 100;
                        };
                        const displayNumber = generateDisplayNumber(item.nftId || item.id);
                        const baseTitle = item.title || item.name || "NFT";
                        return `${baseTitle} #${displayNumber}`;
                      })()}
                    </h4>
                  </Link>
                  <div className="nft__item_price">
                    {item.price || item.ethPrice || '0'} ETH
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes || item.likeCount || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-md-12 text-center" style={{ padding: "40px 0" }} data-aos="fade-up">
              <div style={{ 
                background: "#f8f9fa", 
                padding: "20px", 
                borderRadius: "8px",
                border: "1px solid #e9ecef"
              }}>
                <i className="fa fa-info-circle" style={{ fontSize: "48px", color: "#6c757d", marginBottom: "16px" }}></i>
                <h4 style={{ color: "#6c757d", marginBottom: "8px" }}>No NFTs Found</h4>
                <p style={{ color: "#6c757d", marginBottom: "16px" }}>This author doesn't have any NFTs yet.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;