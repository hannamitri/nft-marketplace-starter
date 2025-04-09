import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

async function fetchTopSellers() {

  const response = await axios.get(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
  );
  setLoading(false)
  setTopSellers(response.data);
}

useEffect(() => {
  fetchTopSellers();
}, [fetchTopSellers])

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

          {loading ? (
            <div className="col-md-12">
            <ol className="author_list">
              {new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                      <Skeleton width={50} height={50} borderRadius={50} />
                      <i className="fa fa-check"></i>
                  </div>
                  <div className="author_list_info">
                    <Skeleton  width={120} height={20} borderRadius={2}/>
                    <span><Skeleton width={50} height={20} borderRadius={2} /></span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          ) : (
            <div className="col-md-12">
            <ol className="author_list">
              {topSellers.map((topSeller, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-author"
                        src={topSeller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{topSeller.authorName}</Link>
                    <span>{topSeller.price}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          )}
          
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
