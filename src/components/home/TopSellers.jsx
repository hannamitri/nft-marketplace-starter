import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

import "../../css/TopSellers.css"

const TopSellers = () => {
  async function fetchTopSellerData(){
    const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");

    setTopSellerData(response.data);
    setLoading(false)
  }
  const [loading, setLoading] = useState(true)
  const [topSellerData, setTopSellerData] = useState([])

  useEffect(() => {
    fetchTopSellerData()
  
    return () => {
      setTopSellerData([])
    }
  }, [])
  

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
              {loading ? (new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp skeleton skeleton__pfp">
                      <i className="fa fa-check"></i>
                  </div>
                  <div className="author_list_info">
                    <div className="skeleton skeleton__name">Monica Lucas</div>
                    <span className="skeleton skeleton__price">2.1 ETH</span>
                  </div>
                </li>
              ))): (topSellerData.map((item, index) => (
                <li key={item.authorId}>
                  <div className="author_list_pp">
                    <Link to={"/author/" + item.authorId}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={"/author/" + item.authorId}>{item.authorName}</Link>
                    <span>{item.price} ETH</span>
                  </div>
                </li>
              )))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
