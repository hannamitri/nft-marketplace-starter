import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NFT from '../home/NFT'

const ExploreItems = (props) => {

  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [filter, setFilter] = useState("");

  async function getExplore(sorting){
    let exploreRequest;
    if(sorting){
      exploreRequest = await fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${sorting}`);  
    }
    else{
      exploreRequest = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
    }
    let exploreJSON = await exploreRequest.json();
    console.log(exploreJSON);
    setAllItems(exploreJSON);
    setItems(exploreJSON.slice(0,8));
  }

  function loadMore(){
    console.log("Loading more");
    let displayLength = items.length;
    displayLength += 4;
    console.log(displayLength);
    setItems(allItems.slice(0, displayLength));
    if(filter !== ""){
      console.log(allItems.slice(0, displayLength));
      sortNFTs(filter, allItems.slice(0, displayLength));
    }
  }

  /* DEPRECATED MANUAL SORTING FUNCTION */
  function sortNFTs(sorting, itemsList){
    console.log(itemsList);
    console.log(sorting);
    setFilter(sorting);
    let currentItems = itemsList;
    if(itemsList.length === 0){
      currentItems = items;
    }
    console.log(currentItems);
    let sortedItems;
    if(sorting === "price_low_to_high"){
      sortedItems = [...currentItems].sort((a, b) => {
        return a.price > b.price;
      })
    }
    else if(sorting === "price_high_to_low"){
      sortedItems = [...currentItems].sort((a, b) => {
        return a.price < b.price;
      })
    }
    else if(sorting === "likes_high_to_low"){
      sortedItems = [...currentItems].sort((a, b) => {
        return a.likes < b.likes;
      })
    }
    else{
      let displayLength = items.length;
      sortedItems = allItems.slice(0, displayLength);
    }
    console.log(sortedItems);
    setItems(sortedItems);
  }

  useEffect(() => {
    getExplore();
  }, [])

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => {getExplore(event.target.value)}}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {
      items?.length > 0?
        items
          .map((item, index) => {
          return (
          <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
          >
          <NFT key={item.nftId} loading={false} authorId={item.authorId} 
                authorImage={item.authorImage} expiryDate={item.expiryDate} 
                nftId={item.nftId} nftImage={item.nftImage} price={item.price} likes={item.likes} title={item.title} />

          
        </div>
        )})
        :
        new Array(8).fill(0).map((_, index) => {
          return (
          <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
            <NFT key={index} loading={true} />
            </div>   
          )
        })}
        <div className="col-md-12 text-center">
          <Link to="" id="loadmore" className="btn-main lead" onClick={() => {loadMore()}}>
            Load more
          </Link>
        </div>
      </>
  );
};

export default ExploreItems;
