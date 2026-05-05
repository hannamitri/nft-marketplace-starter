import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton.jsx";
import { faTruckFieldUn } from "@fortawesome/free-solid-svg-icons/faTruckFieldUn";

const TopSellers = () => {
  const [topSellers, setTopSeller] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTopSeller() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    );
    setTopSeller(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchTopSeller();
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
              <ol className={`author_list ${loading ? "skeleton_list" : ""}`}>
                {loading
                  ? new Array(12).fill(0).map((_, index) => (
                      <li key={index}>
                        <div className="author_list_pp">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </div>

                        <div className="author_list_info">
                          <Skeleton width="100px" height="16px" />
                          <Skeleton width="60px" height="14px" />
                        </div>
                      </li>
                    ))
                  : topSellers.map((item) => (
                      <li key={item.id}>
                        <div className="author_list_pp">
                          <Link to={`/author/${item.id}`}>
                            <img
                              className="lazy pp-author"
                              src={item.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link to={`/author/${item.id}`}>
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
