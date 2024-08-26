import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SkeletonNewItems from "../home/home-components/Skeletons/SkeletonNewItems.jsx";
import NewItemsCard from "../home/home-components/NewItemsComponents/NewItemsCard.jsx";
import SkeletonCatalog from "../home/home-components/Skeletons/author page/SkeletonAuthorItems.jsx";

const ExploreItems = () => {
  const [nfts, setNfts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [filter, setFilter] = useState("")
  const [loadCount, setLoadCount] = useState(8)

  async function filterMovies(event) {
    setFilter(event.target.value)
    reloadNfts()
  }

  function reloadNfts(){
    setIsLoaded(false)
    getNfts()
  }

  function loadMoreNfts(){
    const newLoadCount = loadCount+4
    setLoadCount(newLoadCount)
    getNfts()
  }

  async function getNfts() {
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`)
    
    const newData = data.slice(0,loadCount)

    setIsLoaded(true)
    setNfts(newData)
  }

  useEffect(() => {
    getNfts()
  }, [isLoaded,loadCount])

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => filterMovies(event)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
            
      {
        isLoaded ? (
          nfts.map((nft) => (
            <div
              key={nft.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NewItemsCard nft = {nft} />
            </div>
          ))
        ) : (
          <SkeletonCatalog />
        )
      }
      <div className="col-md-12 text-center"> 
        {
          (loadCount < 16) && (
            <Link to="" id="loadmore" className="btn-main lead" onClick={loadMoreNfts}>
              Load more
            </Link>      
          )
        }       
      </div>
    </>
  );
};

export default ExploreItems;
