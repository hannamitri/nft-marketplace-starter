import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer;

    async function fetchData() {
      setLoading(true)

      const response = await fetch(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );

      const result = await response.json();
      setData(result);

      timer = setTimeout(() => {
        setLoading(false);
      }, 2000); 
    }

    fetchData();

    return () => clearTimeout(timer);
  }, []);

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
            <ol className="author_list">


              {loading ? (new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <div className="skeleton"></div>
                  </div>
                </li>
              ))
            ) : (
              data.map((item, index) => {
                return (
                  <div key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
                    <span>{item.price}</span>
                  </div></div>
                )
              })
            )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
