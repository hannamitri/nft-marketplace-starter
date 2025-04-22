import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TopSellers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTopSellers() {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setUsers(response.data);
    setLoading(false);
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
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton circle={true} height={50} width={50} />
                      </div>
                      <div className="author_list_info">
                        <Skeleton width={80} />
                        <Skeleton width={60} />
                      </div>
                    </li>
                  ))
                : users.map((user, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${user.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={user.authorImage || AuthorImage}
                            alt={user.authorName || "Top Seller"}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${user.authorId}`}>
                          {user.authorName}
                        </Link>
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
