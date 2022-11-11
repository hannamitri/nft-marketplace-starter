import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellData, getsellData] = useState([]);
  const [loading, setLoading] = useState(undefined);

  async function getData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    getsellData(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
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
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton width={48} height={52} borderRadius={999} />
                      </div>
                      <div className="author_list_info">
                        <Skeleton width={48} height={52} borderRadius={999} />
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {sellData.map((topData) => (
                    <li key={topData.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${topData.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={topData.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${topData.authorId}`}>
                          {topData.authorName}
                        </Link>
                        <span>{topData.price} Eth</span>
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
