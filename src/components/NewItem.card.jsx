import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

function NewItemcard({ item, index }) {
    console.log(item, "form new item card")
    const [timeLeft, setTimeLeft] = useState(item.expiryDate);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(timeLeft => timeLeft - 1000);
        }, 1000);

        return () => clearInterval(timer); // cleanup on unmount
    }, []);
    return (
        <div className="nft__item" key={index}>
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
            {
                item.expiryDate && <div className="de_countdown">{msToTime(timeLeft)}</div>
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
    )
}


export default NewItemcard;