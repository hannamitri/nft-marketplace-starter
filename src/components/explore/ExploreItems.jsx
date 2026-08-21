import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CountdownTimer from "../UI/CountdownTimer";
import Skeleton from "../UI/Skeleton";

const API_URL = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore'
const API_filter_URL = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter='


const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

   useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const url = filter ? `${API_filter_URL}${filter}` : API_URL
      const {data} = await axios.get(url)
      setExploreItems(data)
      setLoading(false)
    }
    fetchData()
   }, [filter])

   function loadMore() {
    setVisibleCount((prev) => prev + 4)
   }
   
   function handleFilter(e) {
    setFilter(e.target.value)
   }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilter}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      

      {loading ? (
        new Array(4).fill(0).map((_,index) => (
        <div key={index} className=" col-lg-3 col-md-6 col-sm-6 col-xs-12" >
          <Skeleton/>
        </div>
        ))

      ) : (
        
      exploreItems.slice(0, visibleCount).map((item, index) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
          data-aos="fade-up"
          data-aos-delay={index * 100}
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
            {item.expiryDate && <CountdownTimer className="de_countdown" expiryDate={item.expiryDate}/>}

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
              <Link to="/item-details">
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price"> {item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))
      )}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={loadMore}>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
