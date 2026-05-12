import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { itemId } = useParams();

  const [nft, setNft] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`,
      )
      .then((response) => {
        console.log(response.data);
        setNft(response.data);
      });
  }, [itemId]);

  if (!nft) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>

          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <Skeleton width="100%" height="600px" />
                </div>

                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="300px" height="40px" />

                    <div style={{ margin: "20px 0" }}>
                      <Skeleton width="120px" height="20px" />
                    </div>

                    <Skeleton width="100%" height="20px" />
                    <Skeleton width="90%" height="20px" />
                    <Skeleton width="80%" height="20px" />

                    <div style={{ marginTop: "40px" }}>
                      <Skeleton width="60px" height="60px" borderRadius="50%" />
                    </div>

                    <div style={{ marginTop: "40px" }}>
                      <Skeleton width="120px" height="30px" />
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

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={nft.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {nft.title} #{nft.tag}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nft.views}
                    </div>

                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nft.likes}
                    </div>
                  </div>

                  <p>{nft.description}</p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>

                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.authorId}`}>
                            <img
                              className="lazy"
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
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>

                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nft.authorId}`}>
                            <img
                              className="lazy"
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
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Price</h6>

                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{nft.price}</span>
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
