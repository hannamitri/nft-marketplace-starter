import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Impending from "../impending";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const ExploreItems = () => {
 const [explode, setExplode] = useState([])
 const [err,setError] = useState(null)
 const [loading, setLoading] = useState(true)
 const [visibleItems, setVisibleItems] = useState(8)
const [filter, setFilter] = useState("")

 useEffect (()=>{
  async function explore (){
    setLoading(true)
    try {const {data} = await axios.get (`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${filter ? `?filter=${filter}`:""}`)
    setExplode(data)
  } catch(err) {setError('Cant retrieve explore page Data')
  }
  finally {
    setLoading(false)
 }
 }
  explore()
 }
,[filter])
const Countdown = ({expiryDate}) => {
  const [timeLeft, setTimeLeft] = useState(expiryDate - Date.now());

useEffect (() => {
  const interval = setInterval (() => {
    setTimeLeft(expiryDate - Date.now())
  },1000)

  return () => clearInterval(interval)
},
[expiryDate, timeLeft])
};
 
const loadMore = () => {
    setVisibleItems((preVisible) => preVisible + 4)//Load 4 more items
};
const handleChange = (e) => {
  setFilter(e.target.value)
  setVisibleItems(visibleItems)

}
 
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? 
      Array.from({length: visibleItems}).map((_, index) =>
      ( <div key={index}  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
        style={{ display: "block", backgroundSize: "cover" }}
      >
          <Skeleton height={100}  />
         <Skeleton width="40%" style={{ margin: "10px 0" }} />
        <Skeleton width="20%" /> 
       
      </div>))
       :
      Array.isArray(explode) && explode.slice(0,visibleItems).map((exploration) => (
        <div
          key={exploration.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${exploration.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={exploration.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown"><Impending timeLeft={exploration.expiryDate}/></div>

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
                <img src={exploration.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{exploration.title}</h4>
              </Link>
              <div className="nft__item_price">{exploration.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{exploration.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
      {visibleItems < explode.length && ( //Show button only if more items are available
        <button to="" id="loadmore" className="btn-main lead" onClick={loadMore}>
          Load more
        </button>
  )}
      </div>
    </>
  );
};

export default ExploreItems;
