import React  from "react";
import { Link, useParams } from "react-router-dom";
import Timer from "../home/Countdown";
import { useEffect, useState } from "react";
import axios from 'axios';
import Skeleton from "../UI/Skeleton";
const ExploreItems = () => {
  const {authorId} = useParams();
  const {nftId} = useParams();
  const [explore, setExplore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(8);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    async function fetchData(){
      const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`, { params: { filter } });
      setExplore(data);
      setLoading(false);
    }
   fetchData();
  }, [filter]);
  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Update the filter when the user selects a new option
  };
  const loadMore = () => {
    setVisible((prev) => prev + 4);
  };
  if (loading) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="slider-container " style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
             
                {Array(8).fill(null).map((_, index) => (
                  <div key={index}>
                    <div className="nft__item">
            <div className="author_list_pp">
            <Skeleton width="100%" height="50px" borderRadius="50%" />
            </div>
            <div className="de_countdown">
            <Skeleton width="100%" height="25px" borderRadius="10px" />
            </div>
            <div className="nft__item_wrap">
            <Skeleton width="100%" height="200px" borderRadius="10px" />
            </div>
            <div className="nft__item_info">
            <Skeleton width="50%" height="15px" borderRadius="4px" />
             <div className="nft__item_price">
             <Skeleton width="40%" height="10px" borderRadius="10px" />
              </div>
              <div className="nft__item_like">
              <Skeleton width="40px" height="15px" borderRadius="10px" />
              </div>
            </div>
          </div>
                  </div>
                ))}
      
            </div>
          </div>
        </div>                       
      </section>
    );
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      { explore.slice(0,visible).map((item) =>(
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item" data-aos="zoom-in">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown"><Timer duration ={item.expiryDate}/></div>

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
              <Link to={`/item-details/${item.nftId}`}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">{item.price}ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {visible < explore.length && (
      <div className="col-md-12 text-center">
        <button onClick={loadMore}to="" id="loadmore" className="btn-main lead">
          Load more
        </button>
      </div>
      )}
    </>
  );
};

export default ExploreItems;
