import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import CountdownTimer from "../CountdownTimer"; 
import 'aos/dist/aos.css';

const ExploreItems = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8); 
  const [allData, setAllData] = useState([]);
  const [collections, setCollections] = useState([]); // This will hold the currently displayed items

  useEffect(() => {
    // This setTimeout is simulating initial data loading, but `getData` already handles fetching.
    // If you want a loading spinner for the initial fetch, you should manage `isLoading` within `getData`.
    // Otherwise, this setTimeout might be redundant or causing unexpected behavior.
    setTimeout(() => {
        // setData({ data }); // This line seems to be setting data to { data: null } which is likely not intended.
        // If 'data' is meant to hold the fetched data, it should be updated with the actual data.
        setIsLoading(false);
    }, 2000);
  }, []);

  async function getData() {
    try {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`);
      const collectionsWithExpiry = data.map(item => ({
        ...item,
        expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).getTime() 
      }));
      setAllData(collectionsWithExpiry); // Store all fetched data
      setCollections(collectionsWithExpiry.slice(0, visibleCount)); // Display initial set
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); 
    }
  }

  // This useEffect fetches data only once when the component mounts
  useEffect(() => {
    getData();
  }, []);

  async function filterItems(filter) {
    setIsLoading(true); // Set loading to true while filtering
    try {
      let filteredResponse;
      if (filter === "price_low_to_high") {
        filteredResponse = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high`);
      } else if (filter === "price_high_to_low") {
        filteredResponse = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low`);
      } else if (filter === "likes_high_to_low") {
        filteredResponse = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low`);
      } else {
        // If filter is "Default" or any other value, refetch the original data
        filteredResponse = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`);
      }

      const filteredData = filteredResponse.data.map(item => ({
        ...item,
        expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).getTime() // Re-apply expiryTime if needed
      }));

      setAllData(filteredData); // Update allData with the filtered results
      setCollections(filteredData.slice(0, visibleCount)); // Update collections to show the first `visibleCount` of filtered items
    } catch (error) {
      console.error('Error filtering data:', error);
    } finally {
      setIsLoading(false); // Set loading to false after filtering
    }
  }

  const handleLoadMore = () => {
    const newVisibleCount = visibleCount + 4;
    setVisibleCount(newVisibleCount);
    setCollections(allData.slice(0, newVisibleCount)); // Load more from the *filtered* allData
  };
 
  return (
    <>
      <div>
        <select data-aos="fade-up" id="filter-items" defaultValue="" onChange={(event) => filterItems(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading ? (
        <div>Loading items...</div>
      ) : (
        <>
          {collections && collections.map((collection, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div data-aos="fade-up" className="nft__item">
                <div data-aos="fade-up" className="author_list_pp">
                  <Link
                    to={`/author/${collection.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={collection.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {collection.expiryDate && ( 
                  <CountdownTimer  expiryDate={new Date(collection.expiryDate).getTime()} />
                )}

                <div data-aos="fade-up" className="nft__item_wrap">
                  <div data-aos="fade-up" className="nft__item_extra">
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
                  <Link to={`/item-details/${collection.nftId}`}>
                    <img src={collection.nftImage} className="lazy nft__item_preview" alt="" />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${collection.nftId}`}>
                    <h4>{collection.title}</h4>
                  </Link>
                  <div className="nft__item_price">{collection.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{collection.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-md-12 text-center">
            {/* This Link and map inside it seem misplaced and might cause issues. 
                The Load More button should be directly inside the div. */}
            <div id="loadmore" > 
                {visibleCount < allData.length && (
                <button onClick={handleLoadMore}>Load More</button>
                )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ExploreItems;