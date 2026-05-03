import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
        );
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load sellers");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const SkeletonItem = () => {
    const shimmer = {
      background:
        "linear-gradient(90deg, #EEEEEE 25%, #DDDDDD 37%, #EEEEEE 63%)",
      backgroundSize: "400% 100%",
      animation: "shimmer 1.4s ease infinite",
    };

    return (
      <li
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginRight: "12px",
            ...shimmer,
          }}
        />

        <div style={{ flex: 1 }}>
          <div
            style={{
              width: "40%",
              height: "12px",
              marginBottom: "8px",
              borderRadius: "4px",
              ...shimmer,
            }}
          />
          <div
            style={{
              width: "25%",
              height: "12px",
              borderRadius: "4px",
              ...shimmer,
            }}
          />
        </div>
      </li>
    );
  };

  return (
    <section id="section-popular" className="pb-5">
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -400px 0; }
            100% { background-position: 400px 0; }
          }
        `}
      </style>

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
              {/* Loading skeleton */}
              {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonItem key={i} />
                ))}

              {/* Error */}
              {error && <li>{error}</li>}

              {/* Data */}
              {!loading &&
                !error &&
                data.map((seller) => (
                  <li key={seller.authorId}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage || AuthorImage}
                          alt={seller.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>
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
