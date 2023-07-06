import React, {useState, useEffect} from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./NewItems.css";
import Skeliton from "./Skeliton.jsx";
import CountDownTimer from "./CountDownTimer.jsx";
import { Link } from "react-router-dom";

const NewItems = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchNewItems()
  {
    const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
    setItems(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchNewItems();
  }, [])

  const PrevButton = (props) => {
    const { className, onClick } = props;
    return (
      <button className={className} onClick={onClick}>
        Previous
      </button>
    );
  };
  
  const NextButton = (props) => {
    const { className, onClick } = props;
    return (
      <button className={className} onClick={onClick}>
        Next
      </button>
    );
  };


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevButton />,
    nextArrow: <NextButton />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    //continue by looping over each item and showing it to the user
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        
          {
            loading ? (
              <>
                {
                  new Array(4).fill(0).map((_, index) => {
                    return (
                      <Skeliton />
                    )
                  }) 
                }
                
              </>
            ) : (
              <>
                <Slider {...settings}>
                  {
                    items.map((item, index) => {
                      return (
                        <div className="card">
                          <div className="nft__item">
                          <div className="author_list_pp">
                              <Link
                              to={`/author/${item.authorId}`}
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Creator: Monica Lucas"
                              >
                              <img className="lazy" src={item.authorImage} alt="" />
                              <i className="fa fa-check"></i>
                              </Link>
                          </div>
                          <CountDownTimer startTime={item.expiryDate}/>

                          <div className="nft__item_wrap">
                                  <div className="nft__item_extra">
                                  <div className="nft__item_buttons">
                                      <button>Buy Now</button>
                                      <div className="nft__item_share">
                                      <h4>Share</h4>
                                      <a href="l" target="_blank" rel="noreferrer">
                                          <i className="fa fa-facebook fa-lg"></i>
                                      </a>
                                      <a href="l" target="_blank" rel="noreferrer">
                                          <i className="fa fa-twitter fa-lg"></i>
                                      </a>
                                      <a href="l">
                                          <i className="fa fa-envelope fa-lg"></i>
                                      </a>
                                      </div>
                                  </div>
                                  </div>

                                  <Link to={`/item-details/${item.nftId}`}>
                                  <img
                                      src={item.nftImage}
                                      className="lazy nft__item_preview"
                                      alt=""
                                  />
                                  </Link>
                              </div>
                              <div className="nft__item_info">
                                  <Link to={`/item-details/${item.nftId}`}>
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
                      )
                    })
                  }
                </Slider>
              </>
            )
          }

        </div>
      </div>
    </section>
  );
};

export default NewItems;
