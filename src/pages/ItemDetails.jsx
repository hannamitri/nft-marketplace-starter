import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EthImage from "../images/ethereum.svg";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchNFT = async () => {
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        const data = await res.json();
        setNft(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching NFT details:", err);
      }
    };

    fetchNFT();
  }, [nftId]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 text-center">
            <Skeleton height={400} width={400} />
          </div>
          <div className="col-md-6">
            <h2><Skeleton width={200} /></h2>

            <div className="item_info_counts mb-3">
              <Skeleton width={80} height={20} className="me-3" />
              <Skeleton width={80} height={20} />
            </div>

            <p><Skeleton count={4} /></p>

            <h6>Owner</h6>
            <div className="d-flex align-items-center mb-3">
              <Skeleton circle={true} height={50} width={50} className="me-3" />
              <Skeleton width={120} />
            </div>

            <h6>Creator</h6>
            <div className="d-flex align-items-center mb-3">
              <Skeleton circle={true} height={50} width={50} className="me-3" />
              <Skeleton width={120} />
            </div>

            <h6>Price</h6>
            <Skeleton width={100} height={30} />
          </div>
        </div>
      </div>
    );
  }

  if (!nft) return <p>No NFT found.</p>;

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
                  alt={nft.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{nft.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i> {nft.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i> {nft.likes}
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

                    <div className="spacer-40"></div>

                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="Ethereum" />
                      <span>{nft.price} ETH</span>
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
