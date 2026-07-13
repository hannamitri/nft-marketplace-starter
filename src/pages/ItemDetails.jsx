import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import EthImage from "../images/ethereum.svg";

const ITEM_DETAILS_API =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";
const DEFAULT_NFT_ID = "17914494";

const ItemDetailsSkeleton = () => (
  <div className="row">
    <div className="col-md-6 text-center">
      <Skeleton width="100%" height="520px" borderRadius="8px" />
    </div>
    <div className="col-md-6">
      <div className="item_info">
        <Skeleton width="65%" height="36px" />
        <div className="spacer-20"></div>
        <Skeleton width="100%" height="18px" />
        <Skeleton width="90%" height="18px" />
        <div className="spacer-20"></div>
        <Skeleton width="180px" height="50px" />
        <div className="spacer-40"></div>
        <Skeleton width="180px" height="50px" />
      </div>
    </div>
  </div>
);

const Person = ({ id, image, name }) => (
  <div className="item_author">
    <div className="author_list_pp">
      <Link to={`/author/${id}`} title={`View ${name}'s profile`}>
        <img className="lazy" src={image} alt={name} />
        <i className="fa fa-check"></i>
      </Link>
    </div>
    <div className="author_list_info">
      <Link to={`/author/${id}`}>{name}</Link>
    </div>
  </div>
);

const ItemDetails = () => {
  const { nftId } = useParams();
  const activeNftId = nftId || DEFAULT_NFT_ID;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeNftId]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchItemDetails() {
      setLoading(true);
      setError("");
      setItem(null);

      try {
        const { data } = await axios.get(ITEM_DETAILS_API, {
          params: { nftId: activeNftId },
          signal: controller.signal,
        });
        const itemDetails = Array.isArray(data) ? data[0] : data;

        if (!itemDetails?.nftId) {
          throw new Error("Item not found");
        }

        setItem(itemDetails);
      } catch (requestError) {
        if (requestError.code !== "ERR_CANCELED") {
          console.error("Failed to fetch item details:", requestError);
          setError("Unable to load this item right now. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchItemDetails();

    return () => controller.abort();
  }, [activeNftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="Item details" className="mt90 sm-mt-0">
          <div className="container">
            {loading ? (
              <ItemDetailsSkeleton />
            ) : error ? (
              <div className="row">
                <div className="col-md-12 text-center">
                  <h2>Item unavailable</h2>
                  <p>{error}</p>
                  <Link className="btn-main" to="/explore">
                    Back to Explore
                  </Link>
                </div>
              </div>
            ) : (
              <div className="row">
                <div
                  className="col-md-6 text-center"
                  data-aos="fade-right"
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
                  data-aos-delay="100"
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
                        <Person
                          id={item.ownerId}
                          image={item.ownerImage}
                          name={item.ownerName}
                        />
                      </div>
                    </div>

                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <Person
                          id={item.creatorId}
                          image={item.creatorImage}
                          name={item.creatorName}
                        />
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
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
