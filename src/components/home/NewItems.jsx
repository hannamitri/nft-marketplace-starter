import { Link } from "react-router-dom";
//import AuthorImage from "../../images/author_thumbnail.jpg";//we'll use api data
//import nftImage from "../../images/nftImage.jpg";// We'll use api data
import 'keen-slider/keen-slider.min.css'
import {useKeenSlider} from 'keen-slider/react';
import React, { useState, useEffect } from 'react';
import NewItemCard, { NewItemCardSkeleton } from '../home/NewItemCard';
import axios from 'axios';
import '../../css/styles/HotCollection.css';

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [slideTimer, setSlideTimer] = useState(null);

   useEffect(() => {
    const fetchItems = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await axios.get ('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems');
        setItems(response.data);

       } catch (error){
        console.error("Error fetching new items:", error);
        setItems(new Array(4).fill({title: "Error Loading"}));
       }finally{
        setIsLoading(false);
       }
      };
         
      fetchItems();
  }, []);

  
  const [sliderRef, instanceRef] = useKeenSlider({
      loop: true,
      drag:true, // enables dragging/swiping
      breakpoints: {
        '(min-width: 400px)' :{
          slides:{perView: 2, spacing:10},
        },
        '(min-width: 1000px)':{
          slides: {perView:4, spacing:20},
        },
      },
      slides:{
        perView:1,// default for mobile
        spacing:5,
      },
  
    });
  
  useEffect(() => {
  
      if (instanceRef.current && items && typeof instanceRef.current.update === 'function') {
        instanceRef.current.update();
      }
    }, [items, instanceRef]);
  
    const startSliding =(direction) => {
      if (instanceRef.current) {
          if (direction === 'next') {
              instanceRef.current.next();
          } else {
              instanceRef.current.prev();
          }
      }
  
      if (slideTimer){
        clearInterval(slideTimer);
        clearTimeout(slideTimer);
      }
     
      const initialTimer = setTimeout(() => {
          const continuousTimer = setInterval(() => {
              if (instanceRef.current) {
                  if (direction === 'next') {
                      instanceRef.current.next();
                  } else {
                      instanceRef.current.prev();
                  }
              }
          }, 100); 
          setSlideTimer(continuousTimer);
      }, 200); 
  
       setSlideTimer(initialTimer); 
    };
      
  
    const stopSliding = () => {
      if (slideTimer) {
        clearInterval(slideTimer);
        clearTimeout(slideTimer);
        setSlideTimer(null); 
      }
    };

    
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
        </div>
            
            
      <div className="navigation-wrapper">
  {isLoading ? (
    <div className="row">
      {new Array(4).fill(0).map((_, index) => (
        <NewItemCardSkeleton
        key={index}
        className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
        />
      ))}

    </div>
  ) : (
    <div ref={sliderRef} className="keen-slider">
      {items.map((itemData, index) => (
        <NewItemCard
          key={itemData.id || index}
          itemData={itemData}
          className="keen-slider__slide"
        />
      ))}
    </div>
  )}

  {/* Always render arrows once slider exists */}
  {!isLoading && (
    <>
      <button
        className="arrow arrow--left"
        onMouseDown={() => instanceRef.current && startSliding('prev')}
        onMouseUp={stopSliding}
        onMouseLeave={stopSliding}
        type="button"
        aria-label="Previous Slide"
      >
        &#9664;
      </button>

      <button
        className="arrow arrow--right"
        onMouseDown={() => instanceRef.current && startSliding('next')}
        onMouseUp={stopSliding}
        onMouseLeave={stopSliding}
        type="button"
        aria-label="Next Slide"
      >
        &#9654;
      </button>
    </>
          )}
        </div>
        </div>
       
      </section>
      
);
}

export default NewItems;