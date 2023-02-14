import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/HotCollections.css";

const HotCollections = ({ getHotCollections }) => {
    const [loading, setLoading] = useState(true);

    // skeleton loading
    setTimeout(() => {
        setLoading(false);
    }, 4000);

    //slider settings
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 760,
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
                    {/* skeleton loading */}

                    <Slider {...settings}>
                        {getHotCollections.map((nft, index) => (
                            <>
                                {/* skeleton loading */}

                                <div
                                    style={{ width: "100%" }}
                                    className="nft_card"
                                    key={index}
                                >
                                    {loading ? (
                                        <div className="nft_coll">
                                            <div className="nft_wrap">
                                                <div
                                                    className="skeleton__box"
                                                    style={{
                                                        width: "100%",
                                                        height: "200px",
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="nft_coll_pp">
                                                <div
                                                    className="skeleton__box"
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        borderRadius: "50%",
                                                    }}
                                                ></div>
                                                <i className="fa fa-check"></i>
                                            </div>
                                            <div className="nft_coll_info">
                                                <div
                                                    className="skeleton__box"
                                                    style={{
                                                        width: "100px",
                                                        height: "20px",
                                                    }}
                                                ></div>
                                                <br />
                                                <div
                                                    className="skeleton__box"
                                                    style={{
                                                        width: "60px",
                                                        height: "20px",
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ) : (
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
                                    )}
                                </div>
                            </>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default HotCollections;
