import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Aos from "aos";

const TopSellers = () => {
  const[items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`)
    setItems(data)
  }

  useEffect(() => {
      fetchData();
      Aos.init();
  }, [])

  setTimeout(() => {
    setLoading(false)
  }, 3000);

  return (
    <section id="section-popular" className="pb-5" data-aos="fade-up"
    data-aos-duration="1000" data-aos-delay="1000">
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
              {loading ? (
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                   <div className="skeleton-box"
                      style={{width: "50px", height: "50px", borderRadius: "50%" }}>
                   </div>
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="author_list_info">
                  <div className="skeleton-box"
                  style={{width: "50px", height: "15px", borderRadius: "5%" }}>
                  </div>
                  <div className="skeleton-box"
                  style={{width: "20px", height: "10px", borderRadius: "5%" }}>
                  </div>
                    </div>
                </li>
                ))) : (
              items.map((item) => (
                <li key={item.id}>
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
                    <Link to="/author">{item.authorName}</Link>
                    <span>{item.price} ETH</span>
                  </div>
                </li>
              )))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
