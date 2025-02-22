import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTopSellers() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
      );
      setTopSellers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchTopSellers();
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
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <div
                            className="skeleton-box"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              background: "#dddedc",
                            }}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">
                          <div
                            className="skeleton-box"
                            style={{
                              width: "100px",
                              height: "20px",
                            }}
                          />
                        </Link>
                        <span>
                          <div
                            className="skeleton-box"
                            style={{
                              width: "40px",
                              height: "20px",
                            }}
                          />
                        </span>
                      </div>
                    </li>
                  ))
                : topSellers.map((topSeller) => (
                    <div
                      data-aos="fade-in"
                      data-aos-duration="1000"
                      data-aos-easing="ease-out-quad"
                    >
                      <li key={topSeller.id}>
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
                          <Link to="/author">{topSeller.authorName}</Link>
                          <span>{topSeller.price} ETH</span>
                        </div>
                      </li>
                    </div>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
