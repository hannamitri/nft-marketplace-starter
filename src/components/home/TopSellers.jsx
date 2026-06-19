import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const SkeletonItem = () => (
  <li>
    <div className="author_list_pp">
      <span
        className="skeleton-box"
        style={{ width: 50, height: 50, borderRadius: "100%" }}
      ></span>
    </div>
    <div className="author_list_info">
      <span
        className="skeleton-box"
        style={{ width: 110, height: 14, marginBottom: 8 }}
      ></span>
      <span
        className="skeleton-box"
        style={{ width: 60, height: 14 }}
      ></span>
    </div>
  </li>
);

const TopSellers = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
      )
      .then((response) => {
        setItems(response.data);
        setLoading(false);
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
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? Array.from({ length: 12 }).map((_, index) => (
                    <SkeletonItem key={index} />
                  ))
                : items.map((item) => (
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
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
