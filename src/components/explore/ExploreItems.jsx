import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Item from "../home/Item";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreData, setExploreData] = useState([]);
  const [displayCards, setDisplayCards] = useState(8)
  const [loading, setLoading] = useState(true);

  async function fetchExploreData() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setExploreData(data);
    } catch (error) {
      console.error("Couldn't load", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }

  async function filterCards(filter) {
    try {
      setLoading(true)
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`)
      setExploreData(data);
    } catch (error) {
      console.error("Couldn't load", error)
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }

  useEffect(() => {
    fetchExploreData();
  }, []);

  console.log(exploreData)

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => filterCards(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        new Array(8).fill(0).map((_, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index}>
            <div className="nft_coll nft_coll--loading">
              <div className="nft_wrap">
                <Skeleton width="100%" height="80%" />
              </div>
              <div className="nft_coll_pp--loading">
                <Skeleton width="60px" height="60px" borderRadius={'50%'} />
              </div>
              <div className="nft_coll_info--loading">
                <Skeleton width="120px" height="18px" />
                <div className="margin">
                  <Skeleton width="56px" height="18px" />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="row">
          {exploreData?.slice(0, displayCards).map((exploreCard) => (
            <div
              key={exploreCard.id}
              className="d-item col-lg-3 col-md-4 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Item item={exploreCard} />
            </div>
          ))}
        </div>
      )}

      {displayCards < 16 ?
        <div className="col-md-12 text-center" onClick={() => setDisplayCards(displayCards + 4)}>
          <Link to="" id="loadmore" className="btn-main lead">
            Load more
          </Link>
        </ div>
        :
        <></>
      }
    </>
  );
};

export default ExploreItems;
