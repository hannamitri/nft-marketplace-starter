import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import useFetch from "../UI/apiFetch";

const TopSellers = () => {
  const { data, loading,} = useFetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
  
  
  return (
    <div data-aos="fade-up">
    <section id="section-popular" className="pb-5">
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
              {loading ? (
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <div>
                        <img
                          className="lazy pp-author"
                          src={AuthorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </div>
                    </div>
                    <div className="author_list_info">
                      <div>Loading...</div>
                      <span>Loading...</span>
                    </div>
                  </li>
                ))
              ) : (
                data && data.map((topSeller, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={`/author/${topSeller.authorId}`}>
                        <img
                        className="lazy pp-author"
                        src={topSeller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${topSeller.authorId}`}>{topSeller.authorName}</Link>
                    <span>{topSeller.price} ETH</span>
                  </div>
                </li>
                )
              ))}
              
            </ol>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default TopSellers;
