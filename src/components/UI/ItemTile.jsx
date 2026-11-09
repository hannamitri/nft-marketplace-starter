import React from "react";
import CountdownTimer from "./countdown";
import { Link } from "react-router-dom";

const ItemTile = ({
  nftId,
  authorId,
  nftImage,
  expiryDate,
  authorImage,
  id,
  price,
  title,
  likes,
}) => {
  return (
    <div key={id} style={{ padding: "0 10px"}}>
      <div className='nft__item'>
        <div className='author_list_pp'>
          <Link
            to={`/author/${authorId}`}
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            title='Creator'
          >
            <img className='lazy' src={authorImage} alt='' />
            <i className='fa fa-check'></i>
          </Link>
        </div>

        <CountdownTimer expiryDate={expiryDate} />
        <div className='nft__item_wrap'>
          <div className='nft__item_extra'>
            <div className='nft__item_buttons'>
              <button>Buy Now</button>
              <div className='nft__item_share'>
                <h4>Share</h4>
                <a href='' target='_blank' rel='noreferrer'>
                  <i className='fa fa-facebook fa-lg'></i>
                </a>
                <a href='' target='_blank' rel='noreferrer'>
                  <i className='fa fa-twitter fa-lg'></i>
                </a>
                <a href=''>
                  <i className='fa fa-envelope fa-lg'></i>
                </a>
              </div>
            </div>
          </div>

          <Link to={`/item-details/${nftId}`}>
            <img
              src={nftImage}
              className='lazy nft__item_preview'
              alt=''
            />
          </Link>
        </div>
        <div className='nft__item_info'>
          <Link to={`/item-details/${nftId}`}>
            <h4>{title}</h4>
          </Link>
          <div className='nft__item_price'>{price} ETH</div>
          <div className='nft__item_like'>
            <i className='fa fa-heart'></i>
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemTile;
