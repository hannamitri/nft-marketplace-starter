import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const HotCollections = () => {
  const [box, setBox] = useState([]);
  const [loading, setLoading] = useState();

  async function getCollection() {
    setLoading(true);
    const { data } = await axios.get(
      " https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections "
    );
    

    setTimeout(() => {
      setBox(data);
    setLoading(false);
    }, 3000);
  }

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 4 ,
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 500);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;

            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  useEffect(() => {


  getCollection();

    
  }, []);
  return (
    <>
      <section id="section-collections" className="no-bottom ">
        <div className="container">
          <div className="row ">
            <div className="col-lg-12">
              <div className="text-center ">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            

            {loading ? new Array(4).fill(0).map( (element, index) => (

              
             <div
             className="col-lg-3 col-md-6 col-sm-6 col-xs-12  "
             key={index}
             
           >
             <div className="nft_coll  ">
               <div className="nft_wrap grey " >
                 <Link to={`/item-details/`}>
                   <img
                     src={''}
                     className="lazy img-fluid "
                     alt=""
                   />
                 </Link>
               </div>
               <div className="nft_coll_pp grey">
                 <Link to={`/author/`}>
                   <img
                     className="lazy pp-coll grey"
                     src={''}
                     alt=""
                   />
                 </Link>
                 <i className="fa fa-check"></i>
               </div>
               <div className="nft_coll_info grey">
                 <Link to="/explore">
                   <h4></h4>
                 </Link>
                 <span></span>
               </div>
             </div>
           </div>
            ))  : (
              <div className="keen-slider" ref={sliderRef}>
                {box.map((collection, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
                    key={index}
                  >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HotCollections;
