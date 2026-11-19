import React from "react";
import { Link } from "react-router-dom";  
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Countdown from "../UI/Countdown";

const NewItems = () => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`);
        console.log(response.data);
        console.log("First NFT image:", response.data[0]?.nftImage);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching new items:", error);
      }
    };

    fetchItems();
  }, []);
    const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
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
          {items.length > 0 && (
            <Slider
            {...settings}
            className="nft-slider"
            >
            {items.map((item) => (
              <div className="px-2" key={item.id}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={`Creator: ${item.authorId}`}
                    >
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <Countdown expiryDate={item.expiryDate} /> 

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <button type="button" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </button>
                          <button type="button" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </button>
                          <button type="button" target="_blank" rel="noreferrer">
                            <i className="fa fa-envelope fa-lg"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <Link to="/item-details">
                   <img
                        src={item.nftImage}
                        className="nft__item_preview"
                        alt={item.title}
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
              </div>
            ))}
          </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
