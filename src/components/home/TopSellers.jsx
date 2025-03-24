import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const TopSellers = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
  
    async function getData() {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
      );
      const results = response.data;
      setItems(results);
    }
    useEffect(() => {
      getData();
    }, []);
  
    setTimeout(() => {
      setLoading(false);
    }, 3000);


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
          <div className="col-md-12"  data-aos="fade-in" data-aos-duration="1000">
            <ol className="author_list">
            {loading 
            ? new Array(12).fill(0).map((_, index) => (
                  <li className="px-1" key={index}>
                    <div className="author_list_pp">
                      <div
                        className="skeleton-box"
                        style={{ width: "50px", height: "50px", borderRadius: "50%",}}
                      ></div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info">
                      <div
                        className="skeleton-box"
                        style={{ width: "100px", height: "18px" }}
                      ></div>
                       <br />
                      <div
                        className="skeleton-box"
                        style={{ width: "30px", height: "15px" }}
                      ></div>
                    </div>
                  </li>
                ))
              :items.map((item, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={`${item.authorImage}`}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${item.authorId}`}>{`${item.authorName}`}</Link>
                    <span>{`${item.price}`} ETH</span>
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
