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

  function LoadMore () {
    if (loaded < 16) generate(loaded + 4);
  }

  useEffect(() => {
    async function getData() {
      let end = '';
      if (option !== undefined) end = `?filter=${option}`
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${end}`
      );
      setData(response.data);
      setLoading(false);
    }
    getData();
  }, []);
  console.log(exploreData)
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {/* {exploreData.map((element, index) => (
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
                <img className="lazy" src={element.authorImage} alt="" />
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
                <img src={element.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{element.title}</h4>
              </Link>
              <div className="nft__item_price">1.74 ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{element.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))} */}

      {loading 
      ? 
        // insert skeleton state
        new Array(8).fill(0).map((element, index) => {
          return (
            <div key={element.id} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" 
            style={{ display: "block", backgroundSize: "cover" }}
            >
            <div className="skeleton-box" style={{width: "100%", height: "400px"}}></div>
            </div>
          )
        })
       : 
        // insert loaded code
        exploreData.slice(0, loaded).map((element, index) => {
          return (
            <div key={element.id} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" 
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
