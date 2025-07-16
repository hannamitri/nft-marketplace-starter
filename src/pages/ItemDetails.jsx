import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import useCountdown from "../components/hooks/useCountdown";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchNftDetails() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      );
      setNft(data);
    } catch (error) {
      console.error("Error fetching NFT details:", error);
      setNft(null); // Ensure nft is null on error
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNftDetails();
  }, [nftId]);

  const Countdown = ({ expiryDate }) => {
    const { days, hours, minutes, seconds } = useCountdown(expiryDate);
    return <div className="de_countdown">{`${days}d ${hours}h ${minutes}m ${seconds}s`}</div>;
  };
  
  const renderSkeleton = () => (
    <div className="row">
      <div className="col-md-6 text-center">
        <Skeleton width="100%" height="500px" />
      </div>
      <div className="col-md-6">
        <div className="item_info">
          <h2><Skeleton width="70%" height="40px" /></h2>
          <div className="item_info_counts">
            <Skeleton width="80px" height="30px" />
            <Skeleton width="80px" height="30px" />
          </div>
          <p><Skeleton width="100%" height="100px" /></p>
          <div className="item_author">
            <div className="author_list_pp">
              <Skeleton width="50px" height="50px" borderRadius="50%" />
            </div>
            <div className="author_list_info">
              <Skeleton width="120px" height="20px" />
            </div>
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
            {/* THIS IS THE KEY FIX: We check for loading OR if nft is null */}
            {loading || !nft ? renderSkeleton() : (
              <div className="row">
                <div className="col-md-6 text-center">
                  {nft.expiryDate && <Countdown expiryDate={nft.expiryDate} />}
                  <img
                    src={nft.nftImage}
                    className="img-fluid img-rounded mb-sm-30"
                    alt={nft.title}
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{nft.title} #{nft.tag}</h2>
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
                            <Link to={`/author/${nft.ownerId}`}>
                              <img className="lazy" src={nft.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nft.ownerId}`}>{nft.ownerName}</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nft.creatorId}`}>
                              <img className="lazy" src={nft.creatorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nft.creatorId}`}>{nft.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-30"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src="/images/misc/ethereum.svg" alt="" />
                        <span>{nft.price} ETH</span>
                      </div>
                      <div className="d-flex flex-row mt-5">
                        <button className="btn-main lead m-auto">
                          Place a bid
                        </button>
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