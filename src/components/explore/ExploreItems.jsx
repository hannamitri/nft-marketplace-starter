import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import CountdownTimer from "../home/countdowntimer";
import Loadingstate from "../Loadingstate";

const ExploreItems = () => {
const [loadmore, setLoadmore] = useState(8)
const [loading, setLoading] = useState(true)

  useEffect(() => {
        fetchApi();
        
    }, []);

  const [api, setApi] = useState([]);
  async function fetchApi() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setApi(data);
    
    setLoading(false)
  }

  function clickLoadmore() {
    setLoadmore(4 + loadmore)
    
  }

  async function filterPost(filter) {
    if (filter === "price_low_to_high") {
        const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high"
    );
    setApi(data);
    
    
    } else if (filter === "price_high_to_low") {
      const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low"
    );
     setApi(data);
    }
    else if (filter === "likes_high_to_low"){
const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low"
    );
     setApi(data);
    }
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue=""
        onChange={(event) => filterPost(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

{loading ? 
          <Loadingstate array={8}/>
           : (
            
api.map((api, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${api.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={api.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
             {api.expiryDate ? (
                <div className="de_countdown">
                  <CountdownTimer targetDate={`${api.expiryDate}`} />
                </div>
              ) : null}
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
                <img src={api.nftImage} className="lazy nft__item_preview" alt="" />
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
      )
    ).slice(0,loadmore)
      


          )}



       



      <div className="col-md-12 text-center">
        <div to="" id="loadmore" className="btn-main lead"
        onClick={()=>clickLoadmore()}>
          Load more
        </div>
      </div>
    </>
  );
};

export default ExploreItems;
