import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Time from "../UI/Time.jsx";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AOS from "aos";
import "aos/dist/aos.css";

const ExploreItems = ({ fethURL }) => {
  const [cards, setCards] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState("");

  const base_url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
  async function fetchFilteredNFTs(value) {
    try {
      const response = await fetch(`${base_url}?filter=${value}`);
      if (!response.ok) {
        throw new Error(`Error fetching NFTs: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  }

  useEffect(() => {
    async function applyFilter() {
      setLoading(true);
      const data = await fetchFilteredNFTs(filter);
      setCards(data);
      setVisibleCount(8);
      setLoading(false);
    }
    applyFilter();
  }, [filter]);

  useEffect(() => {
    AOS.init({
      offset: 0,
      duration: 500,
      easing: "ease-in-out",
      mirror: true,
      once: true,
    });
  }, []);

  useEffect(() => {
         const timeout = setTimeout(() => {
      AOS.refreshHard();  
    }, 300);
  
    return () => clearTimeout(timeout);
  }, [cards,]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      <div data-aos="fade-in" data-aos-duration="800" data-aos-delay="100">
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {Loading ? (
        <>
          {new Array(8).fill(0).map((__, index) => (
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
                    <img className="lazy" src="#" alt="" />
                    <Skeleton width={50} height={50} borderRadius={99} />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <Skeleton height={20} width="100%" />
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
                    <img src="#" className="lazy nft__item_preview" alt="" />
                    <Skeleton width={282} height={270} />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4></h4>
                  </Link>
                  <div className="nft__item_price">
                    <Skeleton height={20} width="40%" />
                  </div>
                  <Skeleton height={20} width="100%" />
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        cards.slice(0, visibleCount).map((item, index) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 fade-special"
            style={{ display: "block", backgroundSize: "cover" }}
            data-aos="fade-in"
            data-aos-anchor-placement="center"
            data-aos-delay={(index % 4) * 100}
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
              <Time nft={item} />
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
                <Link to={`/item-details/${item.nftId}`}>
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
        ))
      )}
      {!Loading && visibleCount < cards.length && (
        <div
          className="col-md-12 text-center"
          data-aos="fade-in"
          data-aos-offset="1"
          data-aos-delay="500"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-anchor-placement="center"
        >
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
