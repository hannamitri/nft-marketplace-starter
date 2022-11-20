import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import artistThumbNail from "../../images/author_thumbnail.jpg";
const HotCollections = () => {
  const settings = {
    accessibility: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <ArrowForwardIosIcon />,
    prevArrow: <ArrowBackIosNewIcon />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          nextArrow: <ArrowForwardIosIcon />,
          prevArrow: <ArrowBackIosNewIcon />,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [collection, setCollection] = React.useState();
  const loadingArr = [0, 1, 2, 3, 4];
  React.useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then((response) => {
        setCollection(response.data);
      });
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
          <div className="col-lg-12 ">
            <Slider {...settings}>
              {collection
                ? collection.map((item) => (
                    <div className="nft_coll" key={item.id}>
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={item.nftImage}
                            className={"lazy img-fluid"}
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={item.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{item.title}</h4>
                        </Link>
                        <span>ERC-{item.code}</span>
                      </div>
                    </div>
                  ))
                : loadingArr.map((_, index) => (
                    <div className="nft_coll" key={index}>
                      <div className="nft_wrap loading">
                        <Link to="/item-details">
                          <img src="" className={"lazy img-fluid"} alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <div className="overlay__loading--pp hot-collection__pp"></div>
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info loading__info">
                        <Link to="/explore">
                          <h4 className="loading title__text--loading">
                            "Filler Text"
                          </h4>
                        </Link>
                        <span className="loading">ERC-192</span>
                      </div>
                    </div>
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
