import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Timer from "../home/Timer";

const ExploreItems = () => {
  const [explore, setExplore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(8);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const handleFilterChange = (event) => {
    setLoading(true);

    let filterURL = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${event.target.value}`;
    if (event.target.value === "default") {
      filterURL =
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore/";
    }
    axios.get(filterURL).then((data) => {
      setExplore(data.data);
      setLoading(false);
    });
  };

  async function fetchExploreItems() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
    );
    setExplore(data);
    console.log(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchExploreItems();
    setLoading(true);
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue="DEFAULT"
          onChange={handleFilterChange}
        >
          <option value="default">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp skeleton__author">
                  <img className="lazy " alt="" />
                  <i className="fa fa-check"></i>
                </div>
                <div className="de_countdown skeleton-countdown" />
                <div className="nft__item_wrap skeleton__wrap">
                  <div className="nft__item_extra skeleton__img" />
                </div>
                <div className="nft__item_info">
                  <h4 className="skeleton__title"></h4>
                  <div className="nft__item_price skeleton__price"></div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : explore?.slice(0, visible).map((explore) => (
            <div
              key={explore.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${explore.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={explore.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {explore.expiryDate ? (
                  <div className="de_countdown">
                    <Timer expiryDate={explore.expiryDate} />{" "}
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
                  <Link to={`/item-details/${explore.nftId}`}>
                    <img
                      src={explore.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${explore.nftId}`}>
                    <h4>{explore.title}</h4>
                  </Link>
                  <div className="nft__item_price">{explore.price}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{explore.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="col-md-12 text-center" onClick={showMoreItems}>
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
