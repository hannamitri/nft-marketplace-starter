import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const ArrowNav = ({ loading, items }) => {
  return (
    <Carousel
      showArrows={true}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, left: 15 }}
          >
            ‹
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, right: 15 }}
          >
            ›
          </button>
        )
      }
      centerMode={true}
      infiniteLoop={true}
      showThumbs={false}
      autoPlay={false}
      emulateTouch={true}
      centerSlidePercentage={25}
      showStatus={false}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        items.map((item, index) => (
          <div key={index}>
            <img src={item.image} alt={item.title} />
            <p className="legend">{item.title}</p>
          </div>
        ))
      )}
    </Carousel>
  );
};

const arrowStyles = {
  position: 'absolute',
  zIndex: 2,
  top: 'calc(50% - 15px)',
  width: 30,
  height: 30,
  cursor: 'pointer',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  border: 'none',
  color: 'white',
  fontSize: '18px',
  borderRadius: '50%',
  outline: 'none',
};

export default ArrowNav;
