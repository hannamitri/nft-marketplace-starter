import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );

        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

  const SkeletonItem = () => (
    <li>
      <div className="author_list_pp">
        <div
          className="skeleton__avatar"
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "#e0e0e0",
            borderRadius: "50%",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        ></div>
      </div>
      <div className="author_list_info">
        <div
          className="skeleton__name"
          style={{
            width: "80px",
            height: "16px",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            marginBottom: "4px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        ></div>
        <div
          className="skeleton__price"
          style={{
            width: "60px",
            height: "14px",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        ></div>
      </div>
    </li>
  );

  return (
    <section id="section-popular" className="pb-5" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up" data-aos-delay="100">
                Top Sellers
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? Array.from({ length: 12 }, (_, index) => (
                    <SkeletonItem key={index} />
                  ))
                : sellers.slice(0, 12).map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
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
      <style>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default TopSellers;
