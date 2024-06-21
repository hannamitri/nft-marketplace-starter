import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function skeletonState(index) {
  return (
    <li key={index}>
      <div className="author_list_pp">
      <div className="pp-author skeleton-box author_pp_skel"></div>
        <i className="fa fa-check"></i>
      </div>
      <div className="author_list_info skel_info_wrapper">
        <div className="skeleton-box author_name_skel"></div>
        <div className="skeleton-box author_price_skel"></div>
      </div>
    </li>
  );
}

const TopSellers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  });

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
                  {new Array(12).fill(0).map((_, index) => {
                    return skeletonState(index);
                  })}
                </>
              ) : (
                <>
                  {data.map((item) => (
                    <li key={item.id}>
                      <div className="author_list_pp">
                        <Link to="/author">
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
