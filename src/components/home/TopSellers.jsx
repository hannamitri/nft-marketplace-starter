import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import Service from "../../service/service";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState();
  const getTopSellers = async () => {
    try {
      const data = await Service.fetchTopSellers();
      setLoading(false);
      setTopSellers(data);
    } catch (error) {
      console.error("Error getting top sellers", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopSellers();
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
          {!loading ? (
            <ol className="author_list">
              {topSellers.map((topSeller) => (
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
                    <Link to={`/author/${topSeller.authorId}`}>
                      {topSeller.authorName}
                    </Link>
                    <span>{topSeller.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="col-md-12">
              <ol className="author_list">
                {new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Skeleton width={50} height={50} borderRadius={9999} />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info">
                      <Skeleton width="50%" height={20} />
                      <div>
                        <Skeleton width="20%" height={20} />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
