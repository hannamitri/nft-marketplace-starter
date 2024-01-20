/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'

function Card({ item, authorImage, responsiveStyling }) {
    return (
        <div className={`${responsiveStyling}`}>
            <div className="nft__item" >
                <div className="author_list_pp">
                    <Link
                        to={item.authorId ? `/author/${item.authorId}` : ''}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.authorName}`}
                    >
                        <img className="lazy" src={authorImage || item.authorImage} alt={item.autherName} />
                        <i className="fa fa-check"></i>
                    </Link>
                </div>
                {
                    item.expiryDate && <div className="de_countdown">{123}</div>
                }
                <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="/" target="_blank" rel="noreferrer">
                                    <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="/" target="_blank" rel="noreferrer">
                                    <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="/">
                                    <i className="fa fa-envelope fa-lg"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Link to={`/item-details/${item.nftId}`}>
                            <img
                                src={item.nftImage}
                                className="lazy nft__item_preview"
                                alt=""
                            />
                        </Link>
                    </div>
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

    )
}

export default Card