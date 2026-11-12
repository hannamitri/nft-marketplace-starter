import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import AOS from 'aos';

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
        );

        console.log("Top Sellers Response:", response.data);

        setTopSellers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching top sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellers();
    AOS.init();
  }, []);

  return (
    <section id="section-popular" className="pb-5" data-aos="zoom-in" data-aos-duration="1500">
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
                Array.from({ length: 12 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    width="100%"
                    height="80px"
                    borderRadius="8px"
                  />
                ))
              ) : topSellers.length > 0 ? (
                topSellers.map((seller, index) => (
                  <li key={seller.authorid || index}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt={seller.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}></Link>
                      <span>{seller.price ?? 0} ETH</span>
                    </div>
                  </li>
                ))
              ) : (
                <li>No sellers found.</li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
