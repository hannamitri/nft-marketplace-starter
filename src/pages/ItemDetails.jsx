import React, { useCallback, useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchData = useCallback(async () => {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );
    setData(data);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [fetchData]);

  function skeletonLoading() {
    return (
      <div className="item-details-skel-wrapper">
        <Skeleton height={"100%"} width={"50%"} />
        <div className="item-details-skel-wrap">
          <Skeleton height={40} width={300} />
          <div className="skel-author-info-wrapper">
            <div>
              <Skeleton height={30} width={80} borderRadius={4} />
            </div>
            <div className="margin-10">
              <Skeleton height={30} width={80} borderRadius={4} />
            </div>
          </div>
          <Skeleton height={100} width={500} />
          <br />
          <h6>Owner</h6>
          <div className="skel-author-info-wrapper">
            <Skeleton height={50} width={50} borderRadius={100} />
            <div className="margin-10">
              <Skeleton height={20} width={100} />
            </div>
          </div>
          <br />
          <h6>Creator</h6>
          <div className="skel-author-info-wrapper">
            <Skeleton height={50} width={50} borderRadius={100} />
            <div className="margin-10">
              <Skeleton height={20} width={100} />
            </div>
          </div>
          <br />
          <h6>Price</h6>
          <Skeleton height={30} width={80} />
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
              {loading ? (
                skeletonLoading()
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={data.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {data.title} #{data.id}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {data.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {data.likes}
                        </div>
                      </div>
                      <p>{data.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${data.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={data.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${data.ownerId}`}>
                                {data.ownerName}
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
                              <Link to={`/author/${data.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={data.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${data.creatorId}`}>
                                {data.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{data.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
