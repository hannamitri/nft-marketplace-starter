import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton.jsx";

const ExploreItems = () => {
  const { nftId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeftList, setTimeLeftList] = useState([]);
  const [items, setItems] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(8);

  const fetchFilteredItems = async (value) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`
      );
      const resultData = response.data;
      if (Array.isArray(resultData) && resultData.length > 0) {
        setData(resultData);
        setItems(resultData);
        const initialTimes = resultData.map((item) =>
          item.expiryDate ? item.expiryDate - Date.now() : null
        );
        setTimeLeftList(initialTimes);
      } else {
        console.error("Error: No valid data returned.");
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setLoading(false);
    }
  };

  function filterItems(value) {
    console.log(value);
    if (value !== "DEFAULT") {
      fetchFilteredItems(value);
    } else {
      setItems(data);
    }
  }

  const convertMilliseconds = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours === 0 && minutes === 0 && seconds === 0) {
      return "Expired";
    }
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        const resultData = response.data;

        if (Array.isArray(resultData) && resultData.length > 0) {
          setData(resultData);
          setItems(resultData);
          const initialTimes = resultData.map((item) =>
            item.expiryDate ? item.expiryDate - Date.now() : null
          );
          setTimeLeftList(initialTimes);
        } else {
          console.error("Error: No valid data returned.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [nftId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeftList((prevTimeLeft) =>
        prevTimeLeft.map((timeLeft, index) =>
          data[index]?.expiryDate ? Math.max(timeLeft - 1000, 0) : null
        )
      );
    }, 300);
    return () => clearInterval(interval);
  }, [data]);

  const loadMoreItems = () => {
    if (itemsToShow + 4 >= items.length) {
      setItemsToShow(items.length);
    } else {
      setItemsToShow((prevItemsToShow) => prevItemsToShow + 4);
    }
  };

  return (
    <>
      <section aria-label="section">
        <div className="container">
          <div className="row wow fadeIn" style={{ visibility: "visible" }}>
            <div>
              <select
                id="filter-items"
                defaultValue=""
                onChange={(event) => filterItems(event.target.value)}
              >
                <option value="">Default</option>
                <option value="price_low_to_high">Price, Low to High</option>
                <option value="price_high_to_low">Price, High to Low</option>
                <option value="likes_high_to_low">Most liked</option>
              </select>
            </div>
            {loading ? (
              <div className="row">
                {new Array(8).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    style={{ display: "block", backgroundSize: "cover" }}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div
                        className="nft__item_wrap"
                      >
                        <Skeleton
                          width="200px"
                          height="150px"
                          borderRadius="5px"
                        />
                      </div>
                      <div
                        className="nft__item_info"
                        style={{ textAlign: "left" }}
                      >
                        <Skeleton
                          width="70%"
                          height="20px"
                          borderRadius="0px"
                        />
                        <div className="nft__item_price">
                        <Skeleton
                          width="40%"
                          height="18px"
                          borderRadius="5px"
                        />
                      </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : items.length > 0 ? (
              <div className="row">
                {items.slice(0, itemsToShow).map((item) => (
                  <div
                    key={item.nftId}
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
                      {item.expiryDate && (
                        <div className="de_countdown">
                          {convertMilliseconds(item.expiryDate - Date.now())}
                        </div>
                      )}
                      <div className="nft__item_wrap">
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
                ))}
              </div>
            ) : (
              <div>No items available.</div>
            )}
            {itemsToShow < items.length && (
              <div className="col-md-12 text-center">
                <Link
                  to="#"
                  id="loadmore"
                  className="btn-main lead"
                  onClick={loadMoreItems}
                >
                  Load more
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ExploreItems;