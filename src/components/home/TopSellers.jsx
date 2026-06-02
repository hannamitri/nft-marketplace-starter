import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TopSellers.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init()

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
    .then((response) => {
      setTimeout(() => {
        setTopSellers(response.data);
        setLoading(false);
    }, 2000)
  })
    .catch((error) => {
      console.error("No author found:", error);
    });
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
          <div data-aos="fade-in" className="col-md-12">
            <ol className="author_list">
            {loading ?
              new Array(12).fill(0).map((_, index) => (
                <div className = "top__sellers">
                  <div className= "skeleton__authorImage--topSellers"></div>
                  <div className= "skeleton__authorName--topSellers">
                    <div className= "skeleton__authorPrice--topSellers"></div>
                  </div>
                </div>
              ))
              : 
              new Array(1).fill(0).map((_, index) => (
                topSellers.map((author, index) =>
                <li key={author.authorId}>
                  <div className="author_list_pp">
                    <Link to={`/author/${author.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={author.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${author.authorId}`}>{author.authorName}</Link>
                    <span>{author.price} ETH</span>
                  </div>
                </li>
                )
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
