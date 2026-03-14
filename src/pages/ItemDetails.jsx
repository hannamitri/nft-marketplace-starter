import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);

        // First try to find the item in the newItems API
        const newItemsResponse = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const newItemsData = await newItemsResponse.json();

        // Try to find by nftId first (for direct links), then by id
        let foundItem = newItemsData.find(
          (item) => item.nftId === parseInt(id) || item.id === parseInt(id)
        );

        if (foundItem) {
          setItem(foundItem);
          setLoading(false);
          return;
        }

        // If not found in newItems, try hotCollections
        const hotCollectionsResponse = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const hotCollectionsData = await hotCollectionsResponse.json();

        foundItem = hotCollectionsData.find(
          (item) => item.nftId === parseInt(id) || item.id === parseInt(id)
        );

        if (foundItem) {
          setItem(foundItem);
          setLoading(false);
          return;
        }

        // If not found in hotCollections, try explore
        const exploreResponse = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        const exploreData = await exploreResponse.json();

        foundItem = exploreData.find(
          (item) => item.nftId === parseInt(id) || item.id === parseInt(id)
        );

        if (foundItem) {
          setItem(foundItem);
          setLoading(false);
          return;
        }

        // If not found in main APIs, search through known author IDs
        const authorIds = [
          83937449, 55757699, 31906377, 72378156, 18556210, 73855012, 49986179,
          90432259, 40460691, 87818782,
        ];

        for (const authorId of authorIds) {
          try {
            const authorResponse = await fetch(
              `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
            );

            if (authorResponse.ok) {
              const authorData = await authorResponse.json();

              if (authorData.nftCollection) {
                foundItem = authorData.nftCollection.find(
                  (item) =>
                    item.nftId === parseInt(id) || item.id === parseInt(id)
                );

                if (foundItem) {
                  // Add author information to the item
                  foundItem.authorId = authorData.authorId;
                  foundItem.authorImage = authorData.authorImage;
                  foundItem.authorName = authorData.authorName;
                  break;
                }
              }
            }
          } catch (authorError) {
            continue;
          }
        }

        setItem(foundItem);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItemDetails();
    }
  }, [id]);

  const formatTimeRemaining = (expiryDate) => {
    if (!expiryDate) return null;

    const now = new Date().getTime();
    const timeLeft = expiryDate - now;

    if (timeLeft <= 0) return "Expired";

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const generateDescription = (item) => {
    if (item.description) {
      return item.description;
    }

    // Generate dynamic description based on item properties
    const artTypes = [
      "digital artwork",
      "unique creation",
      "masterpiece",
      "collectible piece",
      "artistic expression",
    ];
    const qualities = [
      "stunning",
      "breathtaking",
      "extraordinary",
      "remarkable",
      "captivating",
    ];
    const purposes = [
      "any digital art collection",
      "collectors worldwide",
      "art enthusiasts",
      "NFT investors",
    ];

    const artType = artTypes[Math.floor(Math.random() * artTypes.length)];
    const quality = qualities[Math.floor(Math.random() * qualities.length)];
    const purpose = purposes[Math.floor(Math.random() * purposes.length)];

    return `This ${quality} NFT represents a unique ${artType} created by talented artists. Each piece in this collection showcases exceptional creativity and artistic vision, making it a valuable addition to ${purpose}. The intricate details and innovative design elements reflect hours of dedicated work and passion for digital art.`;
  };

  if (loading) {
    return (
      <div id="wrapper" data-aos="fade-in">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width="100%" height="400px" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="60%" height="40px" />
                    <div className="item_info_counts">
                      <Skeleton width="80px" height="20px" />
                      <Skeleton width="80px" height="20px" />
                    </div>
                    <Skeleton width="100%" height="60px" />
                    <Skeleton width="100%" height="100px" />
                    <Skeleton width="150px" height="40px" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div id="wrapper" data-aos="fade-in">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h2>Item not found</h2>
                  <p>The item you're looking for doesn't exist.</p>
                  <p style={{ color: "red", fontSize: "14px" }}>
                    Searched for ID: {id}
                  </p>
                  <Link to="/" className="btn-main">
                    Go Home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper" data-aos="fade-in">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {Math.floor(Math.random() * 200) + 50}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>

                  {item.expiryDate && (
                    <div className="de_countdown">
                      <div className="countdown-container">
                        <div className="countdown-label">Auction ends in:</div>
                        <div className="countdown-time">
                          {formatTimeRemaining(item.expiryDate)}
                        </div>
                      </div>
                    </div>
                  )}

                  <p>{generateDescription(item)}</p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt="Owner"
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.authorId}`}>
                            {item.authorName || "Anonymous Artist"}
                          </Link>
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
                          <Link to={`/author/${item.authorId}`}>
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt="Creator"
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.authorId}`}>
                            {item.authorName || "Anonymous Artist"}
                          </Link>
                        </div>
                      </div>
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
