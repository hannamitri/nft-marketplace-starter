import React from 'react';
import { Link } from 'react-router-dom';
import "react-multi-carousel/lib/styles.css";

const SkeletonCard = ({ itemNo, className }) => {

  let skeletonArray = new Array(itemNo).fill(0)

    return (
       skeletonArray.map((_, index) => (
            <div className={className} key={index}>
              <div className="nft__item">
                <div className="header__img skeleton">
                  <Link to='/'>
                    <img className="" alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown skeleton">??h ??m ??s</div>

                <div className="nft__item_wrap skeleton">
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

                  <Link to="/">
                    <img
                      className="skeleton"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/">
                    <h4 className="skeleton skeleton__text--title"></h4>
                  </Link>
                  <div className="nft__item_price skeleton skeleton__text"></div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span className="skeleton skeleton__text"></span>
                  </div>
                </div>
              </div>
            </div>
          ))
    );
}

export default SkeletonCard;
