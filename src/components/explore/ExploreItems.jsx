import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeliton from "../home/Skeliton.jsx";
import Card from "../home/Card.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';


const ExploreItems = () => {

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const itemsPerLoad = 8;
  const itemsPerBatch = 4;

  async function fetchExploreItems()
  {
    const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
    setItems(response.data);
    setLoading(false);
  }


  useEffect(() => {
    fetchExploreItems()
    AOS.init();
  }, [])

  useEffect(() => {
    if (items.length > 0) {
      setDisplayedItems(items.slice(0, itemsPerLoad));
      setShowLoadMore(items.length > itemsPerLoad);
    }
  }, [items]);


  const loadMoreItems = () => {
    const currentLength = displayedItems.length;
    const newItems = items.slice(
      currentLength,
      currentLength + itemsPerBatch
    );

    const updatedItems = [...displayedItems, ...newItems];
    setDisplayedItems(updatedItems);

    if (updatedItems.length === items.length) {
      setShowLoadMore(false);
    }
  };

  async function filteItems(filter)
  {
    const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`)
    setItems(response.data)
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => filteItems(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {
        loading ? (
          <>
            {
              new Array(8).fill(0).map((_, index) => {
                return <Skeliton key={index} />
              })
            }
          </>
        ) : (
          <>
            {displayedItems.map((item, index) => (
              <Card item={item} key={index}/>
            ))}
          </>
        )
      }

      {
        showLoadMore && (
          <div className="col-md-12 text-center" data-aos="fade-up" data-aos-duration="1000">
            <Link to="" id="loadmore" className="btn-main lead" onClick={loadMoreItems}>
              Load more
            </Link>
          </div>
        )} 
    </>
  );
};

export default ExploreItems;
