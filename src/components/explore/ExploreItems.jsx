
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";


const ExploreItems = () => {
  const [itemCount, setItemCount] = useState(8);
const [exploreItems, setExploreItems] = useState([]);
const [loading, setLoading] = useState(true);
async function fetchExploreItems() {
  const response = await fetch(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
  );
  const data = await response.json();
console.log(data);
setExploreItems(data);
setLoading(false);
  
}

useEffect(() => {
  fetchExploreItems();
}, []);



  const [timeLeft, setTimeLeft] = useState(19832);

    const hours = Math.floor(timeLeft / 3600);
const minutes = Math.floor((timeLeft % 3600) / 60);
const seconds = timeLeft % 60;

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((prevTime) => prevTime - 1);
  }, 1000);




  return () => clearInterval(timer);
}, []);





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
      {exploreItems.slice(0, itemCount).map((item, index) => (
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
                <img className="lazy" src={item.authorImage}  alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
               <div className="de_countdown">
             {hours}h {minutes}m {seconds}s
             </div>

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                <button type="button">
  <i className="fa fa-facebook fa-lg"></i>
</button>

<button type="button">
  <i className="fa fa-twitter fa-lg"></i>
</button>

<button type="button">
  <i className="fa fa-envelope fa-lg"></i>
</button>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${item.id}`}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.id}`}>
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
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={() => setItemCount(itemCount + 4)}>
          Load more
        </Link>
      </div>
    </>
  );
};



export default ExploreItems;
