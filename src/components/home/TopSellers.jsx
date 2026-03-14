import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const BASE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

const TopSellers = () => {
  //USE STATE
  const [topSell, setTopSell] = useState([]);
  const [loading, setLoading] = useState(false);

  //Axios API call
  async function getTopSell() {
    const response = await axios.get(BASE_URL);
    setTopSell(response.data);
    setLoading(false);
  }
  //USE EFFECT
  useEffect(() => {
    setLoading(true);
    getTopSell();
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
          <div className="col-md-12" data-aos="fade-in" data-aos-duration="1000">
            <ol className="author_list">
              {loading
                ? //Render skeleton while loading
                  new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={``}>
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <Link to="">
                          <Skeleton width="100px" height="20px" />
                        </Link>
                        <br />
                        <Skeleton width="60px" height="20px" />
                      </div>
                    </li>
                  ))
                : //Render actual data when loaded
                  topSell.map((tops, id) => (
                    <li key={id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${tops.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={tops.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${tops.authorId}`}>
                          {tops.authorName}
                        </Link>
                        <span>{tops.price} ETH</span>
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
