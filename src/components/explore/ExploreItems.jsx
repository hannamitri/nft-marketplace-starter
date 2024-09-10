import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import ExpiryTimer from "../UI/ExpiryTimer";
import ExploreCard from "../UI/ExploreCard";

const ExploreItems = () => {
  const [nft, setNft] = useState([]);
  const [img, setImg] = useState([]);
  const [cards, setCards] = useState(8)
  const [arrayFin, setArrayFin] = useState(false)
  let nftData;

  async function fetchNfts(filter) {
    setImg(false);
    if (filter) {
      nftData = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
      );
    } else {
      nftData = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
    }
    setNft(nftData.data);
    setImg(true);
  }
  

  useEffect(() => {
    fetchNfts();
  }, []);
  
  function loadMore() {
    setCards(cards + 4)
    if (cards >= nft.length-4) {
      setArrayFin(true)
    } else {
      setArrayFin(false)
    }
  }




  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => fetchNfts(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {img
        ? nft.slice(0, cards).map((nft) => (
          <div
          key={nft.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <ExploreCard 
          authorImage={nft.authorImage}
          nftImage={nft.nftImage}
          title = {nft.title}
          price={nft.price}
          likes={nft.likes}
          expiryDate={nft.expiryDate}
          id={nft.id}
          /> 
             </div>

        ))
        : new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item ">
                <div className="flex space-between ">
                  <div>
                    <div className=" skeleton-box  relative skeleton-dp" />
                    <div></div>
                    <div className="skeleton-box">5h 30m 32s</div>
                  </div>
                </div>

                <div className="nft__item_wrap">
                  <div className="skeleton-img skeleton-box" alt="" />
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <div className="skeleton-box">Pinky Ocean</div>
                  </Link>
                  <div className="nft__item_price skeleton-box">1.74 ETH</div>
                  <div className="nft__item_like">
                    <span className="skeleton-box"></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="col-md-12 text-center">
        {!arrayFin ?
        <Link to="" id="loadmore" className="btn-main lead" onClick={loadMore}>
          Load more
        </Link> : null

        }
      </div>
    </>
  );
};

export default ExploreItems;
