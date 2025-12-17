import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";
import axios from "axios";


const ExploreItems = ({exploreItems, loading, setExploreItems, setLoading}) => {
  const [itemsToShow, setItemsToShow] = useState(8);
  const [showingAllItems, setShowingAllItems] = useState(false);
  const displayedItems = exploreItems.slice(0, itemsToShow);

 
  function handleShowMore(){
    if(showingAllItems){
      setItemsToShow(8)
      setShowingAllItems(false);
    } else if(itemsToShow < exploreItems.length) {
      setItemsToShow(itemsToShow + 4)
    }
    if((itemsToShow +4) === exploreItems.length){
      setShowingAllItems(true);
    }
  }


  async function onSort(value){
    setLoading(true)
    await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`)
      .then(res =>{
        const response = res.data;
        setExploreItems(response);
        setLoading(false)
      })
      .catch(err =>{
        console.log('error fetching data', err)
      })
  }


  const skeletonItems = Array(8).fill(0);
  return (
    <>
      <div>
        <select id="filter-items" onChange={(e)=>{onSort(e.target.value)}} defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <>
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="skeleton-box" style={{width:'100%',height:200}}></div>
              <div className="nft__item_info">
                <div className="skeleton-box" style={{width:'70%',height:18}}></div>
                <div className="skeleton-box" style={{width:'40%',height:16}}></div>
              </div>
            </div>
          </div>
        ))}
        </>
      ):(
        <>
        {displayedItems.map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
            data-aos="fade-in" data-aos-duration="1000"
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <Countdown expiryDate={item.expiryDate}/>

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
        </>
      )}
      <div className="col-md-12 text-center">
        
          <button onClick={handleShowMore} id="loadmore" className="btn-main lead">
            {showingAllItems? 'Load less' : 'Load more'}
          </button>
        
      </div>
    </>
  );
};

export default ExploreItems;
