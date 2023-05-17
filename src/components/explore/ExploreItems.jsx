import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Timer from "../home/Timer";
import axios from "axios";



const ExploreItems = ({explore,setExplore}) => {

const [price , setPrice ] = useState()


async function getitems() { 
  await axios.get(price === "likes_high_to_low" ?  
     'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low':  
        price === "price_low_to_high" ? 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high':   
          price === "price_high_to_low" ? 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low':  
             'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore '     )  
              .then((response)=>{  
                setTimeout(() => {
                  
                  setExplore(response.data)     
                  
                }, 300);
              })


}
  
  useEffect(() => {
    getitems()
    setExplore(null)
  
  
  }, [price])
  


  return (
    <>
      <div>
        <select id="filter-items" onChange={(e) => (setPrice(e.target.value)) } defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {explore?.map((item) => (
        <div
          key={item?.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item?.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {item?.expiryDate && <Timer expiryDate={item?.expiryDate} > </Timer> }

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
                <img src={item?.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{item?.title}</h4>
              </Link>
              <div className="nft__item_price">{item?.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item?.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
