import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import axios from "axios";
import Timer from "../UI/Timer";
import ReactOwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [items, setitems]=useState(null)

  
  async function getitems(){
   await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems ")
    .then((response)=>{
        
        setitems(response.data)
    })
  }
  if(!items){
    getitems()
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
          {items ?

            <ReactOwlCarousel className='owl-theme' loop nav dots={false} items={4} margin={10} responsiveClass={true}
            responsive= {
              {
                '320':{
                  items: 1
                },
                '768':{
                  items:2
                },
                '1024':{
                  items:3
                },
             '1440':{
               items:4
              },
            }
          }
          >

          { items?.map((arr)=>{
            return (
              <div key={arr.id} className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${arr.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                    >
                    <img className="lazy" src={arr.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                    { arr.expiryDate && 
                    <Timer  expiryDate={arr.expiryDate}/>
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

                  <Link to={`/item-details/${arr.nftId}`}>
                    <img
                      src={arr.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                      />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${arr.nftId}`}>
                    <h4>{arr.title}</h4>
                  </Link>
                  <div className="nft__item_price">{arr.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{arr.likes}</span>
                  </div>
                </div>
              </div>
              )
            })
          }
          </ReactOwlCarousel>
          :
          <ReactOwlCarousel className='owl-theme' loop nav dots={false} items={4} margin={10} responsiveClass={true}
            responsive= {
              {
                '320':{
                  items: 1
                },
                '768':{
                  items:2
                },
                '1024':{
                  items:3
                },
             '1440':{
               items:4
              },
            }
          }
          >
                <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                    >
                    <Skeleton width={50} height={50} borderRadius={"50%"}/>
                    <i class="fa fa-check"></i>
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

                  <Link to="/">
                  <Skeleton width={"100%"} height={350}/>
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/">
                    <Skeleton width={180} height={30}></Skeleton>
                  </Link>
                  <div className="nft__item_price"><Skeleton width={100} height={20}></Skeleton></div>
                  <div className="nft__item_like">
                    <Skeleton width={30} height={15}></Skeleton>
                  </div>
                </div>
              </div>
          </ReactOwlCarousel>
    }
      </div>
      </div>
      </section>
      );
};

export default NewItems;
