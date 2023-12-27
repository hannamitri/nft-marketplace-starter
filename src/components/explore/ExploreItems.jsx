import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ItemsCard from "../ItemsCard";
import Skeleton from "../Skeleton";

const ExploreItems = () => {
  const [users, setUsers] = useState([]);
  const [showItems, setShowItems] = useState(8);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`)
    setUsers(data)
  }
  
  
  async function filterItems(filter) {
    if(filter === "price_low_to_high") {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high`)
      setUsers( data )
    }

    if(filter === "price_high_to_low") {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low`)
      setUsers( data )
    }
    
    if(filter === "likes_high_to_low") {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low`)
      setUsers( data )
    }
  }
  
  useEffect(() => {
    fetchData()
    filterItems()
  }, [])
  
  setTimeout(() => {
    setLoading(false);
  }, 3000);
  
  function loadMore() {
    setShowItems(showItems + 4)
  }


  return (
    <>
      <div>
        <select id="filter-items" defaultValue=""  onChange={(event) => filterItems(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
          <Skeleton />
        )
       : (
        users.slice(0 , showItems).map((user) => (
          <div
          key={user.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
          >
          <ItemsCard Itemcard={user} />
          </div>
        ))
      )}
      {loading ? (
        <div className="col-md-12 text-center">
        <div className="skeleton-box"
        style={{width: "150px", height: "50px", borderRadius: "10px"}}>
       </div>
        </div>
      ) : (
        showItems < 16 &&
      <div className="col-md-12 text-center">
        <Link onClick={loadMore} to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
      )}
    </>
  );
};

export default ExploreItems;
