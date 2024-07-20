import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const options = {
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    850: {
      items: 3,
    },
    1050: {
      items: 4,
    },
  },
};
const NewItems = () => {
  const [loading, setLoading] = useState(false);
  const [nftApi, setNftApi] = useState([]);
  const [time, setTime] = useState("");

  async function fetchApi() {
    setLoading(true);
    const data = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    const response = data.data;
    setNftApi(response);
    setLoading(false);
  }
  useEffect(() => {
    fetchApi();
    setInterval(() => {
      let d = new Date()
      setTime(d)
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
          {loading?<div></div>:<OwlCarousel
            className="owl-theme owl-dot-off owl-loaded "
            {...options}
            key={loading ? "loading" : "loaded"}
          >
            {nftApi.map((array, index) => (
              <div className="nft_coll owl_wrapper" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${array.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <img className="lazy" src={array.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="de_countdown">{`${time.getHours()}h ${time.getMinutes()}m ${time.getSeconds()}s`}</div>

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

                    <Link to={`/item-details/${array.nftId}`}>
                      <img
                        src={array.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${array.nftId}`}>
                      <h4>Pinky Ocean</h4>
                    </Link>
                    <div className="nft__item_price">{array.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{array.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
