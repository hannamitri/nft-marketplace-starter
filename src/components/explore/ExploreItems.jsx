/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import CountdownTimer from "../home/CountdownTimer";

const ExploreItems = () => {

  const [explore, setExplore] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [visible, setVisible] = useState(8);
  const [filter, setFilter] = useState([]);

  const showMoreProfile = () => {
    setVisible((prevValue) => prevValue + 4)
  }  

  useEffect((data) => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      )
      .then((res) => {
        setExplore(res.data);
        setLoading(false);
        console.log(res.data)
      })

      .catch((err) => console.log(err));
  }, []);

  if ( filter === "price_low_to_high") {
    explore.sort((a,b) => a.price - b.price)
  }
  else if (filter === "price_high_to_low"){
    explore.sort((a,b) => b.price - a.price)
  }
  else if (filter === "likes_high_to_low") {
    explore.sort((a,b) => b.likes - a.likes)
  }

  function filterProfile(event) {
    setFilter(event.target.value)
  };


  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={filterProfile}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading 
      ? new Array(8).fill(0).map((_, Skeleton) => (
        <div
          key={Skeleton}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={AuthorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">5h 30m 32s</div>

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
              <Link to="/item-details">
                <img src={nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>Pinky Ocean</h4>
              </Link>
              <div className="nft__item_price">1.74 ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>69</span>
              </div>
            </div>
          </div>
        </div>
      ))      
      : explore.slice(0,visible).map((e, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={e.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">
            <CountdownTimer targetDate={e.expiryDate} />
            </div>

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
              <Link to="/item-details">
                <img src={e.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{e.title}</h4>
              </Link>
              <div className="nft__item_price">{e.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{e.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
        {visible < explore.length &&  (
        <button onClick={showMoreProfile} className="btn-main lead">Load More</button>
      )}
        
        {/* <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link> */}
      </div>
    </>
  );
};

export default ExploreItems;
