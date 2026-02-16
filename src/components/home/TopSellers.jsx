import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const TopSellers = () => {
  AOS.init();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
      );
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
  AOS.init({
    once: true,
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
          <div className="col-md-12" data-aos="fade-down" data-aos-easing="ease-in-out" data-aos-duration="500">
            <ol className="author_list">
              {
                loading 
                ?
                (
                  new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <Skeleton width='50px' height='50px' borderRadius='50%'/>
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">
                        <Skeleton width='100px' height='20px'/>
                        </Link>
                        <span>
                          <Skeleton width='40px' height='20px' />
                        </span>
                      </div>
                    </li>
                  ))
                )
                :
                (
                  data.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))
                )
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
