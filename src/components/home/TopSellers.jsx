import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [topSeller, setTopSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    )
      .then((response) => response.json())
      .then((data) => {
        setTopSeller(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-down">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list" data-aos="fade-up">
              {isLoading ? (
                <div className="row">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item.id}>
                      <div className="nft__item">
                        <div className="skeleton skeleton--avatar"></div>
                        <div className="skeleton skeleton--image"></div>
                        <div className="skeleton skeleton--title"></div>
                        <div className="skeleton skeleton--price"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {topSeller.map((item) => (
                    <li key={item.id}>
                      <div className="author_list_pp">
                        <Link to={`author/${item.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={item.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`item-details/${item.nftId}`}>
                          {item.authorName}
                        </Link>
                        <span>{item.price} ETH</span>
                      </div>
                    </li>
                  ))}
                </div>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
