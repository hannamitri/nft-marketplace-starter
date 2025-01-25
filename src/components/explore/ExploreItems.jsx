import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";
import Skeleton from "../UI/Skeleton";
import axios from "axios";

const ExploreItems = () => {
  const [maxLength, setMaxLength] = useState(8);
  const [filter, setFilter] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`);
      setData(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => setFilter(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {data.length > 0 ? (
        <>
          {data.slice(0, maxLength).map((item, index) => (
            <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ display: "block", backgroundSize: "cover" }}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${item.authorId}`} data-bs-toggle="tooltip" data-bs-placement="top">
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                <Countdown item={item} data={data} setData={setData} />

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
                    <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
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

          {maxLength < data.length && (
            <div className="col-md-12 text-center">
              <Link to="" id="loadmore" className="btn-main lead" onClick={() => setMaxLength((prev) => prev + 4)}>
                Load more
              </Link>
            </div>
          )}
        </>
      ) : (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ display: "block", backgroundSize: "cover" }}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra"></div>
                  <Link to="">
                    <Skeleton width="100%" height="350px" />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>
                      <Skeleton width="100%" height="18px" />
                    </h4>
                  </Link>
                  <div className="nft__item_price">
                    <Skeleton width="50%" height="18px" />
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default ExploreItems;
