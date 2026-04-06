import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../../components/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );

        console.log("TOP SELLERS API:", res.data);
        setSellers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching top sellers:", err);
        setSellers([]);
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
                ? [...Array(12)].map((_, index) => (
                    <TopSellerSkeleton key={index} />
                  ))
                : sellers.map((seller, index) => (
                    <li key={seller.authorId || seller.author_id || seller.id || index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId || seller.author_id}`}>
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              overflow: "hidden",
                            }}
                          >
                            <Skeleton
                              src={seller.authorImage || seller.author_image}
                              alt={seller.authorName || "author"}
                              className="lazy pp-author"
                              wrapperStyle={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                            />
                          </div>
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId || seller.author_id}`}>
                          {seller.authorName}
                        </Link>
                        <span>{Number(seller.price || 0).toFixed(1)} ETH</span>
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

const TopSellerSkeleton = () => {
  return (
    <li>
      <div className="author_list_pp">
        <div
          className="skeleton skeleton-circle"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        ></div>
      </div>

      <div className="author_list_info">
        <div
          className="skeleton skeleton-text short"
          style={{
            width: "140px",
            height: "18px",
            marginBottom: "8px",
          }}
        ></div>

        <div
          className="skeleton skeleton-text"
          style={{
            width: "80px",
            height: "16px",
          }}
        ></div>
      </div>
    </li>
  );
};

export default TopSellers;
