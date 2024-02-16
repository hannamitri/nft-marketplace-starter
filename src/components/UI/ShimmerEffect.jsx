import React from 'react';
import './ShimmerEffect.css'; // Make sure this is the correct path to your CSS file

const ShimmerEffect = () => (
  <div className="shimmer-wrapper">
    <div className="shimmer-profile-picture shimmer"></div>
    <div className="shimmer-image shimmer"></div>
    <div className="shimmer-text-block">
      <div className="shimmer-text large shimmer"></div>
      <div className="shimmer-text medium shimmer"></div>
    </div>
    <div className="shimmer-countdown"></div>
    <div className="shimmer-text countdown shimmer"></div>
    <div className="shimmer-heart shimmer"></div>
  </div>
);

export default ShimmerEffect;
