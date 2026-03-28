import React from "react";
import { Link } from "react-router-dom";
import { useTopSellers } from "../../hooks/useTopSellers";

const TopSellers = () => {
  const { sellers, loading, error } = useTopSellers();

  if (loading) {
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
                {new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}></div>
                    </div>
                    <div className="author_list_info">
                      <div style={{ width: "100px", height: "14px", borderRadius: "4px", marginBottom: "6px", background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}></div>
                      <div style={{ width: "60px", height: "12px", borderRadius: "4px", background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}></div>
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

  if (error) {
    return (
      <section id="section-popular" className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center" style={{ padding: "60px 0" }}>
              <p>Error: {error}</p>
              <button className="btn-main" onClick={() => window.location.reload()}>Retry</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (sellers.length === 0) {
    return (
      <section id="section-popular" className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center" style={{ padding: "60px 0" }}>
              <p>No sellers available.</p>
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
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {sellers.map((seller, index) => (
                <li
                  key={seller.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      <img className="lazy pp-author" src={seller.authorImage} alt={seller.authorName} />
                      <i className="fa fa-check"></i>
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