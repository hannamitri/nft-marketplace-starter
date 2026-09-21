import React from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";
import { API_URLS } from "../../api/nftApi";
import useApiList from "../../hooks/useApiList";
import useResponsiveCarousel from "../../hooks/useResponsiveCarousel";
import { NftGridSkeleton } from "../UI/LoadingSkeletons";
import SectionTitle from "../UI/SectionTitle";
import VerifiedAuthorLink from "../UI/VerifiedAuthorLink";

const NewItems = () => {
  const { data: items, loading, error } = useApiList(
    API_URLS.newItems,
    "Unable to load new items. Please try again later."
  );
  const { currentSlide, slider, sliderRef } = useResponsiveCarousel(items.length);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <SectionTitle>New Items</SectionTitle>
          {loading && <NftGridSkeleton count={4} label="Loading new items" />}
          {error && <p className="col-12" role="alert">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <p className="col-12">No new items available.</p>
          )}
          {!loading && !error && items.length > 0 && (
            <div className="col-12">
              <div className="new-items-carousel">
                <div ref={sliderRef} className="keen-slider new-items-slider" aria-label="New items carousel">
                  {items.map((item, index) => (
              <div className="keen-slider__slide" key={item.id}>
                <div className="nft_coll new-item-card" data-aos="fade-up" data-aos-delay={Math.min(index * 60, 240)}>
                  <Countdown expiryDate={item.expiryDate} />
                  <div className="nft_wrap">
                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy img-fluid"
                        alt={item.title}
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <VerifiedAuthorLink
                      authorId={item.authorId}
                      image={item.authorImage}
                      alt={`Creator of ${item.title}`}
                      title={`View creator of ${item.title}`}
                      imageClassName="lazy pp-coll"
                    />
                  </div>
                  <div className="nft_coll_info">
                    <Link to={`/item-details/${item.nftId}`}><h4>{item.title}</h4></Link>
                    <div className="new-item-price">{Number(item.price).toFixed(2)} ETH</div>
                    <div className="new-item-like">
                      <i className="fa fa-heart" aria-hidden="true"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
                  ))}
                </div>
                {items.length > 1 && (
                  <div className="new-items-controls">
                    <button type="button" aria-label="Previous new item" onClick={() => slider.current?.prev()}>&#8249;</button>
                    <button type="button" aria-label="Next new item" onClick={() => slider.current?.next()}>&#8250;</button>
                  </div>
                )}
              </div>
              {items.length > 1 && (
                <p className="new-items-position" aria-live="polite">
                  {currentSlide + 1} / {items.length}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
