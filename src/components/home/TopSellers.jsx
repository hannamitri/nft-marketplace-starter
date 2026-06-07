import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSellers = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setSellers(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Unable to load top sellers. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
    return () => controller.abort();
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
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="col-md-12">
            <ol data-aos="fade-in"
                data-aos-delay="100" className="author_list">
              {loading ? (
                Array.from({ length: 12 }).map((_, index) => (
                  <li key={index}>
                    <div data-aos="fade-in"
                      data-aos-delay="100" className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div data-aos="fade-in"
                      data-aos-delay="100" className="author_list_info">
                      <Skeleton width="100px" height="20px" />
                      <Skeleton width="50px" height="20px" />
                    </div>
                  </li>
                ))
              ) : (
                sellers.map((seller) => (
                  <li key={seller.id}>
                    <div data-aos="fade-in"
                      data-aos-delay="100" className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt={seller.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div data-aos="fade-in"
                      data-aos-delay="100" className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
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
