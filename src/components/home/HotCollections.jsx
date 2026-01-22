import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

const animationStyle = document.createElement('style');
animationStyle.textContent = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
if (!document.querySelector('[data-shimmer-style]')) {
  animationStyle.setAttribute('data-shimmer-style', 'true');
  document.head.appendChild(animationStyle);
}

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        console.log("Hot Collections data:", data);
        setCollections(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

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
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            {loading ? (
              <Slider {...settings}>
                {new Array(6).fill(0).map((_, index) => (
                  <div key={index}>
                    <div className="nft_coll" style={{ margin: "0 10px" }}>
                      <div className="nft_wrap">
                        <div 
                          style={{ 
                            height: "200px", 
                            backgroundColor: "#e0e0e0",
                            backgroundImage: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 1.5s infinite",
                            borderRadius: "10px 10px 0 0"
                          }}
                        ></div>
                      </div>
                      <div className="nft_coll_pp" style={{ position: "relative", marginTop: "-55px" }}>
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
                      <div className="nft_coll_info">
                        <div 
                          style={{ 
                            height: "20px", 
                            width: "70%", 
                            backgroundColor: "#e0e0e0",
                            backgroundImage: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 1.5s infinite",
                            borderRadius: "4px",
                            marginBottom: "8px"
                          }}
                        ></div>
                        <div 
                          style={{ 
                            height: "16px", 
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
            ) : (
              <div style={{ animation: "fadeIn 0.6s ease-in" }}>
                <Slider {...settings}>
                  {collections.map((collection) => (
                    <div key={collection.id}>
                      <div className="nft_coll" style={{ margin: "0 10px" }}>
                        <div className="nft_wrap">
                          <Link to={`/item-details/${collection.nftId}`}>
                            <img src={collection.nftImage} className="lazy img-fluid" alt={collection.title} />
                          </Link>
                        </div>
                        <div className="nft_coll_pp" style={{ position: "relative", marginTop: "-55px" }}>
                          <Link to={`/author/${collection.authorId}`}>
                            <img className="lazy pp-coll" src={collection.authorImage} alt={collection.authorName} />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to={`/item-details/${collection.nftId}`}>
                            <h4>{collection.title}</h4>
                          </Link>
                          <span>{collection.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
