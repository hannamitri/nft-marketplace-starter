import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";

const Skeleton = ({itemNo, className}) => {

  let skeltonArray = new Array(itemNo).fill(0)

  
  
  return (
    
      
        skeltonArray.map((_, index) => (
      <div  key={index}
      className={className}
      style={{ display: "block", backgroundSize: "cover" }}
      data-aos='fade-in' data-aos-duration="2000"
      >
        <div className="nft__item">
          <div className="author_list_pp--loading">
            <Link to="/">
              <div className="pp-coll_loading" alt=""></div>
            </Link>
            <i className="fa fa-check"></i>
          </div>
          <div className=" de_countdown--loading"></div>

          <div className="nft__item_wrap">
            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button>Buy Now</button>
                <div className="nft__item_share">
                  <h4>Share</h4>
                  <a
                    href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-facebook fa-lg"></i>
                  </a>
                  <a
                    href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-twitter fa-lg"></i>
                  </a>
                  <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                    <i className="fa fa-envelope fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>

            <Link to="/">
              <div className="lazy nft__item_preview--loading"></div>
            </Link>
          </div>
          <div className="nft__item_info">
            <div className="nft_coll_info-title-loading"></div>
            <div className="nft_coll_info-description-loading"></div>
          </div>
        </div>
      </div>
    ))
    
      
  );
};

export default Skeleton;