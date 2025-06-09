import React from "react";
import "../../css/styles/skeleton.css"; 

const TopSellersSkeleton = () => {
  const placeholders = Array(12).fill(0); 

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
              {placeholders.map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <div className="skeleton seller-skeleton__avatar"></div>
                  </div>
                  <div className="author_list_info">
                    <div className="skeleton seller-skeleton__name"></div>
                    <div className="skeleton seller-skeleton__price"></div>
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

export default TopSellersSkeleton;

