import React from "react";
import { Link } from "react-router-dom";

const BrowseByCategory = () => {
  const categories = [
    {
      name: "Art",
      icon: "fa fa-image",
    },
    {
      name: "Music",
      icon: "fa fa-music",
    },
    {
      name: "Domain Names",
      icon: "fa fa-search",
    },
    {
      name: "Virtual Worlds",
      icon: "fa fa-globe",
    },
    {
      name: "Trading Cards",
      icon: "fa fa-vcard",
    },
    {
      name: "Collectibles",
      icon: "fa fa-th",
    },
  ];

  return (
    <section id="section-category" className="no-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-once="true"
            >
              <h2>Browse by category</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {categories.map((category, index) => (
            <div
              className="col-md-2 col-sm-4 col-6 mb-sm-30"
              key={category.name}
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={index * 100}
              data-aos-offset="80"
              data-aos-once="true"
            >
              <Link
                to="/explore"
                className="icon-box style-2 rounded"
              >
                <i className={category.icon}></i>
                <span>{category.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;