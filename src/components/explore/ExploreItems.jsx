import React, { useEffect, useState } from "react";
import axios from "axios";
import Countdown from "../UI/Countdown";
import Skeleton from "../UI/Skeleton";
import { Link } from "react-router-dom";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState();
  const [itemDisplay, setItemDisplay] = useState(8);

  async function fetchItems(filter) {
    setLoading(true);

    if (filter) {
      const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`)
      setItems(response.data)
      setLoading(false)
    } else {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
      );
      setItems(response.data);
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchItems();
  }, []);

  function skeleton(index) {
    return (
      <div
        key={index}
        className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 pb-4"
        style={{ display: "block", backgroundSize: "cover" }}
      >
        <Skeleton width="100%" height={440} borderRadius={15} />
      </div>
    );
  }

  function loadMore() {
    setItemDisplay((itemDisplay) => itemDisplay + 4);
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => fetchItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <>
          {new Array(8).fill(0).map((_, index) => {
            return skeleton(index);
          })}
        </>
      ) : (
        items
          .map((item, index) => (
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
                <div>
                  {item.expiryDate ? (
                    <Countdown key={item.id} expiryDate={item.expiryDate} />
                  ) : null}
                </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                   
                  </div>
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
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
          ))
          .slice(0, itemDisplay)
      )}
      <div className="col-md-12 text-center">
        {itemDisplay === 16 ? null : (
          <button onClick={loadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;