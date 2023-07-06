import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CountDownTimer from "../home/CountDownTimer.jsx"
import Skeliton from "../home/Skeliton.jsx";

const ExploreItems = () => {

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const itemsPerLoad = 8;
  const itemsPerBatch = 4;

  async function fetchExploreItems()
  {
    const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
    setItems(response.data);
    setLoading(false);
  }


  useEffect(() => {
    fetchExploreItems()
  }, [])

  useEffect(() => {
    if (items.length > 0) {
      setDisplayedItems(items.slice(0, itemsPerLoad));
      setShowLoadMore(items.length > itemsPerLoad);
    }
  }, [items]);


  const loadMoreItems = () => {
    const currentLength = displayedItems.length;
    const newItems = items.slice(
      currentLength,
      currentLength + itemsPerBatch
    );

    const updatedItems = [...displayedItems, ...newItems];
    setDisplayedItems(updatedItems);

    if (updatedItems.length === items.length) {
      setShowLoadMore(false);
    }
  };

  async function filteItems(filter)
  {
    const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`)
    setItems(response.data)
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => filteItems(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {
        loading ? (
          <>
            {
              new Array(8).fill(0).map((_, index) => {
                return <Skeliton key={index} />
              })
            }
          </>
        ) : (
          <>
            {displayedItems.map((item, index) => (
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
                  <CountDownTimer startTime={item.expiryDate}/>

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="l" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="l" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="l">
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
        )
      }

      {
        showLoadMore && (
          <div className="col-md-12 text-center">
            <Link to="" id="loadmore" className="btn-main lead" onClick={loadMoreItems}>
              Load more
            </Link>
          </div>
        )} 
    </>
  );
};

export default ExploreItems;
