import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [items, setItems] = useState([null]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );
    setItems(response.data);
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    if (nftId) {
      getData();
    }
    
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton width="100%" height="630px" borderRadius="10px" />
                ) : (
                  <img
                    src={items.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {loading ? (
                      <Skeleton width="50%" height="40px" borderRadius="5px" />
                    ) : (
                      `${items.title} #${items.tag}`
                    )}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? <Skeleton width="30px" height="16px" /> : items.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {loading ? <Skeleton width="30px" height="16px" /> : items.likes}
                    </div>
                  </div>
                  <p>
                    { loading ? (
                      <>
                      <Skeleton width="90%" height="15px" />
                      <Skeleton width="80%" height="15px" />
                      <Skeleton width="75%" height="15px" />
                      </>
                      ) : (
                        items.description
                        )}
                        </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                          <Link to={`/author/${items.ownerId}`}>
                            <img
                              className="lazy"
                              src={items.ownerImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="100px" height="20px" />
                          ) : (
                          <Link to="/author">{items.ownerName}</Link>
                          )}
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
                          {loading ? (
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                          ) : (
                          <Link to={`/author/${items.creatorId}`}>
                            <img
                              className="lazy"
                              src={items.creatorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton width="100px" height="20px" />
                          ) : (
                          <Link to="/author">{items.creatorName}</Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      { loading ? (
                        <Skeleton width="50px" height="20px" />
                      ) : (
                      <span>{items.price}</span>
                      )}
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

export default ItemDetails;
