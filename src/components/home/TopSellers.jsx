import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [topSellersData, setTopSellersData] = useState(null);
  const url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";
  const skeletonArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => {
    async function renderData() {
      const response = await axios.get(url);
      setTimeout(() => {
        setTopSellersData(response.data);
      }, 200);
    }

    renderData();
  }, [url]);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container" data-aos="fade-in">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {topSellersData ? (
                <>
                  {topSellersData.map((nft, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${nft.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={nft.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${nft.authorId}`}>
                          {nft.authorName}
                        </Link>
                        <span>{nft.price} ETH</span>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {skeletonArr.map((__, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <span>
                          <div
                            className="lazy pp-author top-sellers__img--skeleton skeleton"
                            alt=""></div>
                          <i className="fa fa-check"></i>
                        </span>
                      </div>
                      <div className="author_list_info">
                        <span className="skeleton top-seller__name--skeleton">
                          Author Name
                        </span>
                        <span className="skeleton top-seller__price--skeleton">
                          Price ETH
                        </span>
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
