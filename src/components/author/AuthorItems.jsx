import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const AuthorItems = () => {
const { authorId } = useParams();
const [authorData, setAuthorData] = useState(null);
const [authorImage, setAuthorImage] = useState(null);
const [authorName, setAuthorName] = useState('');
const [nftCollectionData, setNftCollectionData] = useState([]);
const [loading, setLoading] = useState(false);

async function getAuthorData() {
  setLoading(true);
  try {  
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
    console.log('AuthorData:', data);
    setAuthorData(data)
    setAuthorImage(data.authorImage)
    setAuthorName(data.AuthorName);
    setNftCollectionData(data.nftCollection)
  } catch (error) {
    console.log("Error Fetching API Data");
  } finally {
    setLoading(false)
  }
}

function AuthorItemsLoadingState() {
  return new Array(8).fill(0).map((_, index) => (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ marginBottom: "8px"}} key={index}>
        <div className="nft__item skeleton-box" style={{width: "100%", height: "100%", minHeight: "340px", borderRadius: "0%", marginBottom: "8px" }}></div>
    </div>
  ))
}

useEffect(() => {
  getAuthorData();
}, []);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {!loading ? (<>
          {nftCollectionData.map((nftData, id) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={authorImage} alt="" />
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
                      src={nftData.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{nftData.title}</h4>
                  </Link>
                  <div className="nft__item_price">{nftData.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{nftData.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>) : (AuthorItemsLoadingState())}
              
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
