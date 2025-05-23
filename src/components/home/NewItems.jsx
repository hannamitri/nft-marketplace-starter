import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Timer from "../UI/Timer";
import NewItemsSkeleton from "../UI/NewItemsSkeleton";


const NewItems = () => {
    const [newItemsHTML, setNewItemsHTML] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        async function renderNewItems() {
            try {
                const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)
                setNewItemsHTML(data)
            } catch (error) {
                console.log("Error in function renderNewItems.", error)
            } finally {
                setIsLoading(false)
            }
        }

        renderNewItems();
    }, []);

    function SamplePrevArrow(props) {
        const {className, style, onClick} = props;
        return (
            <div
                className={className}
                style={{...style, display: "block", background: "gray", borderRadius: "50%"}}
                onClick={onClick}
            />
        );
    }

    function SampleNextArrow(props) {
        const {className, style, onClick} = props;
        return (
            <div
                className={className}
                style={{...style, display: "block", background: "gray", borderRadius: "50%"}}
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
        <section id="section-items" className="no-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center">
                            <h2>New Items</h2>
                            <div className="small-border bg-color-2"></div>
                        </div>
                    </div>


                    {isLoading ? (

                        <NewItemsSkeleton/>

                    ) : (
                        <div className={"slider-container"}>
                            <Slider {...settings}>
                                {newItemsHTML.map((data) => (
                                    <div key={data.id}>
                                        <div className="nft__item">
                                            <div className="author_list_pp">
                                                <Link
                                                    to={`/author/${data.authorId}`}
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title="Creator: Monica Lucas"
                                                >
                                                    <img className="lazy" src={data.authorImage} alt=""/>
                                                    <i className="fa fa-check"></i>
                                                </Link>
                                            </div>


                                            {data.expiryDate && (
                                                <div className={`de_countdown`}>
                                                    <Timer duration={data.expiryDate}/>
                                                </div>
                                            )}

                                            <div className="nft__item_wrap">

                                                <Link to={`/item-details/${data.nftId}`}>
                                                    <img
                                                        src={data.nftImage}
                                                        className="lazy nft__item_preview"
                                                        alt=""
                                                    />
                                                </Link>

                                            </div>
                                            <div className="nft__item_info">
                                                <Link to={`/item-details/${data.nftId}`}>
                                                    <h4>{data.title}</h4>
                                                </Link>
                                                <div className="nft__item_price">{data.price} ETH</div>
                                                <div className="nft__item_like">
                                                    <i className="fa fa-heart"></i>
                                                    <span>{data.likes}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default NewItems;
