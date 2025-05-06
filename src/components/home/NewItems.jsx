import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton.jsx";

const NewItems = () => {
  const { nftId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeftList, setTimeLeftList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);

  const convertMilliseconds = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsToShow(1);
      } else if (width < 1024) {
        setItemsToShow(2);
      } else if (width < 1200) {
        setItemsToShow(3);
      } else {
        setItemsToShow(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevSlide();
      } else if (e.key === "ArrowRight") {
        goToNextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, data.length]);

  const goToNextSlide = () => {
    if (data.length <= itemsToShow) return;
    setCurrentSlide((prevSlide) =>
      prevSlide + 1 >= data.length ? 0 : prevSlide + 1
    );
  };

  const goToPrevSlide = () => {
    if (data.length <= itemsToShow) return;
    setCurrentSlide((prevSlide) =>
      prevSlide - 1 < 0 ? data.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
        );
        const resultData = response.data;

        if (Array.isArray(resultData) && resultData.length > 0) {
          setData(resultData);
          const initialTimes = resultData.map((item) =>
            item.expiryDate ? item.expiryDate - Date.now() : null
          );
          setTimeLeftList(initialTimes);
        } else {
          console.error("Error: No valid data returned.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [nftId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeftList((prevTimeLeft) =>
        prevTimeLeft.map((timeLeft, index) => {
          return data[index]?.expiryDate ? Math.max(timeLeft - 1000, 0) : null;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [data]);

  const getVisibleItems = () => {
    if (data.length <= itemsToShow) {
      return data;
    }
    const items = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentSlide + i) % data.length;
      items.push({ item: data[index], index });
    }
    return items;
  };

  const carouselStyles = {
    container: {
      position: "relative",
      overflow: "hidden",
      width: "100%",
    },
    sliderContainer: {
      display: "flex",
      transition: "transform 0.5s ease",
    },
    slide: {
      flex: `0 0 calc(100% / ${itemsToShow})`,
      padding: "0 5px",
    },
    navigationButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 10,
    },
    prevButton: {
      left: "10px",
    },
    nextButton: {
      right: "10px",
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <div style={carouselStyles.container}>
              <div style={carouselStyles.sliderContainer}>
                {Array(itemsToShow)
                  .fill(0)
                  .map((_, index) => (
                    <div style={carouselStyles.slide} key={index}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Skeleton
                            width="50px"
                            height="55px"
                            borderRadius="50%"
                            style={{ marginTop: "10px", textAlign: "center" }}
                          />
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="style" style={{ marginTop: "40px" }}>
                          <Skeleton
                            width="100%"
                            height="260px"
                            borderRadius="10px"
                          />
                        </div>
                        <div
                          className="nft_coll_info"
                          style={{
                            marginTop: "40px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div className="name">
                            <Skeleton
                              width="40%"
                              height="24px"
                              borderRadius="2px"
                            />
                          </div>
                          <div className="price">
                            <Skeleton
                              width="25%"
                              height="15px"
                              borderRadius="2px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : data.length > 0 ? (
            <div style={carouselStyles.container}>
              <button
                style={{
                  ...carouselStyles.navigationButton,
                  ...carouselStyles.prevButton,
                }}
                onClick={goToPrevSlide}
              >
                <i className="fa fa-angle-left"></i>
              </button>
              <div style={carouselStyles.sliderContainer}>
                {getVisibleItems().map(({ item, index }) => {
                  const timeLeft = timeLeftList[index];
                  const totalSeconds = Math.floor(timeLeft / 1000);
                  const hours = Math.floor(totalSeconds / 3600);
                  const minutes = Math.floor((totalSeconds % 3600) / 60);
                  const seconds = totalSeconds % 60;
                  const displayTimeLeft =
                    hours === 0 && minutes === 0 && seconds === 0
                      ? "Expired"
                      : `${hours}h ${minutes}m ${seconds}s`;

                  return (
                    <div style={carouselStyles.slide} key={index}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={`Creator: ${item.authorName}`}
                          >
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {item.expiryDate && timeLeft != null && (
                          <div className="de_countdown">{displayTimeLeft}</div>
                        )}
                        <div className="nft__item_wrap">
                          <Link to={`/item-details/${item.nftId}`}>
                            {item.nftImage && (
                              <img
                                src={item.nftImage}
                                className="lazy nft__item_preview"
                                alt=""
                              />
                            )}
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <div className="nft__item_price">
                            {item.price} ETH
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                style={{
                  ...carouselStyles.navigationButton,
                  ...carouselStyles.nextButton,
                }}
                onClick={goToNextSlide}
              >
                <i className="fa fa-angle-right"></i>
              </button>
            </div>
          ) : (
            <div>No items found!</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
