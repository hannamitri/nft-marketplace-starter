import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
        );
        const data = res.data;

        setTopSellers(
          data.map((e) => ({
            id: e.id,
            authorName: e.authorName,
            authorImage: e.authorImage,
            authorId: e.authorId,
            price: e.price,
          }))
        );
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
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
                    {new Array(12).fill(0).map((_, index) => (
                      <li key={index}>
                        <div className="card__header d-flex flex-row">
                          <div>
                            <img
                              className="card__header header__img skeleton"
                              alt=""
                            />
                          </div>
                          <div className="w-75 justify-content-center pl-2 pt-2">
                            <div className="skeleton skeleton-text skeleton-text__body "></div>
                            <div className="skeleton skeleton-text skeleton-text__body "></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
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
                  {topSellers.map((topSellers, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-author"
                            src={topSellers.authorImage}
                            alt={topSellers.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">{topSellers.authorName}</Link>
                        <span>{topSellers.price} ETH</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TopSellers;
