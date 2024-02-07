import React from 'react';
import './ShimmerEffect.css'; // Make sure this is the correct path to your CSS file

const ShimmerEffect = () => (
  <div className="shimmer-wrapper">
    {/* Simulate an image placeholder */}
    <div className="shimmer-image shimmer"></div>

    {/* Simulate the profile picture placeholder */}
    <div className="shimmer-profile-picture shimmer"></div>

    {/* Simulate the main text placeholder */}
    <div className="shimmer-text large shimmer"></div>

    {/* Simulate the secondary text placeholder */}
    <div className="shimmer-text medium shimmer"></div>

    {/* Simulate the smaller text placeholder at the bottom */}
    <div className="shimmer-text small shimmer"></div>
  </div>
);

export default ShimmerEffect;
