import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    axios({
      url: "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers ",
      method: "GET",
      dataResponse: "json",
    }).then((response) => {
      setSellers(response.data);
    });
  }, []);

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
          <div className="col-md-12" data-aos="fade-in">
            <ol className="author_list">
              {sellers.length
                ? sellers.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt={seller.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>
                          {seller.authorName}
                        </Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))
                : new Array(12).fill(0).map((obj, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <a href="/">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                          <i className="fa fa-check"></i>
                        </a>
                      </div>
                      <div className="author_list_info">
                        <a href="/">
                          <Skeleton width="100px" height="20px" />
                        </a>
                        <span>
                          <Skeleton width="40px" height="20px" />
                        </span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
