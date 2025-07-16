import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import Countdown from "../components/UI/Countdown";
import eth from "../images/ethereum.svg";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
          { timeout: 5000 } // <-- Add a 5-second timeout
        );
        setItem(data);
      } catch (error) {
        console.error("API Request Failed:", error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    fetchItemDetails();
  }, [nftId]);

  const renderSkeleton = () => (
    <div className="row">
      <div className="col-md-6 text-center">
        <Skeleton width="100%" height="100%" borderRadius="8px" />
      </div>
      <div className="col-md-6">
        <div className="item_info">
          <h2><Skeleton width="70%" height="40px" /></h2>
          <div className="item_info_counts">
            <Skeleton width="80px" height="30px" />
            <Skeleton width="80px" height="30px" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {loading ? (
              renderSkeleton()
            ) : item ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}
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
                    <h6>Owner</h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <Link to={`/author/${item.ownerId}`}>
                          <img className="lazy" src={item.ownerImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Creator</h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <Link to={`/author/${item.creatorId}`}>
                          <img className="lazy" src={item.creatorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.creatorId}`}>{item.creatorName}</Link>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={eth} alt="" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2>Could not load item details.</h2>
                <p>Please check your network connection and try again.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;