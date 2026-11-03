import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import ExpirationDate from "../UI/ExpirationDate";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [count, setCount]  = useState(8)
  const loadRef = React.useRef(null)

  async function fetchExploreItems() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
    setExploreItems(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchExploreItems()
  }, [])

  function loadMore() {
    setCount(count + 4)
    if (count > exploreItems.length) {
      setCount(exploreItems.length)
    }
    if ((count + 4) === exploreItems.length) {
      loadRef.current.style.display = "none"
    } 
    return renderExploreItems(count)
  }

  function renderExploreItems() {
    return (
      loading ?
        new Array(count).fill(0).map((_, index) => (
          <div
          key={index}
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
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="/" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="/" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="/">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to="/item-details">
                  <Skeleton width="100%" height="200px" borderRadius="5px" />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to="/item-details">
                  <h4><Skeleton width='100px' height='20px' borderRadius='5px' /></h4>
                </Link>
                <div className="nft__item_price"><Skeleton width='100px' height='20px' borderRadius='5px' /></div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span><Skeleton width='20px' height='20px' borderRadius='5px' /></span>
                </div>
              </div>
            </div>
          </div>
        ))
      :
        exploreItems.slice(0, count).map((data) => (
          <div
          key={data.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to="/author/:id"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={data.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {Number(data.expiryDate) > Date.now() && (
                <div className="de_countdown">
                  <ExpirationDate expiryDate={data.expiryDate} />
                </div>
              )}
              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="/" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="/" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="/">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to="/item-details">
                  <img src={data.nftImage} className="lazy nft__item_preview" alt="" />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to="/item-details">
                  <h4>{data.title}</h4>
                </Link>
                <div className="nft__item_price">{data.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{data.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )
    }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>      
      {renderExploreItems()}      
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" ref={loadRef} className="btn-main lead" onClick={loadMore}>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
