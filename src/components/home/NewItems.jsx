import React, { useState, useEffect } from "react";
import SliderTool from "../UI/SliderTool"
import ItemCards from "../UI/ItemCards"
import axios from 'axios'

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
            {loading ?
            new Array(7).fill(0).map((_, index) => (
              <div key={index} className="card__holder">
                <div className='nft_coll skel__card' id={index}>
                  <div className="skel__img"></div>
                  <div className="skel__author"></div>
                  <div className="nft_coll_info skel__title"></div>
                  <div className="skel__code"></div>
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
