import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotCollection.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Skeleton from "../UI/Skeleton";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button className="arrow__next" onClick={onClick}>
      <ChevronRightIcon />
    </button>
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button className="arrow__prev" onClick={onClick}>
      <ChevronLeftIcon />
    </button>
  );
}
const HotCollections = () => {
  const [isData, setIsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function fetchPosts() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setIsData(data);
    setLoading(false);
  }

  React.useEffect(() => {
    fetchPosts();
  }, []);

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
          {loading === true ? (
            <>
              <Slider {...settings}>
                {new Array(8).fill(0).map((_, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <Link to={``}>
                        <Skeleton width="100%" height="150px" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={``}>
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="">
                        <Skeleton width="100px" height="20px" />
                      </Link>
                      <br />
                      <Skeleton width="60px" height="20px" />
                    </div>
                  </div>
                ))}
              </Slider>
            </>
          ) : (
            <Slider {...settings}>
              {isData.map((data, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${data.nftId}`}>
                      <img
                        src={data.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${data.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={data.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{data.title}</h4>
                    </Link>
                    <span>ERC-{data.code}</span>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
