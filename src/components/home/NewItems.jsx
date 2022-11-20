import React from "react";
import axios from "axios";
import Slider from "react-slick";
import NewItem from "./NewItem.jsx";
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
                    <NewItem
                      authorImage={item.authorImage}
                      expiryDate={item.expiryDate}
                      nftImage={item.nftImage}
                      title={item.title}
                      price={item.price}
                      likes={item.likes}
                      key={item.id}
                    />
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
