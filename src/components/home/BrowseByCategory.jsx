import React from "react";
import BrowseByCategoryCard from "../UI/BrowseByCategoryCard";

const BrowseByCategory = () => {
  return (
    <section id="section-category" className="no-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Browse by category</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <BrowseByCategoryCard 
            delay="100"
            icon="fa fa-image" 
            title="Art" />
          <BrowseByCategoryCard 
            delay="200"
            icon="fa fa-music" 
            title="Music" />
          <BrowseByCategoryCard 
            delay="300"
            icon="fa fa-search" 
            title="Domain Names" />
          <BrowseByCategoryCard 
          delay="400"
            icon="fa fa-globe" 
            title="Virtual Worlds" />
          <BrowseByCategoryCard 
            delay="500"
            icon="fa fa-vcard" 
            title="Trading Cards" />
          <BrowseByCategoryCard 
            delay="600"
            icon="fa fa-th" 
            title="Collectibles" />
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
