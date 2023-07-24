import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Chevron from "./Chevron";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
import {settings} from "../sliderSettings";
import Countdown from "./Countdown";

const NewItems = () => {
    const [data, setData] = useState([])
    const sliderRef = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
            setData(response.data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (!data) return
    }, [data])

    const handleNext = () => {
        sliderRef.current.slickNext();
    }

    const handlePrev = () => {
        sliderRef.current.slickPrev();
    }
    return (
        <section id="section-items" className="no-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center">
                            <h2>New Items</h2>
                            <div className="small-border bg-color-2"></div>
                        </div>
                    </div>
                    <div className='relative'>
                        <Chevron onClick={handlePrev}/>
                        <Chevron right onClick={handleNext}/>
                        {data.length > 0 ? (
                            <Slider {...settings} ref={sliderRef}>
                                {data.map(item => (
                                    <div className="col-12" key={item.id}>
                                        <div className="nft__item">
                                            <div className="author_list_pp">
                                                <Link
                                                    to={`/author/${item.authorId}`}
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title="Creator: Monica Lucas"
                                                >
                                                    <img className="lazy" src={item.authorImage} alt=""/>
                                                    <i className="fa fa-check"></i>
                                                </Link>
                                            </div>
                                            {(item.expiryDate && item.expiryDate > Date.now()) ?
                                                <Countdown endTime={item.expiryDate}/> : null}
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
                                ))}
                            </Slider>
                        ) : (
                            <Slider {...settings} ref={sliderRef}>
                                {Array.from({length: 6}).map((_, idx) => (
                                    <div className="col-12" key={idx}>
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
                                    </div>
                                ))}
                            </Slider>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewItems;
