import React, { useEffect, useState, } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import EthImage from "../images/ethereum.svg"
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    let canceled = false;

    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(null);
        setItem(null);

        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`);

        if(!canceled) {
          setItem(response.data);
        }
      } catch(error) {
        console.error("Error fetching item details:", error);

        if (!canceled) {
          setError("Unable to load item information.");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    };

    fetchItem();

    return () => {
      canceled = true;
    };
  }, [nftId]);

  const renderAuthor = (name, image, id) => (
    <div className="item_author">
      <div className="author_list_pp">
        <Link to={`/author/${id}`}>
          <img className="lazy" src={image} alt={name} />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      <div className="author_list_info">
        <Link to={`/author/${id}`}>{name}</Link>
      </div>
    </div>
  );

  return(
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading && (
                  <Skeleton width="100%" height="410px" borderRadius="12px" />
                )}

                {!loading && item && (
                  <img src={item.nftImage} className="img-fluid img-rounded mb-sm-30 nft-image" alt={item.title} />
                )}
              </div>

              <div className="col-md-6">
                {loading && (
                  <div className="item_info">
                    <Skeleton width="260px" height="32px" />

                    <div className="item_info_counts">
                      <Skeleton width="65px" height="30px" />
                      <Skeleton width="65px" height="30px" />
                    </div>

                    <Skeleton width="100%" height="16px" />
                    <Skeleton width="90%" height="16px" />
                    <Skeleton width="75%" height="16px" />

                    <div className="d-flex flex-row mt-4">
                      <div className="mr40">
                        <Skeleton width="55px" height="18px" />
                        <div className="item_author mt-2">
                          <Skeleton width="40px" height="40px" borderRadius="50%" />
                          <Skeleton width="110px" height="16px" />
                        </div>
                      </div>

                      <div>
                        <Skeleton width="55px" height="18px" />
                        <div className="item_author mt-2">
                          <Skeleton width="40px" height="40px" borderRadius="50%" />
                          <Skeleton width="110px" height="16px" />
                        </div>
                      </div>
                    </div>

                    <div className="de_tab tab_simple mt-4">
                      <Skeleton width="55px" height="18px" />
                      <Skeleton width="100px" height="30px" />
                    </div>
                  </div>
                )}

                {!loading && error && (
                  <div className="text-center">
                    <p>{error}</p>
                  </div>
                )}

                {!loading && item && (
                  <div className="item_info">
                    <h2>{item.title} #{item.tag}</h2>

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
                        {renderAuthor(item.ownerName, item.ownerImage, item.ownerId)}
                      </div>
                    </div>

                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        {renderAuthor(item.creatorName, item.creatorImage, item.creatorId)}
                      </div>

                      <div className="spacer-40"></div>
                      <h6>Price</h6>

                      <div className="nft-item-price">
                        <img src={EthImage} alt="Ethereum" />
                        <span>{item.price}</span>
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