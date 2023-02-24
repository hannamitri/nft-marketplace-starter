import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import "aos/dist/aos.css";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function nftTopSeller() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setTopSellers(data);
    setLoading(false);
  }

  useEffect(() => {
    nftTopSeller();
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
              {loading ? (
                <>
                  {new Array(12).fill(0).map((_, index) => (
                    <li data-aos="fade-in" data-aos-delay="200" key={index}>
                      <div className="author_list_pp">
                        <Skeleton width={46} height={50} borderRadius={1000} />
                      </div>
                      <div className="author_list_info">
                        <Skeleton width={75} borderRadius={1} />
                        <span>
                          <Skeleton width={38} height={20} borderRadius={1} />
                        </span>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {topSellers.map((_, index) => (
                    <li data-aos="fade-in" data-aos-delay="150" key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${_.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={_.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${_.authorId}`}>{_.authorName}</Link>
                        <span>{_.price} ETH</span>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
