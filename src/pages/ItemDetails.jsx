import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import { Link, useLocation, useParams } from "react-router-dom";

import EthImage from "../images/ethereum.svg";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

// NFT DETAILS API
const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";

const ItemDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  // SUPPORT NFT ID FROM URL
  const queryParams = new URLSearchParams(location.search);
  const nftId = id || queryParams.get("nftId");

  // STATES
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH NFT DETAILS
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!nftId) {
      setNft(null);
      setError("NFT ID not found.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchNFT = async () => {
      setLoading(true);
      setError(null);
      setNft(null);

      try {
        const response = await axios.get(API_URL, {
          params: {
            nftId: nftId,
          },
          signal: controller.signal,
        });

        console.log("NFT Details API Response:", response.data);

        const data = response.data;

        const nftData =
          data?.data && !Array.isArray(data.data)
            ? data.data
            : data;

        if (
          !nftData ||
          typeof nftData !== "object" ||
          Array.isArray(nftData)
        ) {
          throw new Error("Invalid NFT data");
        }

        if (!controller.signal.aborted) {
          setNft(nftData);
        }
      } catch (err) {
        if (
          err.code === "ERR_CANCELED" ||
          controller.signal.aborted
        ) {
          return;
        }

        console.error("Error fetching NFT details:", err);
        setError("Unable to load NFT details.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchNFT();

    return () => controller.abort();
  }, [nftId]);

  // REFRESH AOS AFTER DYNAMIC CONTENT LOADS
  useEffect(() => {
    if (loading || error || !nft) {
      return;
    }

    const animationFrame = requestAnimationFrame(() => {
      AOS.refreshHard();
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [loading, error, nft]);

  // NFT INFORMATION
  const title = nft?.title || "Unknown NFT";

  const image = nft?.nftImage || nft?.image || nftImage;

  const description =
    nft?.description || "No description available.";

  const tag = Array.isArray(nft?.tags)
    ? nft.tags.join(", ")
    : nft?.tag || nft?.tags || "";

  const price = nft?.price ?? 0;
  const likes = nft?.likes ?? 0;
  const views = nft?.views ?? 0;

  // OWNER INFORMATION
  const ownerName = nft?.ownerName || "Unknown Owner";
  const ownerImage = nft?.ownerImage || AuthorImage;
  const ownerId = nft?.ownerId;

  // CREATOR INFORMATION
  const creatorName =
    nft?.creatorName || "Unknown Creator";

  const creatorImage =
    nft?.creatorImage || AuthorImage;

  const creatorId = nft?.creatorId;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          aria-label="NFT Details"
          className="mt90 sm-mt-0"
        >
          <div className="container">

            {/* LOADING SKELETON */}
            {loading && (
              <div className="row">

                {/* NFT IMAGE SKELETON */}
                <div className="col-md-6">
                  <div
                    style={{
                      height: "450px",
                      backgroundColor: "#e5e5e5",
                      borderRadius: "12px",
                    }}
                  ></div>
                </div>

                {/* NFT DETAILS SKELETON */}
                <div className="col-md-6">

                  <div
                    style={{
                      height: "40px",
                      width: "70%",
                      backgroundColor: "#e5e5e5",
                      borderRadius: "6px",
                      marginBottom: "25px",
                    }}
                  ></div>

                  <div
                    style={{
                      height: "20px",
                      width: "40%",
                      backgroundColor: "#e5e5e5",
                      borderRadius: "6px",
                      marginBottom: "30px",
                    }}
                  ></div>

                  <div
                    style={{
                      height: "100px",
                      backgroundColor: "#e5e5e5",
                      borderRadius: "6px",
                      marginBottom: "30px",
                    }}
                  ></div>

                  <div
                    style={{
                      height: "60px",
                      width: "60%",
                      backgroundColor: "#e5e5e5",
                      borderRadius: "6px",
                      marginBottom: "30px",
                    }}
                  ></div>

                  <div
                    style={{
                      height: "60px",
                      width: "60%",
                      backgroundColor: "#e5e5e5",
                      borderRadius: "6px",
                    }}
                  ></div>

                </div>
              </div>
            )}

            {/* ERROR MESSAGE */}
            {!loading && error && (
              <div className="text-center" role="alert">
                <h3>{error}</h3>
              </div>
            )}

            {/* DYNAMIC NFT DETAILS */}
            {!loading && !error && nft && (
              <div className="row" key={nftId}>

                {/* NFT IMAGE - FADE IN */}
                <div
                  className="col-md-6 text-center"
                  data-aos="fade-in"
                  data-aos-duration="800"
                >
                  <img
                    src={image}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={title}
                    onLoad={() => AOS.refresh()}
                  />
                </div>

                {/* NFT INFORMATION - FADE UP */}
                <div
                  className="col-md-6"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="100"
                >
                  <div className="item_info">

                    {/* NFT TITLE */}
                    <h2>{title}</h2>

                    {/* NFT TAG */}
                    {tag && <p>{tag}</p>}

                    {/* VIEWS AND LIKES */}
                    <div className="item_info_counts">

                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {views}
                      </div>

                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {likes}
                      </div>

                    </div>

                    {/* NFT DESCRIPTION */}
                    <p>{description}</p>

                    {/* OWNER INFORMATION */}
                    <div className="d-flex flex-row">
                      <div className="mr40">

                        <h6>Owner</h6>

                        <div className="item_author">

                          {/* OWNER IMAGE */}
                          <div className="author_list_pp">
                            <Link
                              to={
                                ownerId
                                  ? `/author/${ownerId}`
                                  : "#"
                              }
                            >
                              <img
                                className="lazy"
                                src={ownerImage}
                                alt={ownerName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>

                          {/* OWNER NAME */}
                          <div className="author_list_info">
                            <Link
                              to={
                                ownerId
                                  ? `/author/${ownerId}`
                                  : "#"
                              }
                            >
                              {ownerName}
                            </Link>
                          </div>

                        </div>
                      </div>
                    </div>

                    {/* CREATOR INFORMATION */}
                    <div className="de_tab tab_simple">

                      <div className="de_tab_content">

                        <h6>Creator</h6>

                        <div className="item_author">

                          {/* CREATOR IMAGE */}
                          <div className="author_list_pp">
                            <Link
                              to={
                                creatorId
                                  ? `/author/${creatorId}`
                                  : "#"
                              }
                            >
                              <img
                                className="lazy"
                                src={creatorImage}
                                alt={creatorName}
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>

                          {/* CREATOR NAME */}
                          <div className="author_list_info">
                            <Link
                              to={
                                creatorId
                                  ? `/author/${creatorId}`
                                  : "#"
                              }
                            >
                              {creatorName}
                            </Link>
                          </div>

                        </div>
                      </div>

                      <div className="spacer-40"></div>

                      {/* NFT PRICE */}
                      <h6>Price</h6>

                      <div className="nft-item-price">
                        <img src={EthImage} alt="Ethereum" />
                        <span>{price}</span>
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