import React, { useState, useEffect } from "react";
import NewItem from "./NewItem";


const NewItems = () => {
  const [itemList, setItemList] = useState([]);





    useEffect(() => {
      async function fetchNewItems() {
      const response = await fetch(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      const data = await response.json();
      setItemList(data);
    }
    fetchNewItems();
  }, []);


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

          {itemList.map((item) => (
  <NewItem key={item.id} item={item} />
))}
          
          </div>
      </div>
    </section>
  );
};

export default NewItems;     
   
