import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import { API_URLS } from "../../api/nftApi";
import useApiList from "../../hooks/useApiList";
import useResponsiveCarousel from "../../hooks/useResponsiveCarousel";
import SectionTitle from "../UI/SectionTitle";
import VerifiedAuthorLink from "../UI/VerifiedAuthorLink";

const HotCollections = () => {
  const { data: collections, loading, error } = useApiList(
    API_URLS.hotCollections,
    "Unable to load hot collections. Please try again later."
  );
  const { currentSlide, slider, sliderRef } = useResponsiveCarousel(collections.length);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <SectionTitle>Hot Collections</SectionTitle>
          {loading && (
            <div className="col-12 hot-collections-skeleton" role="status" aria-label="Loading hot collections">
              {[0, 1, 2, 3].map((item) => (
                <div className="nft_coll hot-collection-placeholder" key={item} aria-hidden="true">
                  <Skeleton width="100%" height="200px" borderRadius="10px 10px 0 0" />
                  <div className="hot-collection-placeholder-info">
                    <Skeleton width="60px" height="60px" borderRadius="50%" />
                    <Skeleton width="65%" height="18px" borderRadius="4px" />
                    <Skeleton width="35%" height="14px" borderRadius="4px" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {error && <p className="col-12" role="alert">{error}</p>}
          {!loading && !error && collections.length === 0 && (
            <p className="col-12">No hot collections available.</p>
          )}
          {!loading && !error && collections.length > 0 && (
            <div className="col-12">
              <div className="hot-collections-carousel">
              <div ref={sliderRef} className="keen-slider hot-collections-slider" aria-label="Hot collections carousel">
                {collections.map((collection, index) => (
                  <div className="keen-slider__slide" key={collection.id}>
              <div className="nft_coll" data-aos="fade-up" data-aos-delay={Math.min(index * 60, 240)}>
                <div className="nft_wrap">
                  <Link to={`/collection-details/${collection.id}`}>
                    <img src={collection.nftImage} className="lazy img-fluid" alt={collection.title} />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <VerifiedAuthorLink
                    authorId={collection.authorId}
                    image={collection.authorImage}
                    alt={`Creator of ${collection.title}`}
                    title={`View creator of ${collection.title}`}
                    imageClassName="lazy pp-coll"
                  />
                </div>
                <div className="nft_coll_info">
                  <Link to={`/collection-details/${collection.id}`}>
                    <h4>{collection.title}</h4>
                  </Link>
                  <span>ERC-{collection.code}</span>
                </div>
              </div>
                  </div>
                ))}
              </div>
              {collections.length > 1 && (
                <div className="hot-collections-controls">
                  <button type="button" aria-label="Previous collection" onClick={() => slider.current?.prev()}>&#8249;</button>
                  <button type="button" aria-label="Next collection" onClick={() => slider.current?.next()}>&#8250;</button>
                </div>
              )}
              </div>
              {collections.length > 1 && (
                <p className="hot-collections-position" aria-live="polite">
                  {currentSlide + 1} / {collections.length}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
