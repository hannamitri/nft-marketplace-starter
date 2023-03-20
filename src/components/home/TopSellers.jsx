import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      )
      .then((response) => {
        setTopSellers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderSkeleton = () => (
    <li>
      <div className="author_list_pp">
        <div
          className="skeleton-box"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        ></div>
        <i className="fa fa-check"></i>
      </div>
      <div className="author_list_info">
        <div
          className="skeleton-box"
          style={{ width: "100px", height: "20px", marginBottom: "8px" }}
        ></div>
        <div
          className="skeleton-box"
          style={{ width: "50px", height: "20px" }}
        ></div>
      </div>
    </li>
  );

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
                ? Array(12)
                    .fill(null)
                    .map((_, index) => (
                      <React.Fragment  key={index}>
                        {renderSkeleton()}
                      </React.Fragment>
                    ))
                : topSellers.map((topSeller) => (
                    <li key={topSeller.id} data-aos="fade" data-aos-delay="350">
                      <div className="author_list_pp">
                        <Link to={`/author/${topSeller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={topSeller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${topSeller.authorId}`}>
                          {topSeller.authorName}
                        </Link>
                        <span>{topSeller.price} ETH</span>
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

