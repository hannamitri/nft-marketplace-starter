import React, { useRef } from 'react';
import OwlCarousel from 'react-owl-carousel';
import NFTCard from './NFTCard';

const NFTCarousel = ({ items = [], isCollection = false }) => {
  const owlRef = useRef(null);

  const options = {
    loop: true,
    margin: 20,
    nav: false,
    dots: false,
    responsiveRefreshRate: 50,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      992: { items: 3 },
      1200: { items: 4 }
    }
  };

  return (
    <div className="position-relative px-4">
      {/* Previous Button */}
      <button
        onClick={() => owlRef.current?.prev()}
        className="custom-owl-prev"
        aria-label="Previous"
        type="button"
      >
        &#10094;
      </button>

      <OwlCarousel ref={owlRef} className="owl-theme" {...options}>
        {items.map((item, index) => (
          <div key={item.id || index} className="item h-100 py-2 px-1">
            <NFTCard item={item} isCollection={isCollection} />
          </div>
        ))}
      </OwlCarousel>

      {/* Next Button */}
      <button
        onClick={() => owlRef.current?.next()}
        className="custom-owl-next"
        aria-label="Next"
        type="button"
      >
        &#10095;
      </button>
    </div>
  );
};

export default NFTCarousel;