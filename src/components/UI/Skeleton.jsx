import React from 'react';

const Skeleton = ({ width, height, borderRadius, border }) => {
  return (
    <div
      className='skeleton-box'
      style={{
        width,
        height,
        borderRadius,
        border,
      }}
    ></div>
  );
};

export default Skeleton;
