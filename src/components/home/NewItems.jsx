import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState} from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Skeleton from "../UI/Skeleton";
import ExpiryDate from '../ExpiryDate'

const NewItems = () => {
  const [details, setDetails] = useState([])
  const [loading, setLoading] = useState(true)

  async function getItems(){
    setLoading(true)
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)
    setLoading(false)
    setDetails(data)
  }
  useEffect(() => {
    getItems()
}, [])
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
          <Splide options={{
              perPage: 4,
              breakpoints: {
                1400: {
                  perPage: 3,
                },
                995: {
                  perPage: 2,
                },
                770: {
                  perPage: 1,
                }
              },
              type: "loop",
              perMove: 1,
              pagination: false,
              focus: 0,
            }}>
            {new Array(1).fill(0).map((_, index) => (
              (details.map(detail => (
                <SplideSlide>
                  {loading ? (
                    <Skeleton
                    width="18.5rem"
                    height="350px"
                    borderRadius="20px"
                    />
                  ) : (
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                      <div className="nft__item" style={{width: "18.5rem"}}>
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${detail.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <img className="lazy" src={detail.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                          {detail.expiryDate && (
                            <ExpiryDate expiryDate={detail.expiryDate}/>
                          )}
                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a
                                  href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a
                                  href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link to={`/item-details/${detail.nftId}`}>
                            <img
                              src={detail.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to="/item-details">
                            <h4>{detail.title}</h4>
                          </Link>
                          <div className="nft__item_price">{detail.price} ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{detail.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </SplideSlide>
              )))
            ))}
          </Splide>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
