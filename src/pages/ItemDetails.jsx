import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ItemDetails.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";

const ItemDetails = () => {
  const { nftId } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Load again whenever the id in the URL changes.
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);

    fetch(`${API_URL}?nftId=${nftId}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
        setLoading(false);
      });

    window.scrollTo(0, 0);
    return () => controller.abort();
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {error && (
              <p className="text-center id-error">
                This item couldn’t be loaded. Check the link or{" "}
                <Link to="/explore">browse all items</Link>.
              </p>
            )}

            {!error && (
              <div className="row">
                <div className="col-md-6 text-center">
                  {loading ? (
                    <div className="id-skeleton__image" />
                  ) : (
                    <img
                      src={item.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      data-aos="zoom-in"
                      alt={item.title}
                    />
                  )}
                </div>

                <div className="col-md-6">
                  {loading ? (
                    <div className="id-skeleton">
                      <span className="id-skeleton__line id-skeleton__line--title" />
                      <span className="id-skeleton__line" />
                      <span className="id-skeleton__line" />
                      <span className="id-skeleton__line id-skeleton__line--short" />
                    </div>
                  ) : (
                    <div className="item_info" data-aos="fade-up" data-aos-delay="100">
                      <h2>
                        {item.title} #{item.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {item.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {item.likes}
                        </div>
                      </div>

                      <p>{item.description}</p>

                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={item.ownerImage}
                                  alt={item.ownerName}
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.ownerId}`}>
                                {item.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>

                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={item.creatorImage}
                                  alt={item.creatorName}
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.creatorId}`}>
                                {item.creatorName}
                              </Link>
                            </div>
                          </div>

                          <div className="spacer-40"></div>

                          <h6>Price</h6>
                          <div className="nft-item-price">
                            <span>{item.price} ETH</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
