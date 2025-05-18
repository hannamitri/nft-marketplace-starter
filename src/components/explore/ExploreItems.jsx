import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [explore, setExplore] = React.useState([]);
  const [moreItems, setMoreItems] = React.useState(8);
  const [isLoading, setIsLoading] = React.useState(true);

  async function fetchExplore() {
    const response = await fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
    );

    const data = await response.json();
    setExplore(
      data.map((item) => ({
        ...item,
        nftCountdown: calculateCountdown(item.expiryDate),
      }))
    );
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  function calculateCountdown(expiryDate) {
    if (!expiryDate) return "null";

    const now = Date.now();
    const targetTime = new Date(expiryDate).getTime();
    const difference = targetTime - now;

    if (difference <= 0) return "expired";

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  React.useEffect(() => {
    fetchExplore();

    const interval = setInterval(() => {
      setExplore((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          nftCountdown: calculateCountdown(item.expiryDate),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLoadMore = () => {
    setMoreItems((prev) => prev + 4);
  };

  function filterExplore(filter) {
    setIsLoading(true); // Show loading state while fetching data

    // Construct the API URL with the selected filter
    const apiUrl = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setExplore(
          data.map((item) => ({
            ...item,
            nftCountdown: calculateCountdown(item.expiryDate),
          }))
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
        setIsLoading(false);
      });
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => filterExplore(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </div>
                <div className="de_countdown">
                  <Skeleton width="100px" height="20px" />
                </div>
                <div className="nft__item_wrap">
                  <Skeleton width="100%" height="200px" />
                </div>
                <div className="nft__item_info">
                  <Skeleton width="100px" height="20px" />
                  <Skeleton width="50px" height="20px" />
                </div>
              </div>
            </div>
          ))
        : explore.slice(0, moreItems).map((ex, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${ex.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${ex.authorName}`}
                  >
                    <img className="lazy" src={ex.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {ex.nftCountdown && ex.nftCountdown !== "null" && (
                  <div className="de_countdown">
                    <span>{ex.nftCountdown}</span>
                  </div>
                )}
                <div className="nft__item_wrap">
                  <Link to={`/item-details/${ex.nftId}`}>
                    <img
                      src={ex.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${ex.nftId}`}>
                    <h4>{ex.title}</h4>
                  </Link>
                  <div className="nft__item_price">{ex.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{ex.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="col-md-12 text-center">
        {moreItems < explore.length && (
          <button
            onClick={handleLoadMore}
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
