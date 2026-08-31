import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../../css/styles/skeleton.css";

const HotCollections = () => {
    //set the variables
    const { hotCollections, setSelectedItem, setSelectedAuthor, loading } =
        useContext(DataContext);

    // Custom Previous Arrow Component
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
                    left: "0px", // move arrow to border
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
                    right: "0px", // move arrow to border
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
        <section id="section-collections" className="no-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center">
                            <h2>Hot Collections</h2>
                            <div className="small-border bg-color-2"></div>
                        </div>
                    </div>

                    {loading ? (
                        <Slider {...settings}>
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <div key={idx}  className="skeleton skeleton-img">
                                    <div className="nft-wrap">
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <Slider {...settings}>
                            {hotCollections.map((item) => (
                                <div key={item.id}>
                                    <div className="nft_coll">
                                        <div className="nft_wrap">
                                            <Link
                                                to={`/item-details/${item.nftId}`}
                                            >
                                                <img
                                                    src={item.nftImage}
                                                    className="lazy img-fluid"
                                                    alt=""
                                                    onClick={() =>
                                                        setSelectedItem(
                                                            item.nftId,
                                                        )
                                                    }
                                                />
                                            </Link>
                                        </div>
                                        <div className="nft_coll_pp">
                                            <Link
                                                to={`/author/${item.authorId}`}
                                            >
                                                <img
                                                    className="lazy pp-coll"
                                                    src={item.authorImage}
                                                    alt=""
                                                    onClick={() => {
                                                        setSelectedAuthor(
                                                            item.authorId,
                                                        );
                                                    }}
                                                />
                                            </Link>
                                            <i className="fa fa-check"></i>
                                        </div>
                                        <div className="nft_coll_info">
                                            <Link to="/explore">
                                                <h4>{item.title}</h4>
                                            </Link>
                                            <span>ERC-{item.code}</span>
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

export default HotCollections;
