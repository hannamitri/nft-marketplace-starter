import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const ExploreItems = ({nfts, loading}) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [filterType, setFilterType] = useState("");

  // Sort/filter the NFTs based on selected filter
  const filteredAndSortNfts = useMemo(()=>{
    let result =[...nfts];
    switch(filterType) {
      case "price_low_to_high" : 
      result.sort((a, b) => parseFloat(a.price)-parseFloat(b.price));
      break;
      case "price_high_to_low" :
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break;
      case "likes_high_to_low" : 
      result.sort((a, z)=> z.likes - a.likes);
      break;
      default:
        break;
    }
    return result;

  }, [nfts, filterType]);
  

  // Apply pagination to filtered results
  const visibleNft = filteredAndSortNfts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortNfts.length;
  
  const handleLoadMore = ()=>{
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleFilterChange = (e)=>{
    setFilterType(e.target.value);
    setVisibleCount(8); // Reset to 8 items when filter changes
  }

  return (
    <>
      <div>
        <select id="filter-items" value={filterType} onChange={(e) => handleFilterChange(e)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading && new Array(8).fill(0).map((_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="skeleton-box" style={{width: "100%", height: "400px"}}>        
          </div>
        </div>
      ))}
      {!loading && visibleNft.map((nft, index) => (
        <div
          key={nft.authorId}
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
                <img className="lazy" src={nft.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>


            <Countdown expiryDate={nft.expiryDate}/>

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
                <img src={nft.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{nft.title}</h4>
              </Link>
              <div className="nft__item_price">{nft.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{nft.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {hasMore && (
        <div className="col-md-12 text-center">
          <button onClick={handleLoadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
