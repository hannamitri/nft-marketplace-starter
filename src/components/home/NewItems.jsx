import React from "react";
import { Link } from "react-router-dom";
import NewItemsSkeleton from "./NewItemsSkeleton";
import { useKeenSlider } from "keen-slider/react";
import 'keen-slider/keen-slider.min.css'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewItems = ({ newItems, loading }) => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 10,
    },

    breakpoints: {
      "(max-width: 978px)": {
        slides: {
          perView: 3,
        }
      },

      "(max-width: 768px)": {
        slides: {
          perView: 2,
        }
      },

      "(max-width: 575px)": {
        slides: {
          perView: 1,
        }
      }
    }
  })


  const [now, setNow] = React.useState(Date.now())

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])


  const getTimeRemaining = (expiryDate) => {
    const difference = expiryDate - now;

    if (difference <= 0) {
      return "";
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor(
      (difference % (1000 * 60)) / 1000
    );

    return `${hours}h ${minutes}m ${seconds}s`;
  }



  return (
    <section id="section-items" className="no-bottom">
      <div className="container slider-wrapper">
          <button className="arrow arrow-left" onClick={() => instanceRef.current?.prev()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div ref={sliderRef} className="keen-slider">
          {loading ? Array.from({ length: 4 }).map((_, index) => {
            return <NewItemsSkeleton key={index} />
          }): newItems.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide" key={item.authorId}>
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
                {item.expiryDate != null && (
                  <div className="de_countdown">{getTimeRemaining(item.expiryDate)}</div>
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="#!" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="#!" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="#!">
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
          ))}
          </div>
        </div>
          <button className="arrow arrow-right" onClick={() => instanceRef.current?.next()}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
      </div>
    </section>
  );
};

export default NewItems;
