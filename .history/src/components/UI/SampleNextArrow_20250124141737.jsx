import React from 'react';

const SampleNextArrow (props) => {
    const { onClick } = props;
    return (
      <div
        className='sliderArrow CarR'
        style={{ display: "block"}}
        onClick={onClick}
      >
        ›
      </div>
    );
}

export default SampleNextArrow;
