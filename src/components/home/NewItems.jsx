import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import LoadingPlaceHolder from './LoadingPlaceHolder'
import Card from "../UI/Card";

const NewItems = () => {

  const [loaded, setLoaded] = useState();
  const [items, setItems] = useState([]);
  async function getData() {
    setLoaded(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
    setLoaded(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const state = {
    responsive: {
      0: {
        items: 1,
      },
      577: {
        items: 2,
      },
      770: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };


  return (
    <section id="section-items" className="no-bottom" data-aos="fade-in" data-aos-duration="1000">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          
               
          {loaded ? (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={12}
              responsive={state.responsive}
            >
              {items.map((item, index) => (
                <Card item={item} key={item.id} />
                ))}
                </OwlCarousel>
         ) : (
           <OwlCarousel
             items={4}
             loop={true}
             nav={true}
             margin={12}
             responsive={state.responsive}
           >
             {new Array(7).fill(0).map((_, index) => (
               <div className="item" key={index}>
                 <div className="nft__item">
                   <div className="author_list_pp">
                     <Link
                       to="/author"
                       data-bs-toggle="tooltip"
                       data-bs-placement="top"
                       title="Creator: Monica Lucas"
                     >
                       <LoadingPlaceHolder extraStyles={{height:'50px', width:'50px', borderRadius:'50%'}}/>
                       <i className="fa fa-check"></i>
                     </Link>
                   </div>

                 
                   <div className="nft__item_wrap">
                   <LoadingPlaceHolder extraStyles={{height:'100%'}}/>
                   </div>

                   <div className="nft__item_info">
                   <LoadingPlaceHolder extraStyles={{height:'100%'}}/>
                     <Link to="/item-details">
                     <LoadingPlaceHolder extraStyles={{height:'15px', width:'130px', marginBottom: '16px', marginTop: '20px'}}/>
                     </Link>
                     <div className="nft__item_price">
                     <LoadingPlaceHolder extraStyles={{height:'15px', width:'100px', marginBottom: '16px', marginTop: '20px'}}/>
                     </div>
                     <div className="nft__item_like">
                     <LoadingPlaceHolder extraStyles={{height:'15px', width:'40px', marginBottom: '16px', marginTop: '20px'}}/>
                     </div>
                   </div>
                  </div>
                </div>

          ))}
          </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};
export default NewItems;
