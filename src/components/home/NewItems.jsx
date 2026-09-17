import React from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";
import { API_URLS } from "../../api/nftApi";
import useApiList from "../../hooks/useApiList";
import useResponsiveCarousel from "../../hooks/useResponsiveCarousel";
import { NftGridSkeleton } from "../UI/LoadingSkeletons";

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
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading && <NftGridSkeleton count={4} label="Loading new items" />}
          {error && <p className="col-12" role="alert">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <p className="col-12">No new items available.</p>
          )}
          {!loading && !error && items.length > 0 && (
            <div className="col-12">
              <div className="new-items-carousel">
                <div ref={sliderRef} className="keen-slider new-items-slider" aria-label="New items carousel">
                  {items.map((item) => (
              <div className="keen-slider__slide" key={item.id}>
                <div className="nft_coll new-item-card">
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
                    <Link to={`/${item.authorId}/author`} title={`View creator of ${item.title}`}>
                      <img className="lazy pp-coll" src={item.authorImage} alt={`Creator of ${item.title}`} />
                    </Link>
                    <i className="fa fa-check" aria-hidden="true"></i>
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
