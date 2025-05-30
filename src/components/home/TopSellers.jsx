import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [topSellersData, setTopSellersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setTopSellersData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return "Error Loading Content";
  }

  const renderNewItems = () => (
    <div className="row">
      {topSellersData.map((elem, id) => (
        <li key={id} id={elem.authorId}>
          <div className="author_list_pp">
            <Link to={`/author/${elem.authorId}`}>
              <img className="lazy pp-author" src={elem.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          <div className="author_list_info">
            <Link to="/author">{elem.authorName}</Link>
            <span>{elem.price}</span>
          </div>
        </li>
      ))}
    </div>
  );

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
              {!loading
                ? renderNewItems()
                : new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton width="50px"height="50px" borderRadius="100%"/>                          
                      </div>
                      <div className="author_list_info">
                        <Skeleton width="128.7px" height="21px" />
                        <div>
                          <Skeleton width="40px" height="16px" />
                        </div>
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
