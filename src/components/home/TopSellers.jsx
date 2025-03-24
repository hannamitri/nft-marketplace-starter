import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellers();
  }, []);

  async function fetchSellers() {
    setLoading(true);
    setTimeout(async () => {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setSellers(data);
      setLoading(false);
    }, 1000);
  }

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
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton 
                          circle
                          height={50}
                          width={50}
                          className="lazy pp-author"
                        />
                      </div>
                      <div className="author_list_info">
                        <Skeleton width={100} />
                        <Skeleton width={60} />
                      </div>
                    </li>
                  ))
                : sellers.map(({ id, authorImage, authorName, authorId, price }) => (
                    <li key={id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={authorImage}
                            alt={authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${authorId}`}>{authorName}</Link>
                        <span>{price} ETH</span>
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
