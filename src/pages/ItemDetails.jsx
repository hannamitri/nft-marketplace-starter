import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import EthImage from "../images/ethereum.svg";
import AuthorDetails from "../components/UI/AuthorDetails";

const itemDetailUrlItemDetail =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [itemDetail, setItemDetail] = useState({});
  const [loading, setLoading] = useState(true);

  async function getItemDetail(itemDetailId) {
    setLoading(true);
    try {
      const url = itemDetailUrlItemDetail + itemDetailId;
      const { data } = await axios.get(url);
      setItemDetail(data);
    } catch (error) {
      console.error("Error fetching item detail:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (nftId) {
      getItemDetail(nftId);
    }
  }, [nftId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {!loading ? (
                  <img
                    src={itemDetail.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={itemDetail.title}
                  />
                ) : (
                  <Skeleton width="500px" height="500px" borderRadius="50%" />
                )}
              </div>
              <div className="col-md-6">
                {!loading ? (
                  <div className="item_info">
                    <h2>{itemDetail.title}</h2>
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {itemDetail.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {itemDetail.likes}
                      </div>
                    </div>
                    <p>{itemDetail.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <AuthorDetails
                          id={itemDetail.ownerId}
                          name={itemDetail.ownerName}
                          image={itemDetail.ownerImage}
                          loading={loading}
                        />
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <AuthorDetails
                          id={itemDetail.creatorId}
                          name={itemDetail.creatorName}
                          image={itemDetail.creatorImage}
                          loading={loading}
                        />
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{itemDetail.price}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="item_info">
                    <Skeleton width="100px" height="45px" borderRadius="50%" />
                    <div className="item_info_counts">
                      <Skeleton width="80px" height="30px" borderRadius="50%" />
                      <Skeleton width="80px" height="30px" borderRadius="50%" />
                    </div>
                    <Skeleton width="400px" height="80px" borderRadius="50%" />
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <Skeleton
                          width="15px"
                          height="25px"
                          borderRadius="50%"
                        />
                        <Skeleton
                          width="25px"
                          height="25px"
                          borderRadius="50%"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
