import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";

const NewItems = () => {
  const [items, setItems] = useState([]);
  console.log("MY ITEMS:", items);
  const [time, setTime] = useState(Date.now());
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const handlePrev = () => {
    setStartIndex((prev) => {
      if (prev === 0) {
        return Math.max(items.length - 4, 0);
      }

      return prev - 1;
    });
  };

  const handleNext = () => {
    setStartIndex((prev) => {
      if (prev >= items.length - 4) {
        return 0;
      }

      return prev + 1;
    });
  };

  const getTimeLeft = (expiryDate) => {
    const difference = expiryDate - time;

    if (difference <= 0) {
      return "Expired";
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  async function fetchNewItems() {
    try {
      const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
      const data = await response.json();

      console.log("API DATA:", data);
        console.log("FIRST ITEM:", data[0]);

      setItems(data);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching new items:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNewItems();
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
<button
  type="button"
  className="slider-arrow slider-arrow-left"
  onClick={handlePrev}
  
>
  <i className="fa fa-chevron-left"></i>
</button>
            
        {loading
  ? new Array(4).fill(0).map((_, index) => (
      <div
        className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
        key={index}
      >
        <div className="nft__item skeleton-card">
          <div className="skeleton-author"></div>
          <div className="skeleton-code"></div>
          <div className="skeleton-image"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-code"></div>
        </div>
      </div>
    ))
  : items.slice(startIndex, startIndex + 4).map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <div className="nft__item author-nft-card">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${item.authorId}`}
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">
                  {getTimeLeft(item.expiryDate)}
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

                  <Link to={`/item-details/${item.nftId}`}
                    state={{ item }}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
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
          ))}
          <button
  type="button"
  className="slider-arrow slider-arrow-right"
  onClick={handleNext}

>
  <i className="fa fa-chevron-right"></i>
</button>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
