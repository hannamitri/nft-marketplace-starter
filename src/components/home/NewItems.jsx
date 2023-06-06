import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NewItems = () => {
  const [data, setData] = useState([]);
  const [countdowns, setCountdowns] = useState({});

  async function fetchNewItemsData() {
    let { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setData(data);
    console.log(data);
    calculateTime();
  }

  const calculateTime = () => {
    const timesArr = data.filter((item) => 
        item.expiryDate !== null
    )
    timesArr.map((item) => {
      
        const time = item.expiryDate - Date.now();
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const seconds = Math.floor((time / 1000) % 60);

        setCountdowns((previousCountdowns) => ({
          ...previousCountdowns,

          [item.id]: { hours, minutes, seconds },
        }));
      
    });
    console.log(countdowns);
  };

     useEffect(() => {
       const interval = setInterval(() => calculateTime(), 1000);
      return () => clearInterval(interval);
     });

  useEffect(() => {
    fetchNewItemsData();
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
          {data.map((newItem) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={newItem.id}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={newItem.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                
                  {countdowns[newItem.id] ? (
                    <div className="de_countdown">
                      {countdowns[newItem.id].hours}h{" "}
                      {countdowns[newItem.id].minutes}m{" "}
                      {countdowns[newItem.id].seconds}s
                    </div>
                  ) :
                  null
                }
                

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
                      src={newItem.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{newItem.title}</h4>
                  </Link>
                  <div className="nft__item_price">{newItem.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{newItem.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
