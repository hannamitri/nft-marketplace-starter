import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton.jsx";

const AuthorItems = ({ authorInfo }) => {

  const { authorId } = useParams();
  const [nftDetails, setNftDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAuthorNftCollection = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
      const resultData = response.data;
      setNftDetails(resultData.nftCollection || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthorNftCollection();
  }, [authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        {loading ? (
          <div className="row">
            {new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                   <div className="nft_wrap">
                      <Skeleton width="100%" height="100%" borderRadius="10px" />
                    </div>
                </div>
              </div>
            ))}
          </div>
        ) : nftDetails.length > 0 ? (
          <div className="row">
            {nftDetails.map((item, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.nftId}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to="">
                      <img className="lazy" src={authorInfo.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
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
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  );
};

export default AuthorItems;