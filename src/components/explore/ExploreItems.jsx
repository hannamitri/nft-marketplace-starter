
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getExploreItems } from "../../API/nftAPI";
import AOS from "aos";


const ExploreItems = ({ sortType }) => {
  const [items, setItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  



useEffect(() => {
  const loadItems = async () => {
    try {
      const data = await getExploreItems();
      setItems(data);
      AOS.refresh();
    } catch (err) {
      console.error("Explore error:", err);
    } finally {
      console.log("Setting loading false");
      setLoading(false);
    }
  };

  loadItems();
}, []);

  

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {};
      items.forEach((item) => {
        const diff = item.expiryDate - Date.now();
        if (diff > 0) {
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          updated[item.nftId] = `${h}h ${m}m ${s}s`;
        } else {
          updated[item.nftId] = "";
        }
      });
      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [items]);

  const sortedItems = [...items].sort((a, b) => {
    if (sortType === "price_low") return a.price - b.price;
    if (sortType === "price_high") return b.price - a.price;
    if (sortType === "likes") return b.likes - a.likes;
    return 0;
  });

  if (loading) {
    return <div className="col-12 text-center">Loading...</div>;
  }

  return (
  <>
    <div className="row">
      {sortedItems.slice(0, visibleCount).map((item) => (
        <div
          key={item.nftId}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          data-aos="fade-up"
        >
          <div className="nft__item">

            <div className="author_list_pp">
              <Link to={`/author/${item.authorId}`}>
                <img
                  src={item.authorImage}
                  className="lazy"
                  alt=""
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            {timeLeft[item.nftId] && (
              <div className="de_countdown">
                {timeLeft[item.nftId]}
              </div>
            )}

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <Link to={`/item/${item.nftId}`}>
                    <span className="btn-main btn-fullwidth">
                      Place a Bid
                    </span>
                  </Link>
                </div>
              </div>

              <Link to={`/item/${item.nftId}`}>
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt={item.title}
                />
              </Link>
            </div>

            <div className="nft__item_info">
              <h4>
                <Link to={`/item/${item.nftId}`}>
                  {item.title}
                </Link>
              </h4>

              <div className="nft__item_price">
                {item.price} ETH
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

    {visibleCount < sortedItems.length && (
      <div className="col-12 text-center mt-4">
        <button
  className="btn-main"
  onClick={() => setVisibleCount((prev) => prev + 4)}
>
  Load More
</button>
      </div>
    )}
  </>
);
};
 
export default ExploreItems;
