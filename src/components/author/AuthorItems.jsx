import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; 
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "../UI/Skeleton"; 

const AuthorItems = () => {
  const { authorId } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [nftItems, setNftItems] = useState([]);
  const [authorImage, setAuthorImage] = useState("");

  useEffect(() => {
    const fetchNftItems = async () => {
      try {
        const response = await fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setNftItems(data.nftCollection);
        setAuthorImage(data.authorImage); 
      } catch (error) {
        console.error("Failed to fetch NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNftItems(); 
  }, [authorId]); 

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? (
            new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <Skeleton width="100%" height="200px" /> 
                  <Skeleton width="100%" height="30px" style={{ margin: '10px 0' }} /> 
                  <Skeleton width="100%" height="30px" style={{ margin: '10px 0' }} /> 
                </div>
              </div>
            ))
          ) : (
            nftItems.map(item => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.nftId}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img className="lazy" src={authorImage || AuthorImage} alt="Author" />
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
