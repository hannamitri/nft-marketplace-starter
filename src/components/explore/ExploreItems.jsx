import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom"; 
import axios from "axios"; import AuthorImage from "../../images/author_thumbnail.jpg"; 
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const ExploreItems = () => { 
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
  const [filter, setFilter] = useState("");
  const [visibleItems, setVisibleItems] = useState(8); 
  const loadMoreItems = () => {
  setVisibleItems((prev) => prev + 4);
};
  
  useEffect(() => { 
    setVisibleItems(8); // Reset visible items when filter changes
    const fetchItems = async () => { 
      try { 
        setLoading(true); 
        setError(""); 
        
        const response = await axios.get( "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore", 
          { 
            params: { 
              filter: filter, 
            }, 
          } 
        ); 
        
        setItems(response.data); 
      } catch (error) { 
        console.error("Error fetching Explore items:", error); 
        setError("Unable to load NFTs."); 
      } finally { 
        setTimeout(() => {
          setLoading(false); 
        }, 1500);
      } 
    }; 
    
    fetchItems(); 
  }, [filter]); 
  
  return ( 
    <> 
      <div> 
        <select 
          id="filter-items" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)} 
        > 
          <option value="">Default</option> 
          <option value="price_low_to_high"> Price, Low to High </option> 
          <option value="price_high_to_low"> Price, High to Low </option> 
          <option value="likes_high_to_low"> Most liked </option> 
        </select> 
      </div>
      
      <div className="row"> 
        {loading ? ( 
          Array.from({ length: 8 }).map((_, index) => ( 
            <div 
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12" 
              key={index} 
            > 
              <div className="nft__item skeleton-card"> 
                <Skeleton 
                  width="100%" 
                  height="200px" 
                  borderRadius="8px" 
                /> 
                <Skeleton 
                  width="45px" 
                  height="45px" 
                  borderRadius="50%" 
                /> 
                <Skeleton 
                  width="70%" 
                  height="20px" 
                  borderRadius="5px" 
                /> 
                <Skeleton 
                  width="40%" 
                  height="15px" 
                  borderRadius="5px" 
                /> 
              </div> 
            </div> 
          )) 
        ) : error ? ( 
          <p>{error}</p> 
        ) : ( 
          items.slice(0, visibleItems).map((item, index) => (
            <div 
              key={item.id || index} 
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" 
              style={{ 
                display: "block", 
                backgroundSize: "cover", 
              }} 
            > 
              <div className="nft__item"> 
                <div className="author_list_pp"> 
                  <Link 
                    to="/author" 
                    state={{ 
                      author: { 
                        authorId: item.authorId, 
                        authorImage: item.authorImage, 
                        authorName: item.authorName, 
                      }, 
                    }} 
                    data-bs-toggle="tooltip" 
                    data-bs-placement="top" 
                  > 
                  <img 
                    className="lazy" 
                    src={item.authorImage || AuthorImage} 
                    alt="NFT creator" 
                  /> 
                  <i className="fa fa-check"></i> 
                  </Link> 
                </div> 
                <Countdown expiryDate={item.expiryDate} /> 
                <div className="nft__item_wrap"> 
                  <div className="nft__item_extra"> 
                    <div className="nft__item_buttons"> 
                      <button>Buy Now</button> 
                      <div className="nft__item_share"> 
                        <h4>Share</h4> 
                        <a 
                          href="" 
                          target="_blank" 
                          rel="noreferrer" 
                        > 
                          <i className="fa fa-facebook fa-lg"></i> 
                        </a> 
                        <a 
                          href="" 
                          target="_blank" 
                          rel="noreferrer" 
                        > 
                          <i className="fa fa-twitter fa-lg"></i> 
                        </a> 
                        <a href=""> 
                          <i className="fa fa-envelope fa-lg"></i> 
                        </a> 
                      </div> 
                    </div> 
                  </div> 
                  <Link to="/item-details" state={{ item }}> 
                    <img 
                      src={item.nftImage || nftImage} 
                      className="lazy nft__item_preview" 
                      alt={item.title || "NFT"} 
                    /> 
                  </Link> 
                </div> 
                
                <div className="nft__item_info"> 
                  <Link to="/item-details" state={{ item }}> 
                    <h4>{item.title || "Untitled NFT"}</h4> 
                  </Link> 
                  
                  <div className="nft__item_price"> 
                    {item.price ?? "N/A"} ETH 
                  </div> 
                  <div className="nft__item_like"> 
                    <i className="fa fa-heart"></i> 
                    <span>{item.likes ?? 0}</span> 
                  </div> 
                </div> 
              </div>
            </div> 
          )) 
        )} 
      </div> 
      {!loading && !error && visibleItems < items.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={loadMoreItems}
          >
            Load More
          </button>
        </div>
      )}
    </> 
  ); 
}; 

export default ExploreItems;