import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import nftImage from "../images/nftImage.jpg";
import AuthorImage from "../images/author_thumbnail.jpg";

import Aos from "aos";
import "aos/dist/aos.css";

const ItemDetails = () => {
  const { itemId } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize AOS
  useEffect(() => {
    Aos.init({
      duration: 700,
      easing: "ease-out",
      once: true,
      offset: 20,
      mirror: false,
      disableMutationObserver: true,
    });
  }, []);

  // Scroll to top when the selected NFT changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [itemId]);

  // Fetch NFT details
  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setLoading(true);
    setItem(null);

    fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${encodeURIComponent(itemId)}`,
      {
        signal: controller.signal,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        if (active) {
          setItem(data);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching item details:", error);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [itemId]);

  // Reinitialize AOS positions when skeletons are replaced
  useEffect(() => {
    let frame1;
    let frame2;

    frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        Aos.refreshHard();
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [loading, itemId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          aria-label="section"
          className="mt90 sm-mt-0"
        >
          <div className="container">
            <div className="row">

              {/* ===================================== */}
              {/* SKELETON LOADING STATE                */}
              {/* ===================================== */}

              {loading ? (
                <React.Fragment key="loading">

                  {/* NFT Image Skeleton */}

                  <div className="col-md-6 text-center">
                    <div
                      className="img-fluid img-rounded mb-sm-30 nft-image skeleton skeleton-image"
                      data-aos="zoom-in"
                    />
                  </div>

                  {/* Information Skeleton */}

                  <div className="col-md-6">
                    <div className="item_info">

                      {/* Title */}

                      <h2
                        className="skeleton skeleton-text"
                        data-aos="fade-down-left"
                      >
                        Item Title
                      </h2>

                      {/* Views and Likes */}

                      <div
                        className="item_info_counts"
                        data-aos="fade-up"
                      >
                        <div className="item_info_views skeleton skeleton-button">
                          <i className="fa fa-eye"></i>
                          <span className="skeleton skeleton-text" />
                        </div>

                        <div className="item_info_like skeleton skeleton-button">
                          <i className="fa fa-heart"></i>
                          <span className="skeleton skeleton-text" />
                        </div>
                      </div>

                      {/* Description */}

                      <p
                        className="skeleton skeleton-text"
                        data-aos="fade-left"
                      >
                        Accusantium doloremque laudantium,
                        totam rem aperiam, eaque ipsa quae
                        ab illo inventore veritatis et quasi
                        architecto beatae vitae dicta sunt
                        explicabo.
                      </p>

                      {/* Owner Skeleton */}

                      <div className="d-flex flex-row">
                        <div className="mr40">

                          <h6
                            className="skeleton skeleton-text"
                            data-aos="fade-up"
                          >
                            Owner
                          </h6>

                          <div className="item_author">

                            <div
                              className="author_list_pp"
                              data-aos="zoom-in"
                            >
                              <div className="skeleton-avatar-wrapper">
                                <div className="skeleton skeleton-avatar" />
                                <i className="fa fa-check"></i>
                              </div>
                            </div>

                            <div
                              className="author_list_info"
                              data-aos="fade-left"
                            >
                              <div className="skeleton skeleton-text" />
                            </div>

                          </div>
                        </div>
                      </div>

                      {/* Creator Skeleton */}

                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">

                          <h6
                            className="skeleton skeleton-text"
                            data-aos="fade-up"
                          >
                            Creator
                          </h6>

                          <div className="item_author">

                            <div
                              className="author_list_pp"
                              data-aos="zoom-in"
                            >
                              <div className="skeleton-avatar-wrapper">
                                <div className="skeleton skeleton-avatar" />
                                <i className="fa fa-check"></i>
                              </div>
                            </div>

                            <div
                              className="author_list_info"
                              data-aos="fade-left"
                            >
                              <div className="skeleton skeleton-text" />
                            </div>

                          </div>

                        </div>

                        <div className="spacer-40"></div>

                        {/* Price Skeleton */}

                        <h6
                          className="skeleton skeleton-text"
                          data-aos="fade-up"
                        >
                          Price
                        </h6>

                        <div
                          className="nft-item-price"
                          data-aos="fade-right"
                        >
                          <div className="skeleton skeleton-img" />

                          <span className="skeleton skeleton-text">
                            1.85 ETH
                          </span>
                        </div>

                      </div>
                    </div>
                  </div>
                </React.Fragment>

              ) : item ? (

                /* ===================================== */
                /* LOADED NFT INFORMATION                */
                /* ===================================== */

                <React.Fragment key={`loaded-${itemId}`}>

                  {/* NFT Image */}

                  <div className="col-md-6 text-center">
                    <img
                      src={item.nftImage ?? nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt={item.title ?? "NFT"}
                      data-aos="zoom-in"
                    />
                  </div>

                  {/* NFT Information */}

                  <div className="col-md-6">
                    <div className="item_info">

                      {/* Title */}

                      <h2 data-aos="fade-down-left">
                        {item.title}
                        {item.tag != null
                          ? ` #${item.tag}`
                          : ""}
                      </h2>

                      {/* Views and Likes */}

                      <div
                        className="item_info_counts"
                        data-aos="fade-up"
                      >
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {item.views ?? 0}
                        </div>

                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {item.likes ?? 0}
                        </div>
                      </div>

                      {/* Description */}

                      <p data-aos="fade-left">
                        {item.description}
                      </p>

                      {/* ===================================== */}
                      {/* OWNER INFORMATION                    */}
                      {/* ===================================== */}

                      <div className="d-flex flex-row">
                        <div className="mr40">

                          <h6 data-aos="fade-up">
                            Owner
                          </h6>

                          <div className="item_author">

                            {/* Owner Avatar */}

                            <div
                              className="author_list_pp"
                              data-aos="zoom-in"
                            >
                              <Link to={`/author/${item.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={item.ownerImage ?? AuthorImage}
                                  alt={item.ownerName ?? "Owner"}
                                />

                                <i className="fa fa-check"></i>
                              </Link>
                            </div>

                            {/* Owner Name */}

                            <div
                              className="author_list_info"
                              data-aos="fade-left"
                            >
                              <Link to={`/author/${item.ownerId}`}>
                                {item.ownerName}
                              </Link>
                            </div>

                          </div>
                        </div>
                      </div>

                      {/* ===================================== */}
                      {/* CREATOR INFORMATION                  */}
                      {/* ===================================== */}

                      <div className="de_tab tab_simple">

                        <div className="de_tab_content">

                          {/* Creator Heading */}

                          <h6 data-aos="fade-up">
                            Creator
                          </h6>

                          <div className="item_author">

                            {/* Creator Avatar */}

                            <div
                              className="author_list_pp"
                              data-aos="zoom-in"
                            >
                              <Link to={`/author/${item.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={item.creatorImage ?? AuthorImage}
                                  alt={item.creatorName ?? "Creator"}
                                />

                                <i className="fa fa-check"></i>
                              </Link>
                            </div>

                            {/* Creator Name */}

                            <div
                              className="author_list_info"
                              data-aos="fade-left"
                            >
                              <Link to={`/author/${item.creatorId}`}>
                                {item.creatorName}
                              </Link>
                            </div>

                          </div>

                        </div>

                        <div className="spacer-40"></div>

                        {/* ===================================== */}
                        {/* PRICE INFORMATION                    */}
                        {/* ===================================== */}

                        <h6 data-aos="fade-up">
                          Price
                        </h6>

                        <div
                          className="nft-item-price"
                          data-aos="fade-right"
                        >
                          <img
                            src={EthImage}
                            alt="Ethereum"
                          />

                          <span>
                            {item.price} ETH
                          </span>
                        </div>

                      </div>
                    </div>
                  </div>
                </React.Fragment>

              ) : (

                /* ===================================== */
                /* ERROR STATE                          */
                /* ===================================== */

                <div className="col-md-12 text-center">
                  <h3>Unable to load NFT details</h3>

                  <p>
                    The requested NFT could not be found or
                    its information is temporarily unavailable.
                  </p>

                  <Link
                    to="/explore"
                    className="btn-main"
                  >
                    Back to Explore
                  </Link>
                </div>

              )}

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;