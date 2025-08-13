import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {
  const [topSellerData, setTopSellerData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getTopSellerData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    console.log("TopSellerData:", data);
    setLoading(false);
    setTopSellerData(data);
  }

  function topSellerLoadingState() {
    return (
      <>
        {new Array(12).fill(0).map((_, index) => (
          <li className="top-sellers__skeleton" key={index}>
            <div className="author_list_pp author__pp--skeleton">
              <div className="pp-author-skeleton skeleton-box"></div>
              <i className="fa fa-check"></i>
            </div>
            <div className="author_list_info author_list_info__skeleton">
              <div className="author-list__name--skeleton skeleton-box"></div>
              <div className="author-list__price--skeleton skeleton-box"></div>
            </div>
          </li>
        ))}
      </>
      
    );
  }

  useEffect(() => {
    getTopSellerData();
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
            <ol type="1" className="author_list">
              {!loading ? (
                <>
                  {topSellerData.map((nft, id) => (
                    <li key={id}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-author"
                            src={nft.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">{nft.authorName}</Link>
                        <span>{nft.price} ETH</span>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                topSellerLoadingState()
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
