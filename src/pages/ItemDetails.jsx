import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  window.scrollTo(0, 0);

  axios
    .get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    )
    .then((response) => {
      setItem(response.data);
    })
    .catch((error) => {
      console.error("Error fetching item details:", error);
    })
    .finally(() => {
      setLoading(false);
    });
}, [nftId]);

  if (loading) {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <Skeleton
                  width="100%"
                  height="500px"
                  borderRadius="12px"
                />
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  <Skeleton width="70%" height="36px" />

                  <div className="item_info_counts">
                    <Skeleton width="80px" height="24px" />
                    <Skeleton width="80px" height="24px" />
                  </div>

                  <div style={{ marginTop: "24px" }}>
                    <Skeleton width="100%" height="18px" />
                    <Skeleton width="95%" height="18px" />
                    <Skeleton width="85%" height="18px" />
                  </div>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>

                      <div className="item_author">
                        <div className="author_list_pp">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </div>

                        <div className="author_list_info">
                          <Skeleton width="120px" height="20px" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>

                      <div className="item_author">
                        <div className="author_list_pp">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </div>

                        <div className="author_list_info">
                          <Skeleton width="120px" height="20px" />
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>

                    <div className="nft-item-price">
                      <Skeleton width="90px" height="28px" />
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
}

if (!item) {
  return <p>Item details could not be loaded.</p>;
}

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
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
                  <p>
                    {item.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img className="lazy" src={item.ownerImage} alt={item.ownerName} />
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

export default ItemDetails;
