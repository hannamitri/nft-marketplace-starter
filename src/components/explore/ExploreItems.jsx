import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "./Countdown";
import Skeleton from "../UI/Skeleton";


const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")
  const [sortBy, setSortBy] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    let active = true;

    async function fetchItems() {
      if (active) setLoading(true);
      try {
        const baseUrl = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
        const url = sortBy ? `${baseUrl}?filter=${sortBy}` : baseUrl;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch explore items");
        }
        const data = await response.json();
        
        if (active) {
          setItems(data);
        }
      } catch (error) {
        console.error("Error fetching explore items:", error);
      } finally {
        if (active) setLoading(false);
      }
    }
  

    fetchItems();

    return () => {
      active = false;
    };
  }, [sortBy]);


  return (
    <>
      <div>
        <select id="filter-items" value={sortBy} onChange={(e) => {
          setSortBy(e.target.value);
          setVisibleCount(8);
        }}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      <div className="row">
      {loading ? (
        Array.from({ length: 8 }, (_, index) => (
        <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ display: "block", minHeight: "300px", padding: "10px" }}>
          <div className="skeleton-card">
            <Skeleton width="100%" height="200px" borderRadius="10px" />
            <div style={{ marginTop: "20px" }}>
              <Skeleton width="70%" height="20px" borderRadius="5px" />
              <div style={{ marginTop: "10px" }}>
                <Skeleton width="40%" height="15px" borderRadius="5px" />
              </div>
            </div>
          </div>
        </div>
      ))
      ) : (
        items.slice(0, visibleCount).map((item) => (
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
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <Countdown expiryDate={item.expiryDate} />

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
      ))
      )}
      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button type="button" id="loadmore" className="btn-main lead"
          onClick={() => setVisibleCount((prev) => prev + 4)}>
          Load more
        </button>
      </div>
      )}
      </div>
    </>
  );
};

export default ExploreItems;
