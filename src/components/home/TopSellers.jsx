import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopSellers } from "../../api/api";
import TopSellersSkeletonLoader from "./TopSellersSkeleton";
const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);

  useEffect(() => {
    const fetchTopSellers = async () => {
      const sellers = await getTopSellers();
      setTopSellers(sellers);
    };

    fetchTopSellers();
  }, []);

  if (!topSellers.length) {
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
              {[...Array(12)].map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                    <TopSellersSkeletonLoader style={{ width: "50px", height: "50px", borderRadius: "50%" }} loading={true} />
                    </div>
                    <div className="author_list_info">
                    <TopSellersSkeletonLoader style={{ width: "100px", height: "20px", marginBottom: "5px" }} />
                    <TopSellersSkeletonLoader style={{ width: "50px", height: "20px" }} />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
              {topSellers.map((seller) => (
                <li key={seller.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                    <i className="fa fa-check"></i>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt={seller.authorName}
                      />
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
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
