import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);

  async function fetchSellers() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );

    setSellers(data);
  }

  useEffect(() => {
    setTimeout(() => {
      fetchSellers();
    }, 600);
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
              {sellers.map((sell) => (
                <li key={sell.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${sell.authorId}}`}>
                      <img
                        className="lazy pp-author"
                        src={sell.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${sell.authorId}`}>
                      {sell.authorName}
                    </Link>
                    <span>{sell.price}</span>
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
