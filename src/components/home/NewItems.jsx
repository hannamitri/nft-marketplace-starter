import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useEffect } from "react";
import SimpleSlider from "../../pages/Slider";
import Skeleton from "../UI/Skeleton";
import CountDown from "../UI/CountDown";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate()

  async function fetchNewItems() {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    //console.log(response)
    setLoading(false);
    setNewItems(response.data);
  }

  useEffect(() => {
    fetchNewItems();
  }, [fetchNewItems]);

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
            <SimpleSlider>
              {new Array(4).fill(0).map((_, index) => (
                <div className="nft__item" key={index}>
                  <div className="author_list_pp">
                    <Skeleton width={50} height={50}borderRadius={50} />
                  </div>
                  <Skeleton width={50} height={50} />

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

                    <Skeleton width="100%" height="100%" />
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <Skeleton />
                    </Link>
                    <Skeleton />
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <Skeleton />
                    </div>
                  </div>
                </div>
              ))}
            </SimpleSlider>
          ) : (
            <SimpleSlider>
              {newItems.map((newItem, index) => (
                <div className="nft__item" key={index}>
                  <div className="author_list_pp">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <img className="lazy" src={newItem.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <CountDown expiryDate = {newItem.expiryDate}/>

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

                    <Link to="/item-details/:nftId">
                      <img
                        src={newItem.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{newItem.title}</h4>
                    </Link>
                    <div className="nft__item_price">{newItem.price}ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{newItem.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </SimpleSlider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
