import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState();

  async function topSellersData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setLoading(false);
    setNfts(data);
  }

  useEffect(() => {
    topSellersData();
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
              {!loading ? (
                <>
                  {nfts.map((nft, index) => (
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
                        <Link to="/author">{nft.authorName}</Link>
                        <span>{nft.price} ETH</span>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {new Array(12).fill(0).map((_, index) => (
                    <li key={index} >
                      <div className="author_list_pp">
                        <div
                          className="lazy pp-author skeleton-box"
                          style={{ width: 50, height: 50, borderRadius: 999 }}
                        ></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <div
                          className="skeleton-box"
                          style={{ width: "80px" }}
                        ></div>
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
