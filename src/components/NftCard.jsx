import React from "react";
import { Link } from "react-router-dom";
import TimeLeft from "./UI/TimeLeft";

const NftCard = ({ item }) => {


    return (
        <div data-aos="fade-up" data-aos-duration="800" className="p-2" key={item.id}>
            <div className="nft__item">
                <div className="author_list_pp">
                    <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                    >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                    </Link>
                </div>
                {item.expiryDate && <TimeLeft expiryDate={item.expiryDate} />}
                <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                            <button>Buy Now</button>

                        </div>
                    </div>
                    <Link to={`/item-details/${item.nftId}`}>
                        <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                        />
                    </Link>
                </div>
                <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
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

export default NftCard