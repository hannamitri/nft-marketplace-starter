import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/HotCollections.css";

const HotCollections = ({ getHotCollections }) => {
    //slider settings
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],

        // nextArrow: ">",
        // prevArrow: "<",
    };
    return (
        <section id="section-collections" className="no-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center">
                            <h2>Hot Collections</h2>
                            <div className="small-border bg-color-2"></div>
                        </div>
                    </div>
                    {/* // This is the map function that is looping through the data from the API call */}
                    {/* slider */}
                    <Slider {...settings}>
                        {getHotCollections.map((nft, index) => (
                            <div
                                style={{ width: "100%" }}
                                className="nft_card"
                                key={index}
                            >
                                <div className="nft_coll">
                                    <div className="nft_wrap">
                                        <Link to="/item-details">
                                            <img
                                                src={nft.nftImage}
                                                className="lazy img-fluid"
                                                alt=""
                                            />
                                        </Link>
                                    </div>
                                    <div className="nft_coll_pp">
                                        <Link to="/author">
                                            <img
                                                className="lazy pp-coll"
                                                src={nft.authorImage}
                                                alt=""
                                            />
                                        </Link>
                                        <i className="fa fa-check"></i>
                                    </div>
                                    <div className="nft_coll_info">
                                        <Link to="/explore">
                                            <h4>{nft.title}</h4>
                                        </Link>
                                        <span>ERC-{nft.code}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default HotCollections;
