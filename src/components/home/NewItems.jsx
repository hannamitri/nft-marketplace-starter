import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "./Countdown"; // Adjust the import based on your file structure
import Skeleton from "../UI/Skeleton";




const NewItems = () => {
  const [data, setData] = React.useState([]);

  async function getData() {
  const { data } = await axios.get(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
  );
  setData(data);
}

useEffect(() => {
  getData();
}, []);
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {data.length === 0 ? (
            // Skeleton loading state
            Array.from({ length: 4 }).map((_, idx) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={idx}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton width={50} height={50} borderRadius={"50%"} />
                  </div>
                  <div className="de_countdown">
                    <Skeleton width={100} height={20} borderRadius={8} />
                  </div>
                  <div className="nft__item_wrap">
                    <Skeleton width={250} height={250} borderRadius={16} />
                  </div>
                  <div className="nft__item_info">
                    <Skeleton width={120} height={20} borderRadius={8} />
                    <Skeleton width={60} height={20} borderRadius={8} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            data.map((elem, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={`Creator: ${elem.Creator}`}
                    >
                      <img className="lazy" src={elem.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="de_countdown">
                    <Countdown expiryDate={elem.expiryDate} />
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
                      <img
                        src={elem.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{elem.title}</h4>
                    </Link>
                    <div className="nft__item_price">{elem.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{elem.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
