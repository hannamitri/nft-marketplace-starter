import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";  
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useState, useEffect} from "react";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false); // Set loading to false once data is fetched
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="row">
        {new Array(8).fill(0).map((_, index) => (
          <div className="col-12 col-sm-6 col-lg-3" key={index}>
            <Skeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {new Array(8).fill(0).map((_, index) => (
        <div
          key={index}
          className="d-item col-12 col-sm-6 col-lg-3"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={AuthorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
           <Countdown
  expiryDate={new Date(Date.now() + 6 * 60 * 60 * 1000)}
/> 

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <button type="button" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </button>
                    <button type="button" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </button>
                    <button type="button" target="_blank" rel="noreferrer">
                      <i className="fa fa-envelope fa-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
              <Link to="/item-details">
                <img src={nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>Pinky Ocean</h4>
              </Link>
              <div className="nft__item_price">1.74 ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>69</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
