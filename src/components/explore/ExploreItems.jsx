import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Countdown from "../UI/Countdown";
import Skeleton from "../UI/Skeleton";
const ExploreItems = () => {
  const [isData, setIsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(8);

  async function fetchData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setIsData(data);
    setLoading(false);
  }
  async function fetchFilteredData(value) {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`
    );
    setIsData(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => fetchFilteredData(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading === true ? (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={``}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a
                          href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                          target="_blank"
                        >
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a
                          href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                          target="_blank"
                        >
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to={``}>
                    <Skeleton width="100%" height="350px" />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={``}>
                    <Skeleton width="180px" height="30px" />
                  </Link>
                  <Skeleton width="100px" height="20px" />
                </div>
                <div className="nft__item_like">
                  <Skeleton width="30px" height="15px" />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {isData.slice(0, loadMore).map((item, index) => (
            <div
              key={index}
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
                <div className="de_countdown">
                  {<Countdown time={item.expiryDate} />}
                </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a
                          href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a
                          href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
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
          ))}
        </>
      )}

      <div className={loadMore != 16 ? "col-md-12 text-center" : " hide"}>
        <Link
          to=""
          id="loadmore"
          className={"btn-main lead"}
          onClick={() => {
            if (loadMore != 16) {
              setLoadMore(loadMore + 4);
            }
          }}
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
