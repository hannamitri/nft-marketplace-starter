import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import NewItem from "../home/NewItem";
import NewItemSkeleton from "../home/NewItemSkeleton";


const ExploreItems = () => {
const [items, setItems] = useState([]);
const [itemsVisible, setItemsVisible] = useState(8);


async function getData(filter) {
  setItems([])
  const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${filter ? `?filter=${filter}` : ''}`);
  setItems(data)
  console.log(data)
}

useEffect(() => {
  getData()
}, [])

const onFilterChange = (e) => {
  getData(e.target.value)
}

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={onFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {
        items.length ? items
        .slice(0, itemsVisible).map(item => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <NewItem item={item} />
          </div>
      )) : (
        new Array(8).fill(0).map((_, index) => (
          <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
            >
              <NewItemSkeleton />
            </div>
        ))
      )
      }
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
