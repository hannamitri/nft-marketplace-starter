import React from 'react';
import Skeleton from './Skeleton';

const LoadingCard = ({ index }) => {
  return (
        <div
        className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
        style={{ display: "block", backgroundSize: "cover" }}
      >
        <div className="nft__item">
          <div className="author_list_pp">
            <Skeleton 
              height={50}
              width={50}
              borderRadius={100}
            />
          </div>
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
            <Skeleton 
              height={300}
              width={300}
              borderRadius={8}
            />
          </div>
          <div className="nft__item_info">
            <Skeleton 
              height={16}
              width={100}
              borderRadius={4}
            />
            <div className="nft__item_price">
            <Skeleton 
              height={16}
              width={50}
              borderRadius={4}
            />                
            </div>
            <div className="nft__item_like">
            <Skeleton 
              height={16}
              width={50}
              borderRadius={4}
            />
            </div>
          </div>
        </div>
      </div>
    );
}

export default LoadingCard;
