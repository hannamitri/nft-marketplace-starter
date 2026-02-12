import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";


const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
          { signal: controller.signal }
        );
        const info = Array.isArray(data) ? data : Object.values(data || {});
        setTopSellers(info)
      } catch (e) {
        if (axios.isCancel(e)) {
          return
        }
        console.error("top sellers fetch failed:", e);
        setTopSellers([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const count = topSellers.length || 6;

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
          <div className="col-md-12">
            <ol className={`author_list ${loading ? "is-loading" : ""}`}>
              {loading ?
                Array.from({ length: count }).map((_, i) => (
              <li key={i} className="sk-item">
                <div className="author_list_pp">
                  <div className="skeleton-box sk-avatar" />
                </div>
                <div className="author_list_info">
                  <div className="skeleton-box sk-line sk-title" />
                  <div className="skeleton-box sk-line sk-sub" />
                </div>
              </li> )
              ):
              topSellers.map(item => (
                <li key={item.id}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{item.authorName}</Link>
                    <span>{item.price} ETH</span>
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
