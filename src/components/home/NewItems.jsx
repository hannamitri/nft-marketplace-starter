import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Carousel from "../UI/Carousel";
import CountdownTimer from "../UI/CountdownTimer";
import Skeleton from "../UI/Skeleton";

const NewItemSkeleton = () => (
  <div className="new-item-slide">
    <div className="nft__item">
      <div className="author_list_pp">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>

      <div className="nft__item_wrap">
        <Skeleton width="100%" height="350px" borderRadius="8px" />
      </div>

      <div className="nft__item_info">
        <Skeleton width="70%" height="18px" borderRadius="4px" />
        <br />
        <Skeleton width="35%" height="16px" borderRadius="4px" />
        <Skeleton width="20%" height="16px" borderRadius="4px" />
      </div>
    </div>
  </div>
);

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

 useEffect(() => {
  axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
    .then(response => {
      setItems(response.data);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
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
          <Carousel>
          {loading
            ? Array.from({ length: 4 }, (_, index) => (
                <NewItemSkeleton key={index} />
              ))
            : items.map((item) => (
            <div className="new-item-slide" key={item.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={item.authorImage} alt={item.title} />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate && (
                  <div className="de_countdown">
                    <CountdownTimer expiryDate={item.expiryDate} />
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

                  <Link to='/item-details'>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title}
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
          ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
