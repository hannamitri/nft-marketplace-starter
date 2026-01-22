import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";

const shimmerStyle = document.createElement('style');
shimmerStyle.textContent = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;
if (!document.querySelector('[data-shimmer-style-newitems]')) {
  shimmerStyle.setAttribute('data-shimmer-style-newitems', 'true');
  document.head.appendChild(shimmerStyle);
}

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = expiryDate - Date.now();
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft("Expired");
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const data = await response.json();
        console.log("New items data:", data);
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new items:", error);
        setLoading(false);
      }
    };

    fetchNewItems();
  }, []);

  console.log("Items:", items, "Loading:", loading);

  const NextArrow = ({ onClick }) => {
    return (
      <div
        className="slick-arrow slick-next"
        onClick={onClick}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          right: "-25px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          backgroundColor: "#fff",
          border: "solid 2px #dddddd",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          zIndex: 2,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
        }}
      >
        <i className="fa fa-chevron-right" style={{ fontSize: "16px", color: "#333", position: "relative", left: "-7px", top: "0px" }}></i>
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div
        className="slick-arrow slick-prev"
        onClick={onClick}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          left: "-25px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          backgroundColor: "#fff",
          border: "solid 2px #dddddd",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          zIndex: 2,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
        }}
      >
        <i className="fa fa-chevron-left" style={{ fontSize: "16px", color: "#333", position: "relative", left: "-10px", top: "0px" }}></i>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: false,
    verticalSwiping: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          vertical: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          vertical: false,
        }
      }
    ]
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
          <div className="col-lg-12">
            {loading ? (
              <div style={{ padding: "0 40px" }}>
                <Slider {...settings}>
                  {new Array(8).fill(0).map((_, index) => (
                    <div key={index}>
                      <div className="nft__item" style={{ margin: "0 10px" }}>
                        <div className="author_list_pp">
                          <div 
                            style={{ 
                              width: "50px", 
                              height: "50px", 
                              backgroundColor: "#e0e0e0",
                              backgroundImage: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
                              backgroundSize: "200% 100%",
                              animation: "shimmer 1.5s infinite",
                              borderRadius: "50%",
                              border: "3px solid #fff"
                            }}
                          ></div>
                        </div>
                        <div className="de_countdown" style={{ 
                          backgroundColor: "#e0e0e0",
                          backgroundImage: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
                          backgroundSize: "200% 100%",
                          animation: "shimmer 1.5s infinite",
                          color: "transparent",
                          borderRadius: "4px"
                        }}>
                          Loading...
                        </div>

                        <div className="nft__item_wrap">
                          <div 
                            style={{ 
                              height: "300px", 
                              backgroundColor: "#e0e0e0",
                              backgroundImage: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
                              backgroundSize: "200% 100%",
                              animation: "shimmer 1.5s infinite",
                              borderRadius: "8px"
                            }}
                          ></div>
                        </div>
                        <div className="nft__item_info">
                          <div 
                            style={{ 
                              height: "24px", 
                              width: "70%", 
                              backgroundColor: "#e0e0e0",
                              backgroundImage: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
                              backgroundSize: "200% 100%",
                              animation: "shimmer 1.5s infinite",
                              borderRadius: "4px",
                              marginBottom: "10px"
                            }}
                          ></div>
                          <div 
                            style={{ 
                              height: "20px", 
                              width: "40%", 
                              backgroundColor: "#e0e0e0",
                              backgroundImage: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
                              backgroundSize: "200% 100%",
                              animation: "shimmer 1.5s infinite",
                              borderRadius: "4px"
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            ) : items.length > 0 ? (
              <div style={{ padding: "0 40px" }}>
                <Slider {...settings}>
                  {items.map((item) => (
                    <div key={item.id}>
                      <div 
                        className="nft__item" 
                        style={{ margin: "0 10px", cursor: "pointer" }}
                        onClick={(e) => {

                          if (!e.target.closest('.author_list_pp') && 
                              !e.target.closest('.nft__item_buttons') &&
                              !e.target.closest('.nft__item_share')) {
                            navigate(`/item-details/${item.nftId}`);
                          }
                        }}
                      >
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={`Creator: ${item.authorName}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <img className="lazy" src={item.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <CountdownTimer expiryDate={item.expiryDate} />

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <div className="nft__item_price">{item.price} ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <p>No items available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
