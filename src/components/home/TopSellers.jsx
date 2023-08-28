import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { async } from "q";
import { func } from "prop-types";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const TopSellers = () => {
  const [topSellersData, setTopSellersData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTopSellers() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );
    setTopSellersData(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchTopSellers();
  }, [loading]);

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
              {loading &&
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Skeleton width={50} height={50} borderRadius={99} />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info">
                      <h4>
                        <Skeleton width={130} height={20} />
                      </h4>
                      <span>
                        <Skeleton width={40} height={15} />
                      </span>
                    </div>
                  </li>
                ))}
              {topSellersData.map((user) => (
                <li key={user.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${user.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={user.authorImage}
                        alt=""
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
