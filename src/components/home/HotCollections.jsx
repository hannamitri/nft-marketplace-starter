import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import ItemCardSkeleton from "../UI/ItemCardSkeleton";


const HotCollections = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function fetchCollections() {
      const data = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setCollections(data.data);
      setIsLoaded(true);
    }
    fetchCollections();
  }, []); // fetching data from cloud for carousel

  const arrowStyle = {
    // arrow styling (had to manual style as react-slick doesn't allow complete customization for the arrows)
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    height: "50px",
    backgroundColor: "#fff",
    border: "2px solid #ccc",
    borderRadius: "50%",
    cursor: "pointer",
    zIndex: 1,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  };

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        style={{ ...arrowStyle, left: "-24px" }} // Adjust for responsiveness
        onClick={onClick}
      >
        <FaArrowLeft style={{ color: "black", fontSize: "20px" }} />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        style={{ ...arrowStyle, right: "-24px" }} // Adjust for responsiveness
        onClick={onClick}
      >
        <FaArrowRight style={{ color: "black", fontSize: "20px" }} />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default for large screens
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablets and small desktops
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Mobile landscape
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Mobile portrait
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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
          <div
            className="slider-container"
            style={{ position: "relative", padding: "0 40px" }}
          >
            {isLoaded ? (
              <Slider {...settings}>
                {collections.map((user) => (
                  <div key={user.id}>
                    <div className="nft_coll mx-1">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={user.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${user.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={user.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{user.title}</h4>
                          </Link>
                          <span>ERC-{user.code}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider {...settings}>
                {new Array(4).fill(0).map((_, index) => (
                  <div key={index}>
                    <ItemCardSkeleton />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
