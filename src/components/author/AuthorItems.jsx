import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Loadingstate from "../Loadingstate";

const AuthorItems = () => {

  const [loading, setLoading] = useState()
  const [api, setApi] = useState([]);
  const [authorApi, setAuthorApi] = useState([]);
  const {id} = useParams()


  useEffect(() => {
        fetchApi();
    }, []);
    


    async function fetchApi() {
    setLoading(true)
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
 const data = response.data.nftCollection
 setApi(data)
  setAuthorApi(response.data)
  
    
    setLoading(false)
   
  }
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
        {loading ? 
        <Loadingstate array={8}/>
        :
        api.map((api, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={authorApi.authorImage} alt="" />
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
                 <Link to={`/item-details/${api.nftId}`}>
                    <img
                      src={api.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                   <Link to={`/item-details/${api.nftId}`}>
                    <h4>{api.title}</h4>
                  </Link>
                  <div className="nft__item_price">{api.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{api.likes}</span>
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
