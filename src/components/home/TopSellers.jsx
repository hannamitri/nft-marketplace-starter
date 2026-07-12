import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
//API Link https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers

const TopSellers = () => {
  const [seller, setSeller] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    )
      .then((res) => res.json())
      .then((data) => {
        setSeller(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error: ", err);
        setLoading(false);
      });
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
          {loading ? (
            <>
              {new Array(4).fill(0).map((_, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <div className="skeleton skeleton-img" />
                  </div>
                  <div className="nft_coll_pp">
                    <div className="skeleton skeleton-avatar" />
                  </div>
                  <div className="nft_coll_info">
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text-sm" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div data-aos="zoom-in-up" data-aos-duration="1200">
                <div className="col-md-12">
                  <ol className="author_list">
                    {seller.map((item) => (
                      <li key={item.id}>
                        <div className="author_list_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img
                              src={item.authorImage}
                              alt={item.authorName}
                              className="lazy pp-author"
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
                  </ol>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
