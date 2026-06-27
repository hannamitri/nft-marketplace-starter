import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import useMinimumLoading from "../UI/useMinimumLoading";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const displayLoading = useMinimumLoading(loading, 700);

  useEffect(() => {
    async function fetchTopSellers() {
      const response = await fetch(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      const data = await response.json();
      setSellers(data);
      setLoading(false);
    }
    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12" data-aos="fade-up" data-aos-delay="100">
            <ol className="author_list">
              {displayLoading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                      </div>
                      <div className="author_list_info">
                        <Skeleton width="100px" height="20px" borderRadius="4px" />
                        <Skeleton width="60px" height="15px" borderRadius="4px" />
                      </div>
                    </li>
                  ))
                : sellers.slice(0, 12).map((seller) => (
                    <li key={seller.id}>
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
                        <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
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
