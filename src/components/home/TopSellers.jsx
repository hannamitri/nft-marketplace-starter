import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTopSellers } from "../../hooks/useTopSellers";
import AuthorImage from "../../images/author_thumbnail.jpg";
import ImageWithFallback from "../UI/ImageWithFallback";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const { sellers, loading, error } = useTopSellers();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const shouldShowSkeleton = showSkeleton || loading;

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
              {shouldShowSkeleton &&
                Array.from({ length: 5 }).map((_, index) => (
                  <li key={`top-seller-skeleton-${index}`}>
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="author_list_info">
                      <Skeleton width="120px" height="16px" borderRadius="4px" />
                      <div className="mt-1">
                        <Skeleton width="70px" height="14px" borderRadius="4px" />
                      </div>
                    </div>
                  </li>
                ))}
              {error && !shouldShowSkeleton && (
                <li className="w-100 text-center" style={{ border: "none" }}>
                  {error}
                </li>
              )}
              {!shouldShowSkeleton && !error && sellers.length === 0 && (
                <li className="w-100 text-center" style={{ border: "none" }}>
                  No sellers available.
                </li>
              )}
              {!shouldShowSkeleton &&
                !error &&
                sellers.map((seller) => (
                  <li key={seller.authorId}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <ImageWithFallback
                          className="lazy pp-author"
                          src={seller.authorImage}
                          fallbackSrc={AuthorImage}
                          alt={seller.authorName || "Creator"}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>
                        {seller.authorName || "Creator"}
                      </Link>
                      <span>{Number(seller.price || 0)} ETH</span>
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
