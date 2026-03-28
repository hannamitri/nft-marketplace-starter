import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useHotCollections } from '../hooks/useHotCollections';
import CollectionsCard from './CollectionsCard';
import CollectionCardSkeleton from './Collectioncardskeleton';
import './HotCollections.css';


const HotCollections = () => {
  const { collections, loading, error } = useHotCollections();

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slides: {
      perView: 4,
      spacing: 20,
    },
    breakpoints: {
      '(max-width: 1024px)': {
        slides: { perView: 3, spacing: 15 },
      },
      '(max-width: 768px)': {
        slides: { perView: 2, spacing: 10 },
      },
      '(max-width: 480px)': {
        slides: { perView: 1, spacing: 10 },
      },
    },
  });

  if (loading) {
    return (
      <section className="hot-collections">
        <h2 className="section-title">Hot Collections</h2>

        <div className="carousel-wrapper">
          <div className="carousel-container">
            <div className="skeleton-grid">
              {/* Show 4 skeleton cards */}
              {[...Array(4)].map((_, index) => (
                <CollectionCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="hot-collections">
        <h2 className="section-title">Hot Collections</h2>
        <div className="error-state" role="alert">
          <p>Error loading collections: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </section>
    );
  }

  if (collections.length === 0) {
    return (
      <section className="hot-collections">
        <h2 className="section-title">Hot Collections</h2>
        <div className="empty-state">
          <p>No collections available at this time.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="hot-collections">
      <h2 className="section-title">Hot Collections</h2>

      <div className="carousel-wrapper">
        {/* Left Arrow */}
        <button
          onClick={() => instanceRef.current?.prev()}
          className="carousel-arrow carousel-arrow-left"
          aria-label="Previous collections"
        >
          ←
        </button>

        {/* Carousel */}
        <div className="carousel-container">
          <div ref={sliderRef} className="keen-slider">
            {collections.map((collection) => (
              <div key={collection.id} className="keen-slider__slide">
                <CollectionsCard
                  id={collection.id}
                  title={collection.title}
                  nftImage={collection.nftImage}
                  authorImage={collection.authorImage}
                  code={collection.code}
                  authorId={collection.authorId}
                  nftId={collection.nftId}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => instanceRef.current?.next()}
          className="carousel-arrow carousel-arrow-right"
          aria-label="Next collections"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default HotCollections;