import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import CountdownTimer from "../UI/CountdownTimer";

const AuthorItems = ({ authorId }) => {
  const [authorNFTs, setAuthorNFTs] = useState([]);
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorNFTs = async () => {
      if (!authorId) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthorData(response.data);
        setAuthorNFTs(response.data.nftCollection || []);
      } catch (error) {
        console.error("Error fetching author NFTs:", error);
        setError("Failed to load author's NFTs");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorNFTs();
  }, [authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? // Skeleton Loading state
              Array.from({ length: 8 }).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={`skeleton-${index}`}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton
                        width="50px"
                        height="50px"
                        borderRadius="50%"
                      />
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton
                        width="100%"
                        height="250px"
                        borderRadius="8px"
                      />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton
                        width="80%"
                        height="24px"
                        borderRadius="4px"
                      />
                      <br />
                      <Skeleton
                        width="60%"
                        height="20px"
                        borderRadius="4px"
                      />
                    </div>
                  </div>
                </div>
              ))
            : error
            ? <div className="col-12 text-center">
                <p>{error}</p>
              </div>
            : authorNFTs.length === 0
            ? <div className="col-12 text-center">
                <p>This author hasn't created any NFTs yet.</p>
              </div>
            : authorNFTs.map((item) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to={`/author/${authorId}`}>
                        <img 
                          className="lazy" 
                          src={authorData?.authorImage || AuthorImage} 
                          alt="" 
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate && (
                      <div className="de_countdown">
                        <CountdownTimer expiryDate={item.expiryDate} />
                      </div>
                    )}
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="#" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="#" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="#">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage || nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title || "Unnamed NFT"}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price || "0.00"} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
