import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewItemsSlider from "./newItemsSlider";
import Loadingstate from "../Loadingstate";

const NewItems = () => {

const [loading, setLoading] = useState(true)


useEffect(() => {
   setLoading(false)
   
  }, []);
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row"  data-aos="fade-up"
         data-aos-easing="ease-in-out"
              data-aos-duration="800">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
            {loading ? 
           <Loadingstate array={4}/>
            
           : (
            <NewItemsSlider />
          )}

          
        </div>
      </div>
    </section>
  );
};

export default NewItems;
