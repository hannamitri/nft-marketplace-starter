import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TopSellers = () => {
  const [dataFetched, setDataFetched] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add optional delay (500ms)
    const timer = setTimeout(() => {
      const fetchTopSellers = async () => {
        try {
          const { data } = await axios.get(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
          );
          setDataFetched(data);
        } catch (error) {
          console.log("Error fetching data:", error);
        } finally {
          setLoading(false); // Always stop loading
        }
      };

      fetchTopSellers();
    }, 5000);

    return () => clearTimeout(timer); // Clean up timer
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Top Sellers</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? Array.from({ length: 12 }).map((_, i) => (
                    <li key={i}>
                      <div className="author_list_pp">
                        <Skeleton circle height={50} width={50} />
                      </div>
                      <div className="author_list_info">
                        <Skeleton width={120} height={20} />
                        <Skeleton width={80} height={15} />
                      </div>
                    </li>
                  ))
                : dataFetched.map((user) => (
                    <li key={user.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${user.id}`}>
                          <img
                            className="lazy pp-author"
                            src={user.authorImage}
                            alt={user.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${user.id}`}>{user.authorName}</Link>
                        <span>{user.price} ETH</span>
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
