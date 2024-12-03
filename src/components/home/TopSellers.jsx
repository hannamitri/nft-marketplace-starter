import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [loading, setLoading] = useState(false);
  const [nftApi, setNftApi] = useState([]);

  async function fetchData() {
    setLoading(true);
    const data = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    const result = data.data;
    setNftApi(result);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
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
            <ol className="author_list author_list_top">
            {loading ? 
              new Array(12).fill(0).map((array, index) => ( 
                <li key={index}>
                  <div className="author_list_pp author_list_top-pp">
                    <Link to={`/author/`}>
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author"><Skeleton width="100px" height="20px" /></Link>
                    <span><Skeleton width="40px" height="20px" /> </span>
                  </div>
                </li>
              )) :
              nftApi.map((array, index) => (
                <li key={index}>
                  <div className="author_list_pp author_list_top-pp">
                    <Link to={`/author/${array.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={array.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${array.authorId}`}>{array.authorName}</Link>
                    <span>{array.price} ETH</span>
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
