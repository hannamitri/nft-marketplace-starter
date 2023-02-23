import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {

  const [items, setItems] = useState([])
  const [loadmore, setLoadMore] = useState(8)
  const [loading, setLoading] = useState(true)

  async function getItems() {
    setLoading(true)
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
    setItems(data)
    setLoading(false)
  }

  async function filterItems(filter) {
    setLoading(true)
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`)
    setItems(data)
    setLoading(false)
  }

  useEffect(() => {
    getItems()
  }, [])

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" 
        onChange={(event) => filterItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      
      {!loading 
      ? (
        items.slice(0, loadmore).map((item, index) => (
          (<div
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
            >
                <div className="nft__item" >
                    <div className="author_list_pp">
                        <Link
                          to={`/author/${item?.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                            <img className="lazy" src={item?.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                        </Link>
                    </div>
                      {
                      item?.expiryDate != null && <Countdown item={items[index]}/>
                      }
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
                        <Link to={`/item-details/${item?.nftId}`}>
                            <img
                            src={item?.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                            />
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
            </div>)
        ))
      ) : 
      (new Array(8).fill(0).map((_, index) => (
      <div key={index} 
        className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
        >
         <div className="nft__item" >
           <div className="author_list_pp">
               <Skeleton width={"50px"} height={"50px"} borderRadius={"50%"}/>
           </div>
           <div className="nft__item_wrap">     
             <Skeleton width={"100%"} height={"225px"} borderRadius={"8px"}/>
           </div>
           <div className="nft__item_info">
             <Skeleton width={"100px"} height={"20px"} borderRadius={"8px"}/>
             <div className="nft__item_price">
               <Skeleton width={"50px"} height={"20px"} borderRadius={"8px"}/>
             </div>
             <div className="nft__item_like">
               <i className="fa fa-heart"></i>
               <span><Skeleton width={"15px"} height={"15px"} borderRadius={"4px"}/></span>
             </div>
           </div>
        </div>
      </div>
      ))
      )}
          
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" 
        onClick={() => setLoadMore(loadmore + 4)}
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
