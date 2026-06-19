import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const SkeletonItemDetails = () => (
  <div className="container">
    <div className="row">
      {/* Left column - NFT image */}
      <div className="col-md-6 text-center">
        <div
          className="skeleton-box"
          style={{ width: "100%", height: "400px", borderRadius: "8px" }}
        />
      </div>

      {/* Right column - NFT info */}
      <div className="col-md-6">
        <div className="item_info">
          <div
            className="skeleton-box"
            style={{ width: "60%", height: "36px" }}
          />

          <div className="item_info_counts" style={{ marginTop: "16px" }}>
            <div
              className="skeleton-box"
              style={{ width: "80px", height: "20px" }}
            />
            <div
              className="skeleton-box"
              style={{ width: "80px", height: "20px" }}
            />
          </div>

          <div
            className="skeleton-box"
            style={{ width: "100%", height: "60px", marginTop: "16px" }}
          />

          <div style={{ marginTop: "24px" }}>
            <div
              className="skeleton-box"
              style={{ width: "30%", height: "20px" }}
            />
            <div
              className="skeleton-box skeleton-avatar"
              style={{ marginTop: "12px" }}
            />
          </div>

          <div style={{ marginTop: "24px" }}>
            <div
              className="skeleton-box"
              style={{ width: "30%", height: "20px" }}
            />
            <div
              className="skeleton-box skeleton-avatar"
              style={{ marginTop: "12px" }}
            />
          </div>

          <div style={{ marginTop: "24px" }}>
            <div
              className="skeleton-box"
              style={{ width: "20%", height: "20px" }}
            />
            <div
              className="skeleton-box"
              style={{ width: "100px", height: "30px", marginTop: "12px" }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nft, setNft] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchNftDetails = async () => {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
      );
      setNft(data);
    };
    fetchNftDetails();
  }, [nftId]);

  if (!nft) return <SkeletonItemDetails />;

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
                  <h2>Rainbow Style #194</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nft.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      74
                    </div>
                  </div>
                  <p>
                    {nft.description}
                  </p>
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
                    <div></div>
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
