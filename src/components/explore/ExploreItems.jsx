import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewItem from "../home/NewItem";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayIndex, setDisplayIndex] = useState(8);
  const [value, setValue] = useState("");

  useEffect(() => {
    async function getItems() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`,
      );
      return data;
    }

    async function load() {
      const results = await getItems();
      setItems(results);
      setLoading(false);
    }
    load();
  }, [value]);

  useEffect(() => {
    setDisplayIndex(8);
  }, [value]);

  function loadMore() {
    setDisplayIndex((prev) => prev + 4);
  }

  function filterItems(filterValue) {
    setValue(filterValue);
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          onChange={(e) => filterItems(e.target.value)}
          defaultValue=""
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((_, i) => (
            <div
              data-aos="fade-in"
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ backgroundSize: "cover", display: "block" }}
              key={i}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <i className="fa fa-check"></i>
                </div>
                <div className="de_countdown">
                  <Skeleton width="80px" height="20px" />
                </div>
                <div className="nft__item_wrap">
                  <Skeleton width="20px" height="20px" borderRadius="10px" />
                </div>
                <div className="nft__item_info">
                  <Skeleton
                    width="120px"
                    height="20px"
                    style={{ marginBottom: "10px" }}
                  />
                  <div className="nft__item_price">
                    <Skeleton width="80px" height="20px" />
                  </div>
                  <div className="nft__item_like">
                    <Skeleton width="30px" height="20px" />
                  </div>
                </div>
              </div>
            </div>
          ))
        : items.slice(0, displayIndex).map((item) => (
            <NewItem
              item={item}
              author={item}
              style={{
                display: "block",
                backgroundSize: "cover",
              }}
              key={item.id}
            />
          ))}

      {displayIndex !== 16 ? (
        <div className="col-md-12 text-center">
          <Link
            to=""
            onClick={loadMore}
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ExploreItems;
