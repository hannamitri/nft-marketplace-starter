import {useCallback, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import AuthorImage from "../../images/author_thumbnail.jpg";
import "./TopSellers.css";

const TopSellers = () => {

const [topSellersData, setTopSellersData] = useState([]);
const [loading, setLoading] = useState(true);


const getTopSellersData = useCallback(async () => {
  try {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`);

    setTopSellersData( data );
  }
  catch (error) {
    console.log("Error fetching topSellersData", error)
  }
  finally {
    setLoading(false)
  }
})

useEffect(() => {
 { getTopSellersData()};
}, [])

function renderTopSellersData(item, id) {
  return (
    <li key={item.id}>
      <div className="author_list_pp">
        <Link to={`/author/${item.authorId}`}>
          <img
            className="lazy pp-author"
            src={item.authorImage}
            alt=""
          />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className="author_list_info">
        <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
        <span>{item.price} ETH</span>
      </div>
    </li>
  )
}


function skeletonLoader() {
  return (
    <li>
      <div className="skeleton skeleton-author_list_pp">
        <Link to="/author">
          <img
            className="skeleton skeleton-img"
            alt=""
          />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className="skeleton skeleton-author_list_info">
        <Link to="/author">{}</Link>
        <span className="skeleton skeleton-price"></span>
      </div>
    </li>
  )
}


  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading ? new Array(12).fill(0).map((_, id) => skeletonLoader()) : topSellersData.map((item, id) => renderTopSellersData(item, id))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
