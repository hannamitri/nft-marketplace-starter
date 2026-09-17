import React from "react";
import { Link } from "react-router-dom";
import { API_URLS } from "../../api/nftApi";
import useApiList from "../../hooks/useApiList";
import { SellerListSkeleton } from "../UI/LoadingSkeletons";

const TopSellers = () => {
  const { data: sellers, loading, error } = useApiList(
    API_URLS.topSellers,
    "Unable to load top sellers. Please try again later."
  );

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
            {loading && <SellerListSkeleton />}
            {error && <p role="alert">{error}</p>}
            {!loading && !error && sellers.length === 0 && <p>No top sellers available.</p>}
            {!loading && !error && sellers.length > 0 && (
              <ol className="author_list">
              {sellers.map((seller) => (
                <li key={seller.id}>
                  <div className="author_list_pp">
                    <Link to={`/${seller.authorId}/author`} title={`View ${seller.authorName}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt={seller.authorName}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/${seller.authorId}/author`}>{seller.authorName}</Link>
                    <span>{Number(seller.price).toFixed(1)} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
