import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const TopSellers = () => {
  const [topData, setTopData] = useState([]);
  const loading = topData.length === 0;

  async function fetchTopSellers() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
      );
      setTopData(data);
    } catch (error) {
      console.error("Error fetching api:", error);
      setTopData([]);
    }
  }

  console.log(topData);

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
              {loading && (
                <>
                  {topData.map((topData) => (
                    <li key={topData.id}>
                      <div className="author_list_pp">
                        <Skeleton circle={true} height={50} />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <Skeleton width={80} />
                        <span>
                          <Skeleton width={35} />
                        </span>
                      </div>
                    </li>
                  ))}
                </>
              )}
              {!loading && (
                <>
                  {topData.map((topData) => (
                    <li key={topData.id}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-author"
                            src={topData.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">{topData.authorName}</Link>
                        <span>{topData.price}</span>
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
