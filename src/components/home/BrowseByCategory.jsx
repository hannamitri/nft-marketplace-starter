import React from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "../UI/ScrollReveal";
import ScrollRevealLeft from "../UI/ScrollRevealLeft";

const BrowseByCategory = () => {
  return (
    <section id="section-category" className="no-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <ScrollReveal>
              <div className="text-center">
                <h2>Browse by category</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </ScrollReveal>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <ScrollRevealLeft delay={0}>
              <Link to="/explore" className="icon-box style-2 rounded">
                <i className="fa fa-image"></i>
                <span>Art</span>
              </Link>
            </ScrollRevealLeft>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <ScrollRevealLeft delay={100}>
              <Link to="/explore" className="icon-box style-2 rounded">
                <i className="fa fa-music"></i>
                <span>Music</span>
              </Link>
            </ScrollRevealLeft>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <ScrollRevealLeft delay={200}>
              <Link to="/explore" className="icon-box style-2 rounded">
                <i className="fa fa-search"></i>
                <span>Domain Names</span>
              </Link>
            </ScrollRevealLeft>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <ScrollRevealLeft delay={300}>
              <Link to="/explore" className="icon-box style-2 rounded">
                <i className="fa fa-globe"></i>
                <span>Virtual Worlds</span>
              </Link>
            </ScrollRevealLeft>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <ScrollRevealLeft delay={400}>
              <Link to="/explore" className="icon-box style-2 rounded">
                <i className="fa fa-vcard"></i>
                <span>Trading Cards</span>
              </Link>
            </ScrollRevealLeft>
          </div>
          <div className="col-md-2 col-sm-4 col-6 mb-sm-30">
            <ScrollRevealLeft delay={500}>
              <Link to="/explore" className="icon-box style-2 rounded">
                <i className="fa fa-th"></i>
                <span>Collectibles</span>
              </Link>
            </ScrollRevealLeft>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
