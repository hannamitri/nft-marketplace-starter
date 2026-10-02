import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  console.log("visibleItems:", visibleItems);
  console.log(items);
  console.log("FIRST AUTHOR ID:", items[0]?.authorId);

  const fetchItems = async (filter) => {
    const url = filter
      ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
      : `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`;
    const response = await axios.get(url);
    const data = await response.data;

    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <div data-aos="fade-up" data-aos-duration="500">
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => fetchItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {items.slice(0, visibleItems).map((item, index) => (
        <div
          key={index}
          data-aos="fade-up"
          data-aos-duration="500"
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt="" />
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
              <Link to={`/item-details?nftId=${item.nftId}`}>
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details?nftId=${item.nftId}`}>
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
      <div className="col-md-12 text-center">
        <Link
          to=""
          id="loadmore"
          onClick={() => setVisibleItems(visibleItems + 4)}
          className="btn-main lead"
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
