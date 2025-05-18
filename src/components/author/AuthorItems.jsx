import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ authorId, authorImage }) => {
  const [nftCollection, setNftCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchAuthorData() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      const data = await response.json();
      if (data && data.nftCollection) {
        setNftCollection(data.nftCollection);
      } else {
        console.error("No nftCollection found in API response.");
        setNftCollection([]);
      }
    } catch (error) {
      console.error("Error fetching author data:", error);
      setNftCollection([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (authorId) {
      fetchAuthorData();
    }
  }, [authorId]);

  if (isLoading) {
    return (
      <div className="row">
        {new Array(8).fill(0).map((_, index) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
            <Skeleton width="100%" height="300px" />
          </div>
        ))}
      </div>
    );
  }

  if (nftCollection.length === 0) {
    return <div>No NFT collections found for this author.</div>;
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <img
                    className="lazy"
                    src={authorImage} 
                    alt=""
                  />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft__item_wrap">
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
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