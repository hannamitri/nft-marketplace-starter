import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { topSellersUrl } from "../../utils/authorUtils";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {

  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSellers() {
      try {
        const response = await axios.get(topSellersUrl);

        setSellers(response.data);
      } catch (error) {
        console.error("Top sellers API error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getSellers();
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
            {error && <p>API error: {error}</p>}
            <ol className="author_list">
              {loading && new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                  </div>
                  <div className="author_list_info">
                    <Skeleton width="120px" height="20px" borderRadius="4px" />
                    <Skeleton width="70px" height="16px" borderRadius="4px" />
                  </div>
                </li>
              ))}

              {!loading && sellers.map((seller, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${seller.authorId || seller.id}`}
                      state={{ author: seller }}
                    >
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link
                      to={`/author/${seller.authorId || seller.id}`}
                      state={{ author: seller }}
                    >
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
