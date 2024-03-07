import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Service from "../../service/service";
import Timer from "../UI/Timer";
import Skeleton from "../UI/Skeleton";
import Card from "../UI/Card";

const instialExploreItems = 8;
const nextRow = 4;

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState([]);
  const [next, setNext] = useState(instialExploreItems);

  const handleMoreExploreItems = () => {
    setNext(next + nextRow);
  };

  const getExploreItems = async () => {
    try {
      const data = await Service.fetchExploreItems();
      setLoading(false);
      setItems(data);
    } catch (error) {
      console.error("Error getting explore items", error);
      setLoading(false);
    }
  };

  const getFilterExploreItems = async (filter) => {
    setLoading(true);
    try {
      const data = await Service.fetchFilterExploreItems(filter);
      setItems(data);
    } catch (error) {
      console.error("Error getting explore items", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getExploreItems();
  }, []);
  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => {
            getFilterExploreItems(event.target.value);
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!loading && items.length > 0
        ? items?.slice(0, next)?.map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Card item={item} />
            </div>
          ))
        : new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width={50} height={50} borderRadius={9999} />
                  <i className="fa fa-check"></i>
                </div>

                <div className="nft__item_wrap">
                  <Skeleton width="100%" height="90%" borderRadius={10} />
                </div>
                <div className="nft__item_info">
                  <Skeleton width="70%" height={20} />
                  <div className="nft__item_price">
                    <Skeleton width="40%" height={20} />
                  </div>
                  <div className="nft__item_like">
                    <span>
                      <Skeleton width={40} height={20} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="col-md-12 text-center">
        {next < items.length && (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={handleMoreExploreItems}
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
