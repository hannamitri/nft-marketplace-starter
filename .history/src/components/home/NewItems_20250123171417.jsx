import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";



const NewItems = () => {
  const [data, setData] = useState();
  const [currentTime, setcurrentTime] = useState();
  
let timerInt = setInterval(timeLeft, 1000);


async function getData() {
    try {
      const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
      setData(response.data)
        
      } catch (error) {
        if (error.response) {
          console.log('Error Response:' + error.response.data)
        } else if (error.request) {
          console.log('Error request:' + error.request)
        } else {
          console.log(error.message)
        }
      }
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
          {data ? (
            data.map((item, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <div className="nft__item">
              <div className="author_list_pp">
              <Link
              to="/author"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Creator: Monica Lucas"
                  >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                  </Link>
                </div>

                { function timeLeft() {
                  if (Date.now() < item.expiryDate) {
                    let sec = item.expiryDate -Date.now()
                  }
                }
                }
                <div className="de_countdown">15hr 17min 36s</div>
                
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
                src={item.nftImage}
                className="lazy nft__item_preview"
                alt=""
                />
                </Link>
                </div>
                <div className="nft__item_info">
                <Link to="/item-details">
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
            ) : (<>Skeleton!</>)
            }
        </div>
        </div>
        </section>
  );
};

export default NewItems;
