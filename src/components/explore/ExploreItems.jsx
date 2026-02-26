import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../countdown/Countdown";

const ExploreItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(8);
  const [filter, setFilter] = useState("");

  const loadMore = () => {
    setVisible((prev) => prev + 4);
  }

  async function fetchData() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`)
  setData(data);
  setFilter("");
  setLoading(false);
  }

  function handleFilterChange(filterValue) {
    switch (filterValue) {
      case "price_high_to_low":
        return setData(
          data
          .slice()
          .sort(
            (a, b) =>
              (b.price) - 
              (a.price)
            )
        );
        case "price_low_to_high":
          return setData(
            data
            .slice()
            .sort(
              (a, b) =>
                (a.price) - 
                (b.price)
              )
          );
          case "likes_high_to_low":
            return setData (
              data.slice().sort((a, b) => b.likes - a.likes)
            );
            default:
              break;
    }
  }


  useEffect(() => {
    fetchData();
  }, [])
 
  return (
    <>
      <div>
        <select 
        id="filter-items" 
        defaultValue={"Default"} 
        onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="Default" disabled>Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
          new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item placeholder-glow">
                <div className="author_list_pp placeholder-glow">
                  <span className="placeholder rounded-circle" style={{ width: "50px", height: "50px", display: "block" }} />
                </div>
                <div className="de_countdown placeholder-glow">
                  <span className="placeholder w-100" style={{ height: "20px", display: "block" }} />
                </div>
                <div className="nft__item_wrap plceholder-glow">
                  <span className="placeholder w-100" style={{ height: "200px", display: "block" }} />
                </div>
                <div className="nft__item_info placeholder-glow">
                  <span className="placeholder w-75 mb-2" style={{ display: "block" }}></span>
                  <span className="placeholder w-25" style={{ display: "block" }}></span>
                </div>
              </div>
            </div>
          ))
      ) : (
        data.slice(0, visible).map((item, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {item.expiryDate && (
              <div className="de_countdown">
                <Countdown expiryDate={(item.expiryDate)} />
              </div>
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
              <Link to={`/item-details/${item.nftId}`}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
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
      ))
      )}
      
      {visible < data.length && (
        <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={() => loadMore()}>
          Load more
        </Link>
      </div>
      )}
    </>
  );
};

export default ExploreItems;
