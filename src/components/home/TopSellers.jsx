import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
        );
        setSellers(data);
      } catch (err) {
        console.error("Error fetching Top Sellers", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSellers();
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
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                     <li key={index} className="d-flex align-items-center mb-3">
                      <div className="author_list_pp me-3">
                        <span className="placeholder rounded-circle" style={{ width: "50px", height: "50px" }}></span>
                      </div>
                      <div className="author_list_info w-100">
                        <span className="placeholder col-6 d-block mb-2"></span>
                        <span className="placeholder col-3 d-block"></span>
                      </div>
                    </li>
                  ))
                : sellers.map((sellers, index) => (
                    <li key={sellers.id || index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${sellers.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={sellers.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${sellers.authorId}`}>
                          {sellers.authorName}
                        </Link>
                        <span>{sellers.price} ETH</span>
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
