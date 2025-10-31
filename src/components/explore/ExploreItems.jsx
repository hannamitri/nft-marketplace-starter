import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SkeletonAll from "../UI/SkeletonAll"; // ✅ Import adaptive skeleton

const ExploreItems = ({explore}) => {

   const [timeLeft, setTimeLeft] = useState({});

   // to fix dynamicly total items we want to see
   const [visibleCount, setVisibleCount] = useState(4); // show 4 items initially
   // this use select option and replace explore with card
   const [card, setCard] = useState([]);

    const [loading, setLoading] = useState(true);

    // Countdown formatter
  function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

   useEffect(() => { 

    if(explore && explore.length > 0) {
    const countdowns = explore.map((item) =>
      item.expiryDate
        ? Math.floor((new Date(item.expiryDate) - new Date()) / 1000)
        : 5 * 3600 + 30 * 60 + 32
    );

    setTimeLeft(countdowns);
    setCard(explore);

    setTimeout(() => setLoading(false), 2000);
  }

}, [explore]);



  // Countdown tick
  useEffect(() => {
      const interval = setInterval(() => {
        setTimeLeft((prev) =>
          Array.isArray(prev)
          ? prev.map((time) => (time > 0 ? time - 1 : 0))
        : []);
      }, 1000);
      return () => clearInterval(interval);
    
  }, []);

  // to see more item when cliked
    const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4); // load 4 more items each click
  };


    function filterExploreItems(filter) {
       setLoading(true); // 👈 show skeleton immediately when filter changes

       setTimeout(() => {
        
      
    let sortedData = [...explore]; // clone original data
    
    console.log(filter)

    if(filter === "price_low_to_high") {
     sortedData.sort((a,b) =>a.price - b.price)
    }
    if(filter === "price_high_to_low") {
     sortedData.sort((a,b) =>b.price - a.price)
    }
    if(filter === "likes_high_to_low") {
     sortedData.sort((a,b) =>b.likes - a.likes)
    } 

    setCard(sortedData); // update state with sorted list
    setLoading(false);

     }, 3000);

  }



  return (
    <>
      <div>
        <select id="filter-items" defaultValue="DEFAULT" onChange= {(event) => filterExploreItems(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {/* Show skeleton while loading */}
        {loading ?
         Array(4).fill(0).map((_, index) => 
         <div key={index}className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}>
        <SkeletonAll type="item" /> {/* 👈 matches NFT item layout */}
      </div>)
        : card.slice(0,visibleCount).map((item, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
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
            <div className="de_countdown">
                      {timeLeft !== undefined
                        ? formatTime(timeLeft[index])
                        : "0h 0m 0s"}
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

      {visibleCount < card.length && ( 
      <div className="col-md-12 text-center">
        <button to="" id="loadmore" className="btn-main lead" onClick={handleLoadMore}>
          Load more
        </button>
      </div>
      )}
    </>
  );
};

export default ExploreItems;
