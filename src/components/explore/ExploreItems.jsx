import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Item from "../home/Item";
import ItemLoading from "../home/ItemLoading";

const ExploreItems = () => {
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [maxLength, setMaxLength] = useState(8);
  const [loadMoreButton, setLoadMoreButton] = useState(true);

  async function getItems() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );
    setItems(data);
    setLoading(false);
  }

  function filterItems(value) {
    setLoading(true);
    setFilter(value);
  }

  function loadMore() {
    setMaxLength((prev) => prev + 4);
    if (maxLength >= items.length - 4) {
      setLoadMoreButton(false);
    }
  }

  useEffect(() => {
    getItems();
  }, [filter]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterItems(event.target.value)}
        >
          <option value="" disabled>
            Sort
          </option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!loading &&
        items
          .slice(0, maxLength)
          .map((item, index) => (
            <Item
              item={item}
              key={index}
              index={index}
              classes={"d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"}
            />
          ))}
      {loading &&
        new Array(8)
          .fill(0)
          .map((_, index) => (
            <ItemLoading
            key={index}
              index={index}
              classes={"d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"}
            />
          ))}
      {loadMoreButton && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={loadMore}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
