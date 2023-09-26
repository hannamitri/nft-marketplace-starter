import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import CountdownTimer from "../CountdownTimer";

const NewItems = () => {
  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchNFTs() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNFTs(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchNFTs();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  function renderNFTs() {
    return loading ? (
      <Slider {...settings}>
        {new Array(6).fill(0).map((_, index) => (
          <div className="nft__item" key={index}>
            <div className="author_list_pp">
              <a
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Creator: Monica Lucas"
                href="/"
              >
                <div
                  className="skeleton-box"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                ></div>
                <i className="fa fa-check"></i>
              </a>
            </div>
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
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <a href="/">
                <div
                  className="skeleton-box"
                  style={{ width: "100%", height: "350px" }}
                ></div>
              </a>
            </div>
            <div className="nft__item_info">
              <a href="/">
                <div
                  className="skeleton-box"
                  style={{ width: "180px", height: "30px" }}
                ></div>
              </a>
              <div
                className="skeleton-box"
                style={{ width: "100px", height: "20px" }}
              ></div>
            </div>
            <div className="nft__item_like">
              <div
                className="skeleton-box"
                style={{ width: "30px", height: "15px" }}
              ></div>
            </div>
          </div>
        ))}
      </Slider>
    ) : (
      <Slider {...settings}>
        {NFTs.map((NFT, index) => (
          <div className="nft__item" key={index}>
            <div className="author_list_pp">
              <Link
                to={`/author/${NFT.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Creator: Monica Lucas"
              >
                <img className="lazy" src={NFT.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {NFT.expiryDate ? (
              <CountdownTimer expiryDate={NFT.expiryDate} />
            ) : null}

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

              <Link to={`/item-details/${NFT.nftId}`}>
                <img
                  src={NFT.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${NFT.nftId}`}>
                <h4>{NFT.title}</h4>
              </Link>
              <div className="nft__item_price">{NFT.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{NFT.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    );
  }

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
          {renderNFTs()}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
