import React from "react";
import { Link } from "react-router-dom";

const BrowseByCategory = () => {
  return (
    <section id="section-category" className="container py-5 my-4">
      <div className="row g-4 justify-content-center">
        
        {/* Section Header */}
        <div className="col-12 text-center mb-4">
          <h2 className="section-title fw-bold fs-2 text-dark">
            Browse by category
          </h2>
        </div>

        {/* Category Item 1: Art */}
        <div className="col-lg-2 col-md-4 col-sm-6 col-6">
          <Link
            to="/explore"
            className="icon-box style-2 rounded-4 text-decoration-none d-flex flex-column align-items-center justify-content-center p-4 bg-light shadow-sm text-dark hover-purple transition-all h-100"
          >
            <i className="fa fa-image fs-2 text-purple mb-3"></i>
            <span className="fw-semibold small">Art</span>
          </Link>
        </div>

        {/* Category Item 2: Music */}
        <div className="col-lg-2 col-md-4 col-sm-6 col-6">
          <Link
            to="/explore"
            className="icon-box style-2 rounded-4 text-decoration-none d-flex flex-column align-items-center justify-content-center p-4 bg-light shadow-sm text-dark hover-purple transition-all h-100"
          >
            <i className="fa fa-music fs-2 text-purple mb-3"></i>
            <span className="fw-semibold small">Music</span>
          </Link>
        </div>

        {/* Category Item 3: Domain Names */}
        <div className="col-lg-2 col-md-4 col-sm-6 col-6">
          <Link
            to="/explore"
            className="icon-box style-2 rounded-4 text-decoration-none d-flex flex-column align-items-center justify-content-center p-4 bg-light shadow-sm text-dark hover-purple transition-all h-100"
          >
            <i className="fa fa-search fs-2 text-purple mb-3"></i>
            <span className="fw-semibold small text-center">Domain Names</span>
          </Link>
        </div>

        {/* Category Item 4: Virtual Worlds */}
        <div className="col-lg-2 col-md-4 col-sm-6 col-6">
          <Link
            to="/explore"
            className="icon-box style-2 rounded-4 text-decoration-none d-flex flex-column align-items-center justify-content-center p-4 bg-light shadow-sm text-dark hover-purple transition-all h-100"
          >
            <i className="fa fa-globe fs-2 text-purple mb-3"></i>
            <span className="fw-semibold small text-center">Virtual Worlds</span>
          </Link>
        </div>

        {/* Category Item 5: Trading Cards */}
        <div className="col-lg-2 col-md-4 col-sm-6 col-6">
          <Link
            to="/explore"
            className="icon-box style-2 rounded-4 text-decoration-none d-flex flex-column align-items-center justify-content-center p-4 bg-light shadow-sm text-dark hover-purple transition-all h-100"
          >
            <i className="fa fa-vcard fs-2 text-purple mb-3"></i>
            <span className="fw-semibold small text-center">Trading Cards</span>
          </Link>
        </div>

        {/* Category Item 6: Collectibles */}
        <div className="col-lg-2 col-md-4 col-sm-6 col-6">
          <Link
            to="/explore"
            className="icon-box style-2 rounded-4 text-decoration-none d-flex flex-column align-items-center justify-content-center p-4 bg-light shadow-sm text-dark hover-purple transition-all h-100"
          >
            <i className="fa fa-th fs-2 text-purple mb-3"></i>
            <span className="fw-semibold small">Collectibles</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default BrowseByCategory;