import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  const getTopSellers = async () => {
    const response = await axios.get(
      ` https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );
  };

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
              {new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-author"
                        src={AuthorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">Monica Lucas</Link>
                    <span>2.1 ETH</span>
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
