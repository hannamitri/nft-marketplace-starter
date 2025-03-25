import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import SkeletonNftExplore from "../UI/SkeletonNftExplore";

const ExploreItems = () => {
  const [localNftData, setLocalNftData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [timeLeft, setTimeLeft] = useState(5 * 60 * 60 + 30 * 60 + 32);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const { authorId, id, nftId } = useParams();

  useEffect(() => {
    if (localNftData && localNftData.length > 0) {
      setIsLoading(false);
    }
  }, [localNftData]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
        );
        setLocalNftData(response.data);
      } catch (error) {
        console.error("There was an error fetching the NFT data!", error);
      } finally {
        setIsLoading(false);
      }
    };

  if (id) {
    fetchNFTs();
}

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);

  }, [id, filter]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);

          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);

  const minutes = Math.floor((timeLeft % 3600) / 60);

  const seconds = timeLeft % 60;

  const loadMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 4);
  };

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {isLoading ? (
            <div className="row">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <SkeletonNftExplore />
                </div>
              ))}
            </div>
          ) : (
            <>
      {localNftData.length > 0 &&
   localNftData.slice(0, visibleItems).map((nft, index) => (
        <div key={index}
        className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
        style={{ display: "block", backgroundSize: "cover" }}>
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${nft.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={nft.authorImage || id} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">{hours}h {minutes}m {seconds}s</div>

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
              <Link to={`/item-details/${nft.nftId}`}>
                <img src={nft.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${nft.nftId}`}>
                <h4>{nft.title}</h4>
              </Link>
              <div className="nft__item_price">{`${nft.price}`} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{nft.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
       </>
    )}
      <div className="col-md-12 text-center">
      {visibleItems < localNftData.length && (
        <Link to="#" id="loadmore" className="btn-main lead" onClick={loadMore}>
          Load more
        </Link>
      )}
      </div>
      </>
  );
};

export default ExploreItems;
