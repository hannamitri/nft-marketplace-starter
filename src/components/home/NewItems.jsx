import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemCard from "../UI/ItemCard";
import CardSkeleton from "../UI/CardSkeleton";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

function NewItemSkeleton() {
  let width = window.innerWidth;
  if (width >= 992) {
    return (
      <div style={{ display: "flex" }}>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  } else if (width >= 576) {
    return (
      <div style={{ display: "flex" }}>
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  } else {
    return <CardSkeleton />;
  }
}

const NewItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  });

  //Slider Settings
  var settings = {
    infinite: true,
    speed: 150,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
            <NewItemSkeleton />
          ) : (
            <Slider {...settings} className="slider-wrapper">
              {data.map((item) => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  authorImage={item.authorImage}
                  expiryDate={item.expiryDate}
                  nftImage={item.nftImage}
                  title={item.title}
                  price={item.price}
                  likes={item.likes}
                  onExplorePage={false}
                  authorId={item.authorId}
                  nftId={item.nftId}
                />
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
