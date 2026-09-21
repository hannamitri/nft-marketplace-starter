import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../UI/SectionTitle";

const CATEGORIES = [
  { label: "Art", icon: "fa-image" },
  { label: "Music", icon: "fa-music" },
  { label: "Domain Names", icon: "fa-search" },
  { label: "Virtual Worlds", icon: "fa-globe" },
  { label: "Trading Cards", icon: "fa-vcard" },
  { label: "Collectibles", icon: "fa-th" },
];

const BrowseByCategory = () => (
  <section id="section-category" className="no-top">
    <div className="container">
      <div className="row">
        <SectionTitle animation="fade-left">Browse by category</SectionTitle>
        {CATEGORIES.map((category, index) => (
          <div
            className="col-md-2 col-sm-4 col-6 mb-sm-30"
            key={category.label}
            data-aos="fade-left"
            data-aos-delay={index * 60}
          >
            <Link to="/explore" className="icon-box style-2 rounded">
              <i className={`fa ${category.icon}`} aria-hidden="true"></i>
              <span>{category.label}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BrowseByCategory;
