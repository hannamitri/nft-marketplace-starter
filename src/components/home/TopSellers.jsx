import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";
import AuthorSkeleton from "../../images/lightgray.jpg"

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
      );

      setTopSellers(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  });
  
  // Restore the scroll position after refresh
  window.addEventListener('load', () => {
    if (sessionStorage.getItem('scrollPosition')) {
      window.scrollTo(0, sessionStorage.getItem('scrollPosition'));
      sessionStorage.removeItem('scrollPosition');
    }
  });

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <div className="col-md-12">
              <ol className="author_list">
                {new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                     <div className="author_list_pp">
                      <img id="authorImage" className="lazy" src={AuthorSkeleton} alt="" />
                      <i className="fa fa-check"></i>
                    </div>                
                    <div className="author_list_info">
                      <div className="author_list_name--skeleton" />
                      <div className="author_list_price--skeleton" />
                    
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="col-md-12">
              <ol className="author_list">
                {topSellers.map((topSeller) => (
                  <li key={topSeller.id}>
                    <div className="author_list_pp">
                      <Link  to={{ pathname: `/author/${topSeller.authorId}`, state: topSeller.authorId}}>
                        <img
                          className="lazy pp-author"
                          src={topSeller.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={{ pathname: `/author/${topSeller.authorId}`, state: topSeller.authorId}}>{topSeller.authorName}</Link>
                      <span>{topSeller.price}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
