import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function getTopSellers() {
      try {
        setHasError(false);
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
        );
        setSellers(response.data);
      } catch (error) {
        console.error("Failed to load top sellers:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getTopSellers();
  }, []);

  const visibleSellers =
    isLoading || hasError ? new Array(12).fill(null) : sellers;
  return (
    <section id="section-popular" className="pb-5" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center" data-aos="fade-up">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {visibleSellers.map((seller, index) => (
                <li key={seller?.id || index} data-aos="fade-up">
                  <div className="author_list_pp">
                    {seller ? (
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt={seller.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    ) : (
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    )}
                  </div>
                  <div className="author_list_info">
                    {seller ? (
                      <>
                        <Link to={`/author/${seller.authorId}`}>
                          {seller.authorName}
                        </Link>
                        <span>{seller.price} ETH</span>
                      </>
                    ) : (
                      <>
                        <Skeleton
                          width="45%"
                          height="18px"
                          borderRadius="4px"
                        />
                        <br />
                        <Skeleton
                          width="28%"
                          height="14px"
                          borderRadius="4px"
                        />
                      </>
                    )}
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
