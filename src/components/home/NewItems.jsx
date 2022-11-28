import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Timer from "../UI/Timer"
import Slider from "react-slick";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const NewItems = () => {

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  async function getItems() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
    console.log(data);
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    getItems();
  }, [])

  function NextArrow({ onClick }) {
    return (
      <RiArrowDropRightLine
        className="slick-arrow"
        style={{
          position: "absolute",
          color: "#999",
          cursor: "pointer",
          top: "50%",
          right: "0px",
          transform: "translate(0, -50%)",
          height: "50px",
          width: "50px",
          fontSize: "6px",
          display: "block",
          border: "1px solid #ccc",
          backgroundColor: "white",
          borderRadius: "100%",
          zIndex: "10"
        }}
        onClick={onClick}
      />
    );
  }
  function PrevArrow({ onClick }) {
    return (
      <RiArrowDropLeftLine
        className="slick-arrow"
        style={{
          position: "absolute",
          color: "#999",
          cursor: "pointer",
          top: "50%",
          left: "0px",
          transform: "translate(0, -50%)",
          height: "50px",
          width: "50px",
          fontSize: "12px",
          display: "block",
          border: "1px solid #ccc",
          backgroundColor: "white",
          borderRadius: "100%",
          zIndex: "10"
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    arrows: true,
    draggable: true,
    infinite: true,
    speed: 500,
    initialSlide: 1,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: false,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
        }
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  //This is for the skelly state. This creates 3 faux entries 
    //and gives them unique keys.
  const loadingArr = new Array(3).fill(null);

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
          <Slider className="newItems" {...settings}>
            {loading ? loadingArr.map((_,index) => (
              <div className="col-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <img className="lazy" src={AuthorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
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
                        src={nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>Pinky Ocean</h4>
                    </Link>
                    <div className="nft__item_price">3.08 ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>69</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
              : items.map((item) => (
                <div className="col-12" key={item.id}>
                  <div className="nft__item">
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
                    {item.expiryDate 
                    && (
                        <div className="de_countdown">
                          <Timer endTimeInput={item.expiryDate} />
                        </div>
                      )
                    }
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
                </div>
              ))
            }
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
