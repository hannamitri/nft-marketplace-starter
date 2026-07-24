import React from 'react'
import { Link } from "react-router-dom";
import Countdown from '../home/Countdown'


const NFT = (props) => {
    
    return (
        !props.loading?
            <div data-aos="fade" data-aos-delay="100" data-aos-duration="1000" className="col">
                <div className="nft__item">
                <div className="author_list_pp">
                    <Link
                    to={`/author/${props.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                    >
                    <img className="lazy" src={props.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                    </Link>
                </div>
                <Countdown expiryDate={props.expiryDate} className="de_countdown" />
                <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                        <h4>Share</h4>
                        
                        </div>
                    </div>
                    </div>

                    <Link to={`/item-details/${props.nftId}`}>
                    <img
                        src={props.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                    />
                    </Link>
                </div>
                <div className="nft__item_info">
                    <Link to={`/item-details/${props.nftId}`}>
                    <h4>{props.title}</h4>
                    </Link>
                    <div className="nft__item_price">{props.price} ETH</div>
                    <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{props.likes}</span>
                    </div>
                </div>
                </div>
            </div>
            :
            <div className="col">
                <div className="nft__item">
                    <div className="author_list_pp">
                    <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                        className="newItems__skeleton--headshot"
                        >
                        
                        <i className="fa fa-check"></i>
                    </Link>
                    </div>
                    

                    <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                            <h4>Share</h4>
                            
                        </div>
                        </div>
                    </div>

                    <Link to={`/item-details/`} className="newItems__skeleton--image skeleton-box">
                        
                    </Link>
                    </div>
                    <div className="nft__item_info">
                    <Link to={`/item-details/`} className="newItems__skeleton--title skeleton-box">
                    </Link>
                    <div className="nft__item_price newItems__skeleton--counts skeleton-box"></div>
                    <div className="nft__item_like newItems__skeleton--counts skeleton-box">
                    </div>
                    </div>
                </div>
            </div>
    )
}

export default NFT