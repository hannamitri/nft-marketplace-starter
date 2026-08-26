import { Link } from "react-router-dom";
import React from "react";

const SellerCards = ({ data, timeRemaining }) => {
  return (
    <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" 
    style={{ display: "block", backgroundSize: "cover" }} > 
    <div className="nft__item"> 
    <div>
        <div className="author_list_pp"> 
            <Link to={`/author/${data.authorId}`} data-bs-toggle="tooltip" data-bs-placement="top" > 
            <img className="lazy" src={data.authorImage} alt="" /> 
            <i className="fa fa-check"></i> 
            </Link> 
        </div> 
        {timeRemaining && (
          <div className="de_countdown">
            <span className="timer__hours">
              {timeRemaining.hours}
            </span>
            :
            <span className="timer__minutes">
              {timeRemaining.minutes}
            </span>
            :
            <span className="timer__seconds">
              {timeRemaining.seconds}
            </span>
          </div>
        )}

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
        </div> 
          <Link to="/item-details">
            <img
              src={data.nftImage}
              className="lazy nft__item_preview"
              alt=""
            />
          </Link>
        </div>

        <div className="nft__item_info">
          <Link to="/item-details">
            <h4>{data.title}</h4>
          </Link>

          <div className="nft__item_price">
            {data.price} ETH
          </div>

          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{data.likes}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SellerCards;