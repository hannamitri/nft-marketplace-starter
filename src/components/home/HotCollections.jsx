import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardSkeleton from "../UI/CardSkeleton";


const HotCollections = () => {
    const [userHTML, setUserHTML] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function renderData() {
            try {
                const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
                setUserHTML(data)
            } catch (error) {
                console.log("Error in function renderData", error);
            } finally {
                setIsLoading(false);
            }
        }
        renderData()
    }, []);

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "gray", borderRadius: "50%"}}
                onClick={onClick}
            />
        );
    }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "gray", borderRadius: "50%"}}
                onClick={onClick}
            />
        );
    }

    const settings = {
        arrows: true,
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    }

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


                    {isLoading ? (
                        <div className={"slider-container"}>
                            <Slider {...settings}>
                                <div>
                                    <CardSkeleton></CardSkeleton>
                                </div>
                                <div>
                                    <CardSkeleton></CardSkeleton>
                                </div>
                            </Slider>
                        </div>


                    ) : (

                        <div className={"slider-container"}>
                            <Slider {...settings}>
                                {userHTML.map((data) =>
                                    (
                                        <div key={data.id}>
                                            <div className="nft_coll">
                                                <div className="nft_wrap">
                                                    <Link to={`/item-details/${data.nftId}`}>
                                                        <img src={data.nftImage} className="lazy img-fluid" alt=""/>
                                                    </Link>
                                                </div>
                                                <div className="nft_coll_pp">
                                                    <Link to={`/author/${data.authorId}`}>
                                                        <img className="lazy pp-coll" src={data.authorImage} alt=""/>
                                                    </Link>
                                                    <i className="fa fa-check"></i>
                                                </div>
                                                <div className="nft_coll_info">
                                                    <Link to="/explore">
                                                        <h4>{data.title}</h4>
                                                    </Link>
                                                    <span>ERC-{data.code}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </Slider>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HotCollections;
