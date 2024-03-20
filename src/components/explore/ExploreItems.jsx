import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const ExploreItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  const [link, setLink] = useState(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
  );
  const [filterValue, setFilterValue] = useState('')

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(link);
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getData();
    console.log(data);
  }, [link]);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  function changeLink() {
    if (filterValue === ''){
      setLink("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
    }

    else {
      setLink(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`)
    }
  }

  useEffect(() => {
    changeLink();
  }, [filterValue])

  function convertTime(time) {
    let dateObj = new Date(time * 1000);
    // Get hours from the timestamp
    let hours = dateObj.getUTCHours();

    // Get minutes part from the timestamp
    let minutes = dateObj.getUTCMinutes();

    // Get seconds part from the timestamp
    let seconds = dateObj.getUTCSeconds();

    let formattedTime =
      hours.toString() +
      "h " +
      minutes.toString().padStart(2, "0") +
      "m " +
      seconds.toString().padStart(2, "0") +
      "s";

    return formattedTime;
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
          <option value="" onClick={() => changeLink()}>Default</option>
          <option value="price_low_to_high" onClick={() => changeLink()}>Price, Low to High</option>
          <option value="price_high_to_low" onClick={() => changeLink()}>Price, High to Low</option>
          <option value="likes_high_to_low" onClick={() => changeLink()}>Most liked</option>
        </select>
      </div>
      {loading ? (
        <div className="explore-skeleton">
          {new Array(8).fill(0).map((item, index) => (
            <div
              className="skeleton loading-animation"
              style={{
                margin: "15px",
                height: "450px",
                width: "300px",
                flex: "1 0 250px",
              }}
              key={index}
            ></div>
          ))}
        </div>
      ) : (
        data.slice(0, visibleItems).map((item, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item" style={{ width:'100%' }}>
              <div className="author_list_pp">
                <Link
                  to="/author"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {item.expiryDate ? (
                <div className="de_countdown">
                  {convertTime(item.expiryDate)}
                </div>
              ) : null}

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
      )}
      <div className="col-md-12 text-center">
        {visibleItems < data.length && (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
