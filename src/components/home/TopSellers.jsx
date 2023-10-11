import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewItems() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );

      setItems(data);
      setLoading(false);
    }
    fetchNewItems();
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
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/`}>
                          <div
                            className="lazy pp-author skeleton-box "
                            style={{
                              height: "50px",
                              width: "50px",
                              borderRadius: "9999px",
                            }}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div
                        className="author_list_info"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Link to={`/author/`}>
                          <div
                            className="skeleton-box"
                            style={{ height: "20px", width: "100px" }}
                          ></div>
                        </Link>
                        <div
                          className="skeleton-box"
                          style={{ height: "20px", width: "40px" }}
                        ></div>
                      </div>
                    </li>
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
                        <Link to={`/author/${item.authorId}`}>
                          {item.authorName}
                        </Link>
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
