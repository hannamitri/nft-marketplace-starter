import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios"

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setSellers(data);
      } catch (err) {
        console.error("Error fetching Top Sellers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
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
                <>
                  {new Array(12).fill(0).map((_, i) => (
                    <li
                      key={i}
                      className="skeleton-card skeleton-author-row"
                    ></li>
                  ))}
                </>
              ) : (
                sellers.map((seller) => (
                  <li key={seller.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.id}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt={seller.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="author_list_info">
                      <h5>
                        <Link to={`/author/${seller.id}`}>{seller.authorName}</Link>
                      </h5>
                      <span>{seller.price} ETH</span>
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
