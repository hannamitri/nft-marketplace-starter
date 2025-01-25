import React from 'react';

const SamplePrevArrow = (props) => {
        const {onClick } = props;
        return (
          <div
            className='sliderArrow CarL'
            style={{ display: "block" }}
            onClick={onClick}
          >
            ‹
          </div>
        );
      }

export default SamplePrevArrow;
