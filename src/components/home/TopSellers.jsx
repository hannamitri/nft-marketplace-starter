import React, { useEffect, useState, Component } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchTopSellers() {
    const res = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    const { data } = res;
    setTopSellers(data);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchTopSellers();
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
              {isLoading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "100%",
                              backgroundColor: "grey",
                            }}
                          ></div>
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <div
                          style={{
                            width: "80px",
                            height: "20px",
                            backgroundColor: "grey",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "30px",
                            height: "20px",
                            backgroundColor: "grey",
                          }}
                        ></div>
                      </div>
                    </li>
                  ))
                : topSellers.map((author) => (
                    <li key={author.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${author.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={author.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${author.authorId}`}>
                          {author.authorName}
                        </Link>
                        <span>{author.price} ETH</span>
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
