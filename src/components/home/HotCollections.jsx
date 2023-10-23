import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [data, setData] = useState(null)

  async function getData() {
    await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((response) => {
        setData(response.data)
      })
  }
  useEffect(() => {
    getData()
  }, [data === null])

  const options = {
    items: 4,
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    rewind: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <OwlCarousel {...options}>
            {data ? data.map((arr) => {
              return (
                <div data-aos="fade-right" key={arr.id} className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${arr.nftId}`}>

                      {<img src={arr.nftImage} className="lazy img-fluid" alt="" />}
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${arr.authorId}`}>
                      <img className="lazy pp-coll" src={arr.authorImage} alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{arr.title}</h4>
                    </Link>
                    <span>ERC-{arr.code}</span>
                  </div>
                </div>
              )
            })
              :
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/">

                    <Skeleton width={"100%"} height={200} />
                  </Link>
                </div>
                <div className="nft_coll_pp">

                  <Link to="/">

                    <Skeleton width={50} height={50} borderRadius={"50%"} />
                  </Link>

                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/">
                    <Skeleton width={100} height={20} />

                  </Link>
                  <br />
                  <Skeleton width={60} height={20} />
                </div>
              </div>}
          </OwlCarousel>


        </div>
      </div>
    </section>
  );
};

export default HotCollections;
