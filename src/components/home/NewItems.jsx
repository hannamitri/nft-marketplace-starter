import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../../css/styles/skeleton.css";
import TimeLeft from "../UI/TimeLeft";

const NewItems = () => {
    //set the variables
    const { newItems, setSelectedItem, setSelectedAuthor, loading } =
        useContext(DataContext);

    const [formattedTime, setFormattedTime] = useState("");

    // Custom Previous Arrow
    function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#333",
                    borderRadius: "50%",
                    padding: "15px",
                    zIndex: 2,
                    left: "1px", // move arrow to border
                }}
                onClick={onClick}
            >
                <FaArrowLeft color="#fff" />
            </div>
        );
    }

    // Custom Next Arrow Component
    function NextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#333",
                    borderRadius: "50%",
                    padding: "15px",
                    zIndex: 2,
                    right: "1px", // move arrow to border
                }}
                onClick={onClick}
            >
                <FaArrowRight color="#fff" />
            </div>
        );
    }

    // Slider settings
    const settings = {
        dots: true, // Show navigation dots
        infinite: true, // Infinite loop
        speed: 500, // Transition speed in ms
        slidesToShow: 4, // Number of slides visible
        slidesToScroll: 1, // Number of slides to scroll at once
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            // Responsive breakpoints
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 840,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 540,
                settings: { slidesToShow: 1 },
            },
        ],
    };

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
                    {loading ? (
                        <Slider {...settings}>
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="skeleton skeleton-img nft_wrap">
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <Slider {...settings}>
                            {newItems.map((item) => (
                                <div key={item.id}>
                                    <div className="nft__item">
                                        <div className="author_list_pp">
                                            <Link
                                                to={`/author/${item.authorId}`}
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                title={item.authorName}
                                            >
                                                <img
                                                    className="lazy"
                                                    src={item.authorImage}
                                                    alt=""
                                                    onClick={() => {
                                                        setSelectedAuthor(
                                                            item.authorId,
                                                        );
                                                    }}
                                                />
                                                <i className="fa fa-check"></i>
                                            </Link>
                                        </div>
                                        {item.expiryDate && (
                                            <div className="de_countdown">
                                                <TimeLeft
                                                    expiryDate={item.expiryDate}
                                                    onFormatted={(timeString) =>
                                                        setFormattedTime(
                                                            timeString,
                                                        )
                                                    }
                                                />
                                                {formattedTime}
                                            </div>
                                        )}
                                        ;
                                        <div className="nft__item_wrap">
                                            <div className="nft__item_extra">
                                                <div className="nft__item_buttons">
                                                    <button>Buy Now</button>
                                                    <div className="nft__item_share">
                                                        <h4>Share</h4>
                                                        <a
                                                            href="#top"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <i className="fa fa-facebook fa-lg"></i>
                                                        </a>
                                                        <a
                                                            href="#top"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <i className="fa fa-twitter fa-lg"></i>
                                                        </a>
                                                        <a href="#top">
                                                            <i className="fa fa-envelope fa-lg"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <Link
                                                to={`/item-details/${item.nftId}`}
                                            >
                                                <img
                                                    src={item.nftImage}
                                                    className="lazy nft__item_preview"
                                                    alt=""
                                                    onClick={() =>
                                                        setSelectedItem(
                                                            item.nftId,
                                                        )
                                                    }
                                                />
                                            </Link>
                                        </div>
                                        <div className="nft__item_info">
                                            <Link
                                                to={`/item-details/${item.nftId}`}
                                            >
                                                <h4
                                                    onClick={() =>
                                                        setSelectedItem(
                                                            item.nftId,
                                                        )
                                                    }
                                                >
                                                    {item.title}
                                                </h4>
                                            </Link>
                                            <div className="nft__item_price">
                                                {item.price} ETH
                                            </div>
                                            <div className="nft__item_like">
                                                <i className="fa fa-heart"></i>
                                                <span>{item.likes}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    )}
                </div>
            </div>
        </section>
    );
};

export default NewItems;
