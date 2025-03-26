import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

import axios from 'axios';
import Countdown from "../home/Countdown";
import Skeleton from "../UI/Skeleton";
import Card from "../Card";

const ExploreItems = () => {
  const [loading, setLoading] = useState([])
    const [data, setData] = useState([])
    const [itemCount, setItemCount] = useState(8);

  useEffect(()=> {
    async function fetchExploreItems() {
      try {
        setLoading(true);
          const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/explore');
          console.log(response.data)
          setData(response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
      }
      setLoading(false);
  }

  fetchExploreItems();
  }, [])


  async function filterItems(filter) {
    setLoading(true)
 const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`)
 setData(response.data)
 setLoading(false)
 
  }


  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => filterItems(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ?
        new Array(8)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
          <Skeleton
            key={index}
            width={'100%'}
            height={400}
          /></div>
        )) :

      data.slice(0, itemCount).map((card) => (
        <div
          key={card.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >

         <Card data = {card} />
       


        </div>
      ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={()=>setItemCount(itemCount + 4)}>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;