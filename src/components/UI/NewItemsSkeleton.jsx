import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import NftCardSkeleton from "../UI/NftCardSkeleton";

const NewItemsSkeleton = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const slidesToShow = width < 768 ? 1 : width < 992 ? 2 : width < 1200 ? 3 : 4;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: true,
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
            <Slider {...settings}>
              {[...Array(4)].map((_, index) => (
                <NftCardSkeleton
                  key={index}
                  showAvatar
                  showCountdown
                  showLikes
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItemsSkeleton;
