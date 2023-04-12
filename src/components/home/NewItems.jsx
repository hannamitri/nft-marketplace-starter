import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "../../css/NewItems.css"
import Countdown from "../Countdown";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const NewItems = () => {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  async function Itemsdata() {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
    setItems(data)
    setLoading(false)
  }

  useEffect(() => {
    Itemsdata()
  }, [])


  const options = {
    loop: false,
    items:4,
    margin: 10,
    nav: true, 
    dots: false,
    responsive: {
      0: {
        loop: (('.owl-carousel .items').length > 0 ),
        items:1
      },
      640: {
        loop: ( ('.owl-carousel .items').length > 1 ),
        items:2
      },
      1050:{
        loop: ( ('.owl-carousel .items').length > 2 ),
        items:3
      },
      1410:{
        loop: ( ('.owl-carousel .items').length > 3 ),
        items:4
      }
    },
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

{
          loading ? (
              new Array(1).fill(0).map((_, index) => (
                <div className="wrap" key={index}>
                    <KeyboardArrowLeftIcon className="arrow__left arrow" />
                    <div className="nft_coll nft_coll-skeleton">
                        <div className="nft_wrap nft_wrap-skeleton">  
                         <div className="grey_box"></div>
                        </div>
                        <div className="nft_coll_pp loading">
                            <div className="lazy pp-coll"  alt="" />
                          <i className="fa fa-check "></i>
                        </div>
                        <div className="nft_coll_info ">
                            <h4 className="titleLoading"></h4>
                          <span className="spanLoading">ERC-111</span>
                        </div>
                      </div>
                      <div className="nft_coll nft_coll-skeleton">
                        <div className="nft_wrap nft_wrap-skeleton">  
                         <div className="grey_box"></div>
                        </div>
                        <div className="nft_coll_pp loading">
                            <div className="lazy pp-coll"  alt="" />
                          <i className="fa fa-check "></i>
                        </div>
                        <div className="nft_coll_info ">
                            <h4 className="titleLoading"></h4>
                          <span className="spanLoading">ERC-111</span>
                        </div>
                      </div>
                      <div className="nft_coll nft_coll-skeleton">
                        <div className="nft_wrap nft_wrap-skeleton">  
                         <div className="grey_box"></div>
                        </div>
                        <div className="nft_coll_pp loading">
                            <div className="lazy pp-coll"  alt="" />
                          <i className="fa fa-check "></i>
                        </div>
                        <div className="nft_coll_info ">
                            <h4 className="titleLoading"></h4>
                          <span className="spanLoading">ERC-111</span>
                        </div>
                      </div>
                    <KeyboardArrowRightIcon className="arrow__right arrow"/>
                </div>
              ))
              )
          :
          <OwlCarousel {...options}>
          {
            items.map(item => (
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.nftId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={item.authorImage}/>
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                
                {item.expiryDate && (
                  <Countdown key={item.id} expiryDate = {item.expiryDate} />
                )}

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

                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
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
          ))
        }
        </OwlCarousel>
      }
        </div>
      </div>
    </section>
  );
};

export default NewItems;
