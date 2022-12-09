import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SkeletonCard from "../UI/SkeletonCard";
import CountdownTimer from "../home/CountDownTimer";
import { slice } from "lodash";

const ExploreItems = () => {

  const baseUrl =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
    
  const [sellers, setSellers] = useState([])
  const [showMoreItems, setShowMoreItems] = useState(false)
  const [index, setIndex] = useState(8)
  const [loading, setLoading] = useState(false)
  const intialPosts = slice(sellers, 0, index)

  async function getSellers() {
    const { data } = await axios.get(
      `${baseUrl}`)
    setSellers(data)
    setLoading(true)
  }

  async function filterCollection(filter) {
    setLoading(true)
    const { data } = await axios.get(
      `${baseUrl}?filter=${filter}`)
    setSellers(data)
    setLoading(false)
  }

  function loadMore() {
    setIndex(index + 4);
    if (index >= sellers.length - 4) {
      setShowMoreItems(true);
    }else{
      setShowMoreItems(false)
    }
  };

  useEffect(() => {
    getSellers()
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" 
        onChange={(event) => filterCollection(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ?
        (
          <SkeletonCard 
          itemNo={8} 
          className={"col-lg-3 col-md-6 col-sm-6 col-xs-12"}/>
        ) : (
          intialPosts.map((seller, index) => {
            return (
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
                      <img className="lazy" src={seller.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {seller?.expiryDate ? (
                        <CountdownTimer targetDate={seller.expiryDate} />
                      ) : (
                        <div className="de_countdown">00h 00m 00s</div>
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
                    <Link to="/item-details">
                      <img src={seller.nftImage} className="lazy nft__item_preview" alt="" />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>Pinky Ocean</h4>
                    </Link>
                    <div className="nft__item_price">{seller.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{seller.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )
      }
    <div className="col-md-12 text-center">
      { !showMoreItems ?
      (
        <Link to="" id="loadmore" className="btn-main lead" onClick={loadMore}>
          Load more
        </Link>
        ) : (
        null)
      }
      </div>
    </>
  );
};

export default ExploreItems;
