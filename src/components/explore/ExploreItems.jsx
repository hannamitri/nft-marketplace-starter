import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    setVisibleItems(8);

    const url = filter
      ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
      : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("EXPLORE API DATA:", data);
        setItems(data.nfts || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, [filter]);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 4);
  };

  if (loading) {
    return <h3 className="text-center">Loading...</h3>;
  }

  return (
    <>
      <div className="row mb-4">
        <div className="col-md-3">
          <select
            className="form-control"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Default</option>
            <option value="likes_high_to_low">Most Liked</option>
            <option value="price_low_to_high">Price Low to High</option>
            <option value="price_high_to_low">Price High to Low</option>
          </select>
        </div>
      </div>

      <div className="row">
        {items.slice(0, visibleItems).map((item, index) => (
          <div
            className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
            key={item.id || item.nftId || index}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link to="/author">
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              <div className="nft__item_wrap">
                <Link to="/item-details">
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt={item.title}
                  />
                </Link>
              </div>

              <div className="nft__item_info">
                <Link to="/item-details">
                  <h4>{item.title}</h4>
                </Link>

                <div className="nft__item_price">{item.price} ETH</div>

                <div className="nft__item_action">
                  <Link to="/item-details">Place a bid</Link>
                </div>

                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleItems < items.length && (
        <div className="col-md-12 text-center mt-4">
          <button className="btn-main lead" onClick={loadMore}>
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
