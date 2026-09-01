import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";

const ItemDetails = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItemDetails = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=17914494"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch item details");
        }

        const data = await response.json();

        setItem(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, []);

  if (loading) {
    return <ItemDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div
                className="col-md-6 text-center"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>

              <div
                className="col-md-6"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <div className="item_info">
                  <h2>{item.title}</h2>

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
                          <Link to="/author">
                            <img
                              className="lazy"
                              src={item.ownerImage}
                              alt={item.ownerName}
                            />

                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link to="/author">
                            {item.ownerName}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>

                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <img
                              className="lazy"
                              src={item.creatorImage}
                              alt={item.creatorName}
                            />

                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link to="/author">
                            {item.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>

                    <div className="nft-item-price">
                      <img src={EthImage} alt="Ethereum" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ItemDetailsSkeleton = () => {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div
                  className="skeleton"
                  style={{
                    width: "100%",
                    height: "500px",
                    borderRadius: "8px",
                  }}
                ></div>
              </div>

              <div className="col-md-6">
                <div
                  className="skeleton"
                  style={{
                    width: "65%",
                    height: "38px",
                    marginBottom: "20px",
                  }}
                ></div>

                <div
                  className="skeleton"
                  style={{
                    width: "100%",
                    height: "18px",
                    marginBottom: "12px",
                  }}
                ></div>

                <div
                  className="skeleton"
                  style={{
                    width: "90%",
                    height: "18px",
                    marginBottom: "35px",
                  }}
                ></div>

                <SkeletonAuthor />

                <div style={{ marginTop: "35px" }}>
                  <SkeletonAuthor />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const SkeletonAuthor = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div
        className="skeleton"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
        }}
      ></div>

      <div
        className="skeleton"
        style={{
          width: "120px",
          height: "18px",
        }}
      ></div>
    </div>
  );
};

export default ItemDetails;