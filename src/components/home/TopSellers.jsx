import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../css/home css/topsellers.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const TopSellers = () => {
  const { id } = useParams();
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const response = await axios(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers/${id}`
    );

    setTopSellers(response.data);
    // console.log(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
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
                      <div className="author_list_info-loading">
                        <div className="top__sellers--loading"></div>
                        <div className="author__list--text">
                          <div className="author__list-topsellers--name"></div>
                          <span className="author__list-topsellers--price"></span>
                        </div>
                      </div>
                    </li>
                  ))
                : topSellers.map((response, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${response.authorId}`}>
                          <img
                            data-aos="fade-in"
                            data-aos-offset="200"
                            data-aos-delay="50"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                            className="lazy pp-author"
                            src={response.authorImage}
                            alt=""
                          />
                          <i
                            className="fa fa-check"
                            data-aos="fade-in"
                            data-aos-offset="200"
                            data-aos-delay="50"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="true"
                          ></i>
                        </Link>
                      </div>
                      <div
                        className="author_list_info"
                        data-aos="fade-in"
                        data-aos-offset="200"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out"
                        data-aos-mirror="true"
                        data-aos-once="true"
                      >
                        <Link to={`/author/${response.authorId}`}>
                          {response.authorName}
                        </Link>
                        <span
                          data-aos="fade-in"
                          data-aos-offset="200"
                          data-aos-delay="50"
                          data-aos-duration="1000"
                          data-aos-easing="ease-in-out"
                          data-aos-mirror="true"
                          data-aos-once="true"
                        >
                          {response.price} ETH
                        </span>
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
