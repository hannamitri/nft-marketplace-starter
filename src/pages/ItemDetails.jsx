import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const ItemDetails = () => {
  const [data, setData] = useState({});
  const { itemId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function getData() {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`
        );

        if (isMounted) {
          setData(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (itemId) {
      getData();
    }

    return () => {
      isMounted = false;
    };
  }, [itemId]);

  return (
    <>
      {loading && (
        <div id="wrapper">
          <div className="no-bottom no-top" id="content">
            <section className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <Skeleton width={500} height={500} borderRadius={10} />
                  </div>
                  <div className="col-md-6">
                    <Skeleton width={300} height={30} />
                    <Skeleton width={200} height={20} />
                    <Skeleton width={400} height={100} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {!loading && (
        <div id="wrapper">
          <div className="no-bottom no-top" id="content">
            <section className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <img
                      src={data.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt={data.title}
                    />
                  </div>

                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{data.title}</h2>

                      <div className="item_info_counts">
                        <div>
                          <i className="fa fa-eye"></i> {data.views}
                        </div>
                        <div>
                          <i className="fa fa-heart"></i> {data.likes}
                        </div>
                      </div>

                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${data.ownerId}`}>
                                <img
                                  src={data.ownerImage}
                                  alt={data.ownerName}
                                />
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${data.ownerId}`}>
                                {data.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="de_tab tab_simple">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${data.creatorId}`}>
                              <img
                                src={data.creatorImage}
                                alt={data.creatorName}
                              />
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${data.creatorId}`}>
                              {data.creatorName}
                            </Link>
                          </div>
                        </div>

                        <div className="spacer-40"></div>

                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="Ethereum" />
                          <span>1.85</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetails;