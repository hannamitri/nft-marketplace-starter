import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios"
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
        setSellers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    }
    fetchData();
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
              {loading ? (
               
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <Skeleton circle={true} height={50} width={50} />
                    <div className="author_list_info">
                      <Skeleton width={80} />
                      <Skeleton width={40} />
                    </div>
                  </li>
                ))
              ) : (
               
                sellers.map((seller, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <img className="lazy pp-author" src={seller.authorImage || AuthorImage} alt={seller.name || "Author"} />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">{seller.name || "Unknown"}</Link>
                      <span>{seller.price || "0.0"} ETH</span>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;