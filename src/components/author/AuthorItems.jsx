import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const AuthorItems = () => {

   const [collections, setCollections] = useState([]);
        const [loading, setLoading] = useState(false);
      
        useEffect(() => {
          async function fetchCollections() {
            try {
              setLoading(true);
              const response = await fetch(
                "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
              );
      
              const data = await response.json();
      
              setCollections(data);
            } catch (error) {
              console.error("Error fetching collections:", error);
            } finally {
              setLoading(false);
            }
          }
      
          fetchCollections();
        }, []);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {collections.map((data, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={data.authorImage} alt="" />
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
                  <Link to="/item-details">
                    <img
                      src={data.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>${data.title}</h4>
                  </Link>
                  <div className="nft__item_price">${data.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>${data.likes}</span>
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
