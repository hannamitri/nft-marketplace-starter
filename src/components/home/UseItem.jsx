import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CountDown from "./CountDown";

const UseItem = ({ card }) => {
  console.log(card.expiryDate)
  return (
    <div className="" key={card.id}>
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to={`/author/${card.authorId}`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Creator: Monica Lucas"
          >
            <img className="lazy" src={card.authorImage} alt="authorImage" />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        {card.expiryDate != undefined && (
          <div className="de_countdown">
            <CountDown fullTime={card.expiryDate / 1000} />
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

          <Link to={`/item-details/${card.nftId}`}>
            <img
              src={card.nftImage}
              className="lazy nft__item_preview"
              alt=""
            />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to="/item-details">
            <h4>{card.title}</h4>
          </Link>
          <div className="nft__item_price">{card.price} ETH</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{card.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseItem;