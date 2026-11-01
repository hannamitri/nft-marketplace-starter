import React, { useState, useEffect } from "react";
import SliderTool from "../UI/SliderTool"
import ItemCards from "../UI/ItemCards"
import axios from 'axios'
import Skeleton from '../UI/Skeleton'

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

  let counter = 0

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
            new Array(7).fill(0).map(() => (
              <Skeleton key={counter++}  />
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
