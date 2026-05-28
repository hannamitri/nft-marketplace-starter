import React, { useEffect, useState} from "react";
import NftCard from "../NftCard";
import Skeleton from "../UI/Skeleton";


const ExploreItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fulldata, setFullData] = useState([]);
  const [limit, setlimit] = useState(8)

  function loadMore() {
    if(limit < 16){
      const nextLimit = limit + 4;
      setData(fulldata.slice(0, nextLimit));
      setlimit(nextLimit);
    }
  }

  function filterData(value) {
    let sortedData = [...data]

    if (value === 'price_low_to_high') {
      sortedData.sort((a, b) => a.price - b.price)
    } else if (value === 'price_high_to_low') {
      sortedData.sort((a, b) => b.price - a.price)
    } else {
      sortedData.sort((a, b) => b.likes - a.likes)
    }
    
    setData(sortedData)
  }

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setFullData(result);
          setData(result.slice(0,8));
        } catch (err) {
          console.log(err.message);
        } finally {
          setLoading(false);
        }
      }
      
      fetchData();
    },[])

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(e) => filterData(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <>
          {Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover",}}
            >
              <Skeleton width='100%' height='400px' borderRadius='14px'/>
            </div>
          ))}
        </>

      ) : (

        <>
          {data.map((item) => (
            <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftCard item={item}/>
            </div>
          ))}
        </>

      )}
      
      
      <div className="col-md-12 text-center">
        {limit < 16 && (
          <button id="loadmore" className="btn-main lead" onClick={loadMore}>
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
