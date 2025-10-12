import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {
  const API_URL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

  const [topSellers, setTopSellers] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setTopSellers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error Fetching Data", error);
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
          <div className="col-md-12">
            <ol className="author_list">
              {(loading ? new Array(12).fill({}) : topSellers).map(
                (item, index) => {
                  const hasAuthor = Boolean(item && item.authorImage);
                  const isImageLoaded = Boolean(loadedImages[index]);

                  return (
                    <li key={item.id || index}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <div
                            className="position-relative"
                            style={{ width: 50, height: 50 }}
                          >
                            {!hasAuthor || !isImageLoaded ? (
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "50%",
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                }}
                              ></div>
                            ) : null}
                            {hasAuthor ? (
                              <img
                                className="lazy pp-author"
                                src={item.authorImage || AuthorImage}
                                alt=""
                                onLoad={() =>
                                  setLoadedImages((prev) => ({
                                    ...prev,
                                    [index]: true,
                                  }))
                                }
                                style={{
                                  display: isImageLoaded ? "block" : "none",
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : null}
                          </div>
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">
                          {item.authorName || (loading ? "" : "Monica Lucas")}
                        </Link>
                        <span>
                          {item.price
                            ? `${item.price} ETH`
                            : loading
                            ? ""
                            : "2.1 ETH"}
                        </span>
                      </div>
                    </li>
                  );
                }
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TopSellers;