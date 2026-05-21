import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
// import EthImage from "../images/ethereum.svg";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItemDetails = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
        );
        setItemData(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (nftId) {
      fetchItemDetails();
    }
  }, [nftId]);

  if (loading || !itemData) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width="100%" height="450%" borderRadius="8px" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      <Skeleton width="70%" height="40px" />
                    </h2>
                    <div className="item_info_counts">
                      <Skeleton width="80px" height="25px" borderRadius="4px" />
                      <Skeleton width="80px" height="25px" borderRadius="4px" />
                    </div>
                    <div>
                      <Skeleton width="100%" height="80px" />
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
                            <Skeleton width="100px" height="20px" />
                          </div>
                        </div>
                      </div>
                    </div>
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
                        <Skeleton width="100px" height="20px" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="spacer-40"></div>
                <h6>Price</h6>
                <div className="nft-item-price">
                  <Skeleton width="120px" height="30px" />
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
        <section aria-label="section" className="mt90">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={itemData.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={itemData.title}
                />
              </div>
              <div className="col-md-6">
                <h2>
                  {itemData.title} #{itemData.tag}
                </h2>

                <div className="item_info_counts">
                  <div className="item_infor_views">
                    <i className="fa fa-eye"></i>
                    {itemData.likes}
                  </div>
                </div>
                <p>{itemData.description}</p>
                <div className="d-flex flex-row">
                  <div className="item_author">
                    <div className="author_list_pp">
                      <Link to={`/author/${itemData.ownerId}`}>
                        <img
                          className="lazy"
                          src={itemData.ownerImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${itemData.ownerId}`}>
                        {itemData.ownerName}
                      </Link>
                    </div>
                  </div>
                </div>
                <div>
                  <h6>Creator</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <Link to={`/author/${itemData.creatorId}`}>
                        <img
                          className="lazy"
                          src={itemData.creatorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${itemData.creatorId}`}>
                        {itemData.creatorName}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="spacer-40"></div>

              <h6>Price</h6>
              <div className="nft-item-price">
                <img src="../images.ethereum.svg" alt="" />
                <span>{itemData.price} ETh</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
