import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);
    const fetchTopSellers =
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";
    try {
      const { data } = await axios.get(fetchTopSellers);
      setSellers(data);
    } catch (error) {
      console.log("Error fetching", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
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
                        <a href="/">
                          <div
                            className="skeleton-box"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <i className="fa fa-check"></i>
                        </a>
                      </div>
                      <div className="author_list_info">
                        <a href="/">
                          <div
                            className="skeleton-box"
                            style={{ width: "100px", height: "20px" }}
                          ></div>
                        </a>
                        <span>
                          <div
                            className="skeleton-box"
                            style={{ width: "40px", height: "20px" }}
                          ></div>
                        </span>
                      </div>
                    </li>
                  ))
                : sellers.map((seller, index) => (
                    <li
                      key={seller.authorId}
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                    >
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
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
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;