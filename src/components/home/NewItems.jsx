import React from "react";
import { Link } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const NewItems = () => {
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
  const [expirationTime, setExpirationTime] = React.useState();

  // const [hours, setHours] = React.useState();
  // const [minutes, setMinutes] = React.useState();
  // const [seconds, setSeconds] = React.useState();
  const getTime = (expirationDate) => {
    if (expirationDate) {
      const time = expirationDate - Date.now();
      // let seconds = Math.floor((time / 1000) % 60);
      // let minutes = Math.floor((time / 1000 / 60) % 60);
      // let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      return `${Math.floor((time / (1000 * 60 * 60)) % 24)}h ${Math.floor(
        (time / 1000 / 60) % 60
      )}m ${Math.floor((time / 1000) % 60)}s`;
    }
    // setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    // setMinutes(Math.floor((time / 1000 / 60) % 60));
    // setSeconds(Math.floor((time / 1000) % 60));
  };

  const [newItems, setNewItems] = React.useState();

  React.useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      )
      .then((response) => {
        setNewItems(response.data);
      });
  }, []);

  const [counter, setCounter] = React.useState(0);

  function printHelloOneSec() {
    // console.log("Hello");
  }

  React.useEffect(() => {
    const interval = setInterval(() => printHelloOneSec(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

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
            <Slider {...settings}>
              {newItems
                ? newItems.map((item) => (
                    <div className="nft__item" key={item.id}>
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div
                        className={`${item.expiryDate ? "de_countdown " : " "}`}
                      >{`${
                        item.expiryDate
                          ? getTime(item.expiryDate)
                          : ""
                      }`}</div>

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

                        <Link to="/item-details">
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  ))
                : ""}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
