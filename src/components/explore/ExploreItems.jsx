import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import NewItemExplore from "../home/CarouselNewItems";
import UseItem from "../home/UseItem";

const ExploreItems = () => {
  const [exploreData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, generate] = useState(8);
  let [filter, setFilter] = useState("")

  function LoadMore () {
    if (loaded < 16) generate(loaded + 4);
  }

  function change (event) {
    setFilter(event.target.value);
    setLoading(true);
  }

  useEffect(() => {
    async function getData() {
      let end = '';
      if (filter.length !== 0) end = `?filter=${filter}`
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${end}`
      );
      setData(response.data);
      setLoading(false);
    }
    getData();
  }, [filter]);

  
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={change}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading 
      ? 
        new Array(8).fill(0).map((element, index) => {
          return (
            <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" 
            style={{ display: "block", backgroundSize: "cover" }}
            >
            <div className="skeleton-box" style={{width: "100%", height: "400px"}}></div>
            </div>
          )
        })
       : 
        exploreData.slice(0, loaded).map((element, index) => {
          return (
            <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" 
            style={{ display: "block", backgroundSize: "cover" }}
            >
            <UseItem card={element} />
            </div>
          )
        })
      }

      <div className="col-md-12 text-center">
        {loaded < 16 
          ? 
          <button to="" id="loadmore" className="btn-main lead" onClick = {LoadMore}>Load more</button>
          :
          <></>
        }
      </div>
    </>
  );
};

export default ExploreItems;
