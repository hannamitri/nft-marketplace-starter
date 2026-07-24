import React from "react";
import { Link } from "react-router-dom";
import './TopSellers.css'

const TopSellers = (props) => {
  return (
    <section id="section-popular" className="pb-5" data-aos="fade" data-aos-delay="1000" data-aos-duration="1000">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {
              props.topSellers.length > 0?
                props.topSellers.map((seller, index) => {
                  return(
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                        <span>{seller.price}</span>
                      </div>
                    </li>
                  )
                })
                :
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to="/author" className="topsellers__skeleton--headshot">
                        
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author" className="topsellers__skeleton--title"></Link>
                      <span className="topsellers__skeleton--price"></span>
                    </div>
                  </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
