import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import ReusableItemsCountdown from "./ReusableItemsCountdown";
import Filter from "./Filter";

const ExploreItems = () => {
  
  const [visibleItems, setVisibleItems] = useState(8); 
  const loadMore = () => {
    setVisibleItems((prev) => prev + 4)
  }; 

  const [filter, setFilter] = useState("");
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setVisibleItems(8);
  };

  const [eItems, setEItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  const fetchEItems = async () => {

    try {

      const url = filter
        ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
        : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

      const response = await axios.get(url);

      setEItems(response.data);

    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchEItems();

  }, [filter]);

  useEffect (() => {
    const fetchEItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );

        console.log(response.data); 

        setEItems(response.data);
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEItems();
  }, []);

  if (loading) {
    return (
      <>
      {new Array(8).fill(0).map((_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
        >
          <div className="nft__item skeleton-card">

            <div className="author_list_pp">
              <div className="skeleton-author-image"></div>
            </div>

            <div className="skeleton-preview-image"></div>

            <div className="skeleton-info">
              <div className="skeleton-title"></div>

              <div className="skeleton-price"></div>

              <div className="skeleton-likes"></div>
            </div>

          </div>
        </div>
      ))}
    </>
    )
  } 

  if (loading) {
    return (
      <div>Placeholder Loading</div>
    )
  }
  
  return (
    <>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      {eItems.slice(0, visibleItems).map((eItem) => (
        <div
          key={eItem.id}
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
                <img className="lazy" src={eItem.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

              <ReusableItemsCountdown expiryDate={eItem.expiryDate}/>

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
                <img src={eItem.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{eItem.title}</h4>
              </Link>
              <div className="nft__item_price">{eItem.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{eItem.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
        {visibleItems < eItems.length && (
          <div className="col-md-12 text-center">
            <button id="loadmore"
              className="btn-main lead"
              onClick={loadMore}>
              Load More
            </button>  
          </div> 
        )}
      </div>
    </>
  );
};

export default ExploreItems;
