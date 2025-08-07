import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [topSellers, setTopSellers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setTopSellers(response.data);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
        setError("Failed to load top sellers");
      } finally {
        setLoading(false);
      }
    };

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
                ? // Skeleton Loading state
                  Array.from({ length: 12 }).map((_, index) => (
                    <li key={`skeleton-${index}`}>
                      <div className="author_list_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </div>
                      <div className="author_list_info">
                        <Skeleton
                          width="120px"
                          height="20px"
                          borderRadius="4px"
                        />
                        <br />
                        <Skeleton
                          width="80px"
                          height="16px"
                          borderRadius="4px"
                        />
                      </div>
                    </li>
                  ))
                : error
                ? <li className="text-center">
                    <p>{error}</p>
                  </li>
                : topSellers.length === 0
                ? <li className="text-center">
                    <p>No top sellers available</p>
                  </li>
                : topSellers.map((seller, index) => (
                    <li key={seller.id || index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage || AuthorImage}
                            alt={seller.authorName || "Author"}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>
                          {seller.authorName || "Unknown Author"}
                        </Link>
                        <span>{seller.price || "0.00"} ETH</span>
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
