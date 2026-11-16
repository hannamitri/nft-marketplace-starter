import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
  async function fetchTopSellerData() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`)
    setSellers(data)
    console.log(data)
  }
  
  fetchTopSellerData();    
  
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
              {sellers.length ? (
                <>
              {sellers.map((user) => (
                <li key={user.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${user.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={user.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${user.authorId}`}>{user.authorName}</Link>
                    <span>{user.price} ETH</span>
                  </div>
                </li>
              ))}
              </>) : (
                <>
              {new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={``}>
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={``}><Skeleton width="100px" height="30px" /></Link>
                    <Skeleton width="80px" height="20px" />
                  </div>
                </li>
              ))}
              </>)}
              
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
