import React from "react";
import Slider from "react-slick";
import "../../css/styles/slick.css";
import "../../css/styles/slick-bg.css";
import Item from "../UI/Item";
import ItemSkeleton from "../UI/ItemSkeleton";

const NewItems = ({ newItems, newItemsLoading }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
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
          <Slider {...settings}>
            {newItemsLoading
              ? new Array(4)
                  .fill(0)
                  .map((index) => <ItemSkeleton key={index} />)
              : newItems.map((newItem) => (
                  <Item item={newItem} key={newItem.id} />
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
