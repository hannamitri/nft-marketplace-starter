import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "../home/CountdownTimer";
import LoadingSkeleton from "../home/LoadingSkeleton";

const API_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
const INITIAL_ITEMS_TO_SHOW = 8;
const ITEMS_PER_LOAD = 4;

const ExploreItems = () => {
  const [allRetrievedItems, setAllRetrievedItems] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(INITIAL_ITEMS_TO_SHOW);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      const url = filter ? `${API_URL}?filter=${filter}` : API_URL;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllRetrievedItems(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchItems();
  }, [filter]);

  const handleLoadMore = () => {
    setItemsToShow(prevCount => prevCount + ITEMS_PER_LOAD);
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    setItemsToShow(INITIAL_ITEMS_TO_SHOW);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div className="text-center py-4 text-danger">Error: {error.message}</div>;
  }

  if (allRetrievedItems.length === 0 && !loading) {
      return <div className="col-md-12 text-center py-4">No items found matching the filter.</div>;
  }

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {allRetrievedItems.slice(0, itemsToShow).map((item) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`By ${item.authorId}`}
              >
                <img className="lazy" src={item.authorImage} alt={`Author ${item.authorId}`} />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            <div className="decountdown">
                <CountdownTimer expiryDate={item.expiryDate} />
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
                <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
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

      {itemsToShow < allRetrievedItems.length && (
        <div className="col-md-12 text-center">
          <button onClick={handleLoadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;