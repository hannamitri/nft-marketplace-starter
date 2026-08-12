import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

const TopSellers = () => {
  const [topSellersItem, setTopSellersItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function FecthData() {
      const { data } = await axios.get(API_URL);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setTopSellersItem(data);
      setLoading(false)
    }
    FecthData();
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

          {loading ? (
            <div className="col-md-12">
              <ol className="author_list">
                {new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <div className="skeleton skeleton-picture"/>
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info ">
                        <div className="skeleton skeleton-name" />
                        <div className="skeleton skeleton-price" />
                      </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="col-md-12">
              <ol className="author_list">
                {topSellersItem.map((item) => (
                  <li key={item.id}>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-author"
                          src={item.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">{item.authorName}</Link>
                      <span>{item.price} ETH</span>
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
