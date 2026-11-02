import React, { useState, useEffect } from "react";
import SliderTool from "../UI/SliderTool"
import ItemCards from "../UI/ItemCards"
import axios from 'axios'
import Skeleton from "../UI/Skeleton"
import { Link } from "react-router-dom"

const NewItems = () => {
  
  const [itemsData, setItemsData] = useState([])
  const [loading, setLoading] = useState(true)

  async function getNewItems() {
    const { data } = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
    setItemsData(data)
    setLoading(false)    
  }

  useEffect(() => {
    getNewItems()
  }, [])
  
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="card">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <SliderTool>
            {!loading ?
            new Array(7).fill(0).map((_, index) => (
              <div className="card" key={index}>
              <div className="nft__item item__card">
                <div className="author_list_pp">
                  <Link
                    to="/author/:id"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="/" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="/" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="/">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to="/item-details">
                    <Skeleton width="100%" height="200px" borderRadius="5px" />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4><Skeleton width='100px' height='20px' borderRadius='5px' /></h4>
                  </Link>
                  <div className="nft__item_price"><Skeleton width='100px' height='20px' borderRadius='5px' /> ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span><Skeleton widith='100%' height='100%' borderRadius="5px" /></span>
                  </div>
                </div>
              </div>
            </div>
              
            ))
            :
            itemsData.map((data) => (
              <ItemCards key={data.id} item={data} loading={loading}/>
            ))
            }            
          </SliderTool>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
