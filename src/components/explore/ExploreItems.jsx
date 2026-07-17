import React from "react";
import { Link } from "react-router-dom";
import Countdown from "../home/Countdown";
import { useState, useEffect } from "react";
import axios from "axios";
import NFTSkeleton from "../home/NFTSkeleton";

async function getExploreNFTs(sortOrder) {
  try {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${sortOrder}`,
    );
    return response.data;
    // Data is already parsed and ready inside response.data
  } catch (error) {
    console.error("Request failed:", error.message);
  }
}

const PAGE_SIZE = 8;
const PAGE_ADDITION = 4; // however many more to reveal per click

const ExploreItems = () => {
  const [sortOrder, setSortOrder] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [NFTData, setNFTData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getExploreNFTs(sortOrder).then((data) => {
      setNFTData(data);
      setIsLoading(false);
    });
  }, [sortOrder]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <NFTSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {NFTData.slice(0, visibleCount).map(
            (
              {
                id,
                authorId,
                authorImage,
                nftImage,
                nftId,
                title,
                price,
                likes,
                expiryDate,
              },
              index,
            ) => (
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
                      <img className="lazy" src={authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  {expiryDate === null ? (
                    " "
                  ) : (
                    <div className="de_countdown">
                      <Countdown expiryTime={expiryDate} />
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
                    <Link to="/item-details">
                      <img
                        src={nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{title}</h4>
                    </Link>
                    <div className="nft__item_price">{price}</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
          {visibleCount < NFTData.length && (
            <div className="col-md-12 text-center">
              <button
                type="button"
                className="btn-main lead"
                onClick={() => setVisibleCount((prev) => prev + PAGE_ADDITION)}
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ExploreItems;
