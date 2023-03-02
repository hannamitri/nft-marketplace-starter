import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const AuthorItems = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");

  async function fetchAuthorItems() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthor(data.nftCollection);
    setImage(data);
    console.log(data.nftCollection);
    setLoading(false);
  }

  useEffect(() => {
    fetchAuthorItems();
    setLoading(true);
    window.scrollTo(0, 0);
    AOS.init();
  }, []);
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp skeleton__author">
                      <img className="lazy " alt="" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="de_countdown skeleton-countdown" />
                    <div className="nft__item_wrap skeleton__wrap">
                      <div className="nft__item_extra skeleton__img" />
                    </div>
                    <div className="nft__item_info">
                      <h4 className="skeleton__title"></h4>
                      <div className="nft__item_price skeleton__price"></div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : author.map((author) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={author.id}
                >
                  <div
                    className="nft__item"
                    data-aos="fade-in"
                    data-aos-easing="ease-in-out"
                  >
                    <div className="author_list_pp">
                      <Link to="">
                        <img className="lazy" src={image.authorImage} alt="" />
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
                      <Link to={`/item-details/${author.nftId}`}>
                        <img
                          src={author.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${author.nftId}`}>
                        <h4>{author.title}</h4>
                      </Link>
                      <div className="nft__item_price">2.52 ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>97</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
