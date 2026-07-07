import React from "react";
import { Link } from "react-router-dom";
import useTopSellers from "../../hooks/useTopSellers";

const SkeletonSeller = () => (
  <li>
    <div className="author_list_pp">
      <div className="skeleton" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
    </div>
    <div className="author_list_info">
      <div className="skeleton" style={{ width: "100px", height: "16px", marginBottom: "6px" }}></div>
      <div className="skeleton" style={{ width: "60px", height: "14px" }}></div>
    </div>
  </li>
);

const TopSellers = () => {
  const { data: sellers, loading } = useTopSellers();

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
                ? new Array(12).fill(0).map((_, i) => <SkeletonSeller key={i} />)
                : sellers.map((seller) => (
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
    </section>
  );
};

export default TopSellers;