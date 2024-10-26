import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Countdown from 'react-countdown';
import NFTCard from "../UI/NFTCard";
import SkeletonNFTCard from "../UI/SkeletonNFTCard";

const ExploreItems = () => {
  async function fetchExploreData(numberClicks) {
    const response = await axios.get(filterValue === "" ? "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore" : `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`);
    setExploreData(response.data.slice(0,8 + (numberClicks * 4)))

    setLoading(false)
  }

  function handleBtnClick() {
    fetchExploreData(numBtnClicks + 1);
    setNumBtnClicks(numBtnClicks + 1);
  }

  function filterChange(value) {
    setFilterValue(value)

  }


  const [loading, setLoading] = useState(true)
  const [exploreData, setExploreData] = useState([])
  const [numBtnClicks, setNumBtnClicks] = useState(0)
  const [filterValue, setFilterValue] = useState("")

  useEffect(() => {
    fetchExploreData(0);
  
    return () => {
      setExploreData([])
    }
  }, [])

  useEffect(() => {
    fetchExploreData(numBtnClicks)
  }, [filterValue])
  
  
  return (
    <>
      <div>
        <select onChange={(e) => filterChange(e.target.value)} id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (new Array(8).fill(0).map((_, index) => (
        <SkeletonNFTCard index={index} key={index} inSlider={false} />
      ))): (exploreData.map((item, index) => (
        <NFTCard 
            key={index}
            authorId={item.authorId} 
            authorImage={item.authorImage} 
            expiryDate={undefined} 
            nftId={item.nftId} 
            nftImage={item.nftImage} 
            title={item.title} 
            price={item.price} 
            likes={item.likes} 
            index={index} 
            inSlider={false} />
      )))}
      {numBtnClicks < 2 ? (<div className="col-md-12 text-center">
        <Link to="" onClick={() => handleBtnClick()} id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>): <></>}
    </>
  );
};

export default ExploreItems;
