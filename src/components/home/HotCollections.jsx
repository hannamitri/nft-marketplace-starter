import { Link } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg"; // Commented out as we'll use fetched data
// import nftImage from "../../images/nftImage.jpg"; // Commented out as we'll use fetched data
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'keen-slider/keen-slider.min.css'
import {useKeenSlider} from 'keen-slider/react';
import '../../css/styles/HotCollection.css';
//Keen slider used because it offers cleanest code and is easy to use. Added arrow controls too.



  function HotCollections() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slideTimer, setSlideTimer]= useState(null);

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

    if (instanceRef.current && data && typeof instanceRef.current.update === 'function') {
      instanceRef.current.update();
    }
  }, [data, instanceRef]);

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

 useEffect(() => {
    const fetchData = async () => {
        
        const fetchPromise = async () => {
            const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
            console.log('API Response:', response.data);
            return response.data;
        };
        
        const delayPromise = new Promise(resolve => setTimeout(resolve, 1500)); 

        try {
           
            const [dataResult] = await Promise.all([fetchPromise(), delayPromise]);             
            setData(dataResult);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); 
        }
    };

    fetchData(); 
  }, []);


  const SkeletonSlide = () => (
  <div className="keen-slider__slide">
    <div className="nft_coll">
      <div className="nft_wrap">
        <div className="skeleton skeleton-img"></div>
      </div>
      <div className="nft_coll_pp">
        <div className="skeleton skeleton-avatar"></div>
      </div>
      <div className="nft_coll_info">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text" style={{ width: "60%" }}></div>
      </div>
    </div>
  </div>
);


const [windowWidth, setWindowWidth] = useState(window.innerWidth);

useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

const getSkeletonCount = () => {
  if (windowWidth >= 1000) return 4;  // desktop
  if (windowWidth >= 400) return 2;   // tablet
  return 1;                           // mobile
};

    
  if (loading) {
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div ref={sliderRef} className="keen-slider">
          {Array.from({ length: getSkeletonCount() }).map((_, i) => (
            <SkeletonSlide key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}


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
        </div>

        
        <div className="navigation-wrapper">
          
         
          <div
            ref={sliderRef} 
            className="keen-slider" 
          >
            
            {data && data.map((collection, index) => (
              <div 
                className="keen-slider__slide" 
                key={index}
              >
                
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${collection.nftId}`}> 
                      <img src={collection.nftImage} className="lazy img-fluid" alt={collection.title} />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${collection.authorId}`}> 
                      <img 
                        className="lazy pp-coll" 
                        src={collection.authorImage} 
                        alt="Author" 
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to={`/explore/${collection.id}`}> {/*Check this link*/}
                      <h4>{collection.title}</h4>
                    </Link>
                    <span>{`ERC-${collection.code}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          
          
          {instanceRef.current && (
            <>
              <button 
                className="arrow arrow--left"
                 onMouseDown={() => startSliding('prev')}
                 onMouseUp={stopSliding}
                 onMouseLeave={stopSliding}
                 type="button"
                 aria-label="Previous Slide"
                
              >
                &#9664; 
              </button>

              <button
                className="arrow arrow--right"
                 onMouseDown={() => startSliding('next')}
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
  )
};

export default HotCollections;
