import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FetchData from "../hoc/FetchData";
import Countdown from "../home/Countdown";
import axios from "axios";

const API_URL =
  `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`;

const ExploreItems = () => {

  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  useEffect(() =>{
    const fetchData = async () => {
      try {
        const {data} = await axios.get(`${API_URL}?filter=${filterValue}`)
        console.log("Fetched data:", data)
        setFilteredData(data)
      } catch (error) {
        console.error("Error Massage:", error)
      }
    }
    fetchData()
  },[filterValue])

  const sortData = (data) => {
    switch (filterValue) {
      case "price_low_to_high":
        return data.slice().sort((a, b) => a.price - b.price);
      case "price_high_to_low":
        return data.slice().sort((a, b) => b.price - a.price);
      case "likes_high_to_low":
        return data.slice().sort((a, b) => b.likes - a.likes);
      default:
        return data;
    }
  };
  
  

  const loadMore = () => {
    console.log("Loading More Data");
  };



  return (
    <>
      <div>
       
        <select id="filter-items" value={filterValue} onChange={handleFilterChange}>
          <option value="all">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      <FetchData data={filteredData} apiUrl={API_URL}>
        {(fetchedData) =>
          sortData(fetchedData).map ((item, index) => (
            <div
              key={index}
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
                  <div className="de_countdown"><Countdown expiryDate={item.expiryDate} /></div>
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/author/${item.authorId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.authorId}`}>
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
          ))
        }
      </FetchData>
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={loadMore}>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
