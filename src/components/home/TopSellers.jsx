import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {

  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchTopSellers() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setSellers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    }
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
                      <div className="author_list_pp top-sellers__author--image-skeleton">
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <p className="top-sellers__author-info--skeleton"></p>
                        <p className="top-sellers__author--price-skeleton"></p>
                      </div>
                    </li>
                  ))
                : sellers.length > 1 &&
                  sellers.map((sellers) => (
                <li key={sellers.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${sellers.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={sellers.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${sellers.authorId}`}>{sellers.authorName}</Link>
                    <span>{sellers.price} ETH</span>
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
