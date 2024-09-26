import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Aos from "aos";
import "aos/dist/aos.css";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);

  const getTopSellers = async () => {
    const response = await axios.get(
      ` https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );
    setTopSellers(response.data);
  };

  useEffect(() => {
    getTopSellers();
  }, []);

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container" data-aos-duration="600" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            {topSellers.length ? (
              <ol className="author_list">
                {topSellers.map((item, index) => (
                  <li key={index}>
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
                      <Link to={`/author/${item.authorID}`}>
                        {item.authorName}
                      </Link>
                      <span>{item.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <ol className="author_list">
                {new Array(12).fill(0).map((item, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={``}>
                        <Skeleton />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={``}>
                        <Skeleton />
                      </Link>
                      <span>
                        <Skeleton />
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
