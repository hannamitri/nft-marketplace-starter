import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import '../../css/styles/style.css';
import { useParams } from "react-router-dom";
import Countdown from "../UI/Countdown";

const NewItems = ({newItems, loading}) => {
  
  const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {breakpoint: 1024, settings: {slidesToShow: 3, slidesToScroll: 1, infinite: true}},
        {breakpoint: 992, settings: {slidesToShow: 2, slidesToScroll: 1, infinite: true}},
        {breakpoint: 576, settings: {slidesToShow: 1, slidesToScroll: 1, infinite: true}}
      ]
    }

  const skeletonItems = Array(4).fill(0);

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
          {loading ? (
            <Slider {...settings}>
              {skeletonItems.map((_, index) =>(
                <div className="px-1" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                        <div className="skeleton-box" style={{width:60,height:60,borderRadius:'50%',margin:'0 auto',marginTop:'-30px'}}></div>
                    </div>
                    <div className="skeleton-box" style={{width:'100%',height:200}}></div>
                    <div className="nft__item_info">
                      <div className="skeleton-box" style={{width:'70%',height:18,margin:'10px auto'}}></div>
                      <div className="skeleton-box" style={{width:'40%',height:16,margin:'6px auto'}}></div>
                    </div>
                  </div>
                </div>
              ))} 
              </Slider>
            ): (
            <Slider {...settings}>
              {newItems.map((item) => (
                <div className="px-1" key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <Countdown expiryDate={item.expiryDate}/>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
