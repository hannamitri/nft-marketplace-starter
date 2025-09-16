import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import SkeletonSeller from "../SkeletonSeller";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  async function getSellers() {
    const { data } = await axios.get(`/topSellers`);
    console.log("Fetched sellers:", data);
    setSellers(data);
  }

  useEffect(() => {
    getSellers();
    setLoading(false);
  }, []);

  const skeletonCount = sellers.length || 6;

  return (
    <>
      {/* Inline CSS */}
      <style>{`
        .skeleton-seller {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
        }
        .skeleton-avatar {
          width: 50px;
          height: 50px;
          background: #e0e0e0;
          border-radius: 50%;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .skeleton-text {
          height: 12px;
          background: #ddd;
          border-radius: 4px;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .skeleton-text.name {
          width: 100px;
        }
        .skeleton-text.price {
          width: 50px;
        }
        .skeleton-avatar::before,
  .skeleton-text::before {
    content: "";
    position: absolute;
    top: 0;
    left: -150%;
    height: 100%;
    width: 150%;
    background: linear-gradient(
      90deg,
      rgba(224, 224, 224, 0) 0%,
      rgba(255, 255, 255, 0.6) 50%,
      rgba(224, 224, 224, 0) 100%
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(0); }
    100% { transform: translateX(100%); }
  }
      `}</style>

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
                {isLoading
                  ? Array(skeletonCount)
                      .fill(0)
                      .map((_, index) => (
                        <li key={index} className="skeleton-seller">
                        <SkeletonSeller />
                        </li>
                      ))
                  : sellers.map((seller) => (
                      <li key={seller.id}>
                        <div className="author_list_pp">
                          <Link to={`/author/${seller.authorId}`} state={{ seller }}>
                            <img
                              className="lazy pp-author"
                              src={seller.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${seller.authorId}`} state={{ seller }}>
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
    </>
  );
};

export default TopSellers;
