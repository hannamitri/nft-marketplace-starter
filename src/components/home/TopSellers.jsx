import React from "react";
import { Link } from "react-router-dom";
import { API_URLS } from "../../api/nftApi";
import useApiList from "../../hooks/useApiList";
import { SellerListSkeleton } from "../UI/LoadingSkeletons";
import SectionTitle from "../UI/SectionTitle";
import VerifiedAuthorLink from "../UI/VerifiedAuthorLink";

const TopSellers = () => {
  const { data: sellers, loading, error } = useApiList(
    API_URLS.topSellers,
    "Unable to load top sellers. Please try again later."
  );

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <SectionTitle>Top Sellers</SectionTitle>
          <div className="col-md-12">
            {loading && <SellerListSkeleton />}
            {error && <p role="alert">{error}</p>}
            {!loading && !error && sellers.length === 0 && <p>No top sellers available.</p>}
            {!loading && !error && sellers.length > 0 && (
              <ol className="author_list">
              {sellers.map((seller, index) => (
                <li key={seller.id} data-aos="fade-up" data-aos-delay={Math.min(index * 40, 240)}>
                  <div className="author_list_pp">
                    <VerifiedAuthorLink
                      authorId={seller.authorId}
                      image={seller.authorImage}
                      alt={seller.authorName}
                      imageClassName="lazy pp-author"
                    />
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
