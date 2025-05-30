import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../UI/Api";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {
  const button = document.querySelector("#loadmorebutton");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [explore, setExplore] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [error, setError] = useState(null);

  const filterOption = (event) => {
    setFilter(`${event.target.value}`);
  };

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        const query = filter ? `?${filter}` : "";
        const data = await api.get(`/explore${query}`);
        setExplore(data.slice(0, itemsPerPage));
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load explore page");
      } finally {
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, [filter, itemsPerPage]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const selectPage = () => {
    setItemsPerPage(itemsPerPage + 4);
    if (itemsPerPage >= 12) {
      button.style.display = "none";
    }
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={filterOption}>
          <option value="">Default</option>
          <option value="filter=price_low_to_high">Price, Low to High</option>
          <option value="filter=price_high_to_low">Price, High to Low</option>
          <option value="filter=likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <div className="row">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton width="50px" height="50px" borderRadius="100px" />
                  </div>
                  <div className="de_countdown-skeleton">
                    <Skeleton
                      width="112.86px"
                      height="32px"
                      borderRadius="10px"
                    />
                  </div>
                  <div className="nft__item_wrap">
                    <Skeleton
                      width="264px"
                      height="264px"
                      borderRadius="10px"
                    />
                  </div>
                  <div className="nft__item_info">
                    <Skeleton width="264px" height="49px" borderRadius="5px" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="row">
          {explore.map((elem, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${elem.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={elem.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <Countdown expiryDate={elem.expiryDate} />
                <div className="nft__item_wrap">
                  <Link to="/item-details">
                    <img
                      src={elem.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{elem.title}</h4>
                  </Link>
                  <div className="nft__item_price">{elem.price}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{elem.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        id="loadmorebutton"
        className="col-md-12 text-center"
        onClick={selectPage}
      >
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
