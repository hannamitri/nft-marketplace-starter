import React from 'react';
import {Link} from "react-router-dom";
import Countdown from "../home/Countdown";
import Skeleton from "./Skeleton";

function Card({skeleton = false, authorId, authorImage, expiryDate, nftId, nftImage, title, price, likes}) {

    if (skeleton) return (
        <div className="nft__item">
            <div className="author_list_pp">
                <div>
                    <Skeleton height={50} width={50} borderRadius={25}/>
                    <i className="fa fa-check"></i>
                </div>
            </div>
            <div style={{
                position: 'absolute',
                top: 20,
                right: 20,
            }}>
                <Skeleton height={32} width={100} borderRadius={16}/>
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

                <div>
                    <Skeleton width={276} height={214} borderRadius={8}/>
                </div>
            </div>
            <div className="nft__item_info">
                <div>
                    <h4>
                        <Skeleton height={20} width={70}/>
                    </h4>
                </div>
                <div className="nft__item_price">
                    <Skeleton height={28} width={50}/>
                </div>
                <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>
                         <Skeleton width={12} height={15}/>
                    </span>
                </div>
            </div>
        </div>
    )
    else return (
        <div className="nft__item">
            <div className="author_list_pp">
                <Link
                    to={`/author/${authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                >
                    <img className="lazy" src={authorImage} alt=""/>
                    <i className="fa fa-check"></i>
                </Link>
            </div>
            {(expiryDate && expiryDate > Date.now()) ?
                <Countdown endTime={expiryDate}/> : null}
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

                <Link to={`/item-details/${nftId}`}>
                    <img
                        src={nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                    />
                </Link>
            </div>
            <div className="nft__item_info">
                <Link to={`/item-details/${nftId}`}>
                    <h4>{title}</h4>
                </Link>
                <div className="nft__item_price">{price} ETH</div>
                <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{likes}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;