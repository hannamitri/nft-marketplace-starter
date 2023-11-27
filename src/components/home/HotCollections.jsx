import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Chevron from "./Chevron";
import {settings} from "../utils/settings";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
    const [hotCollections, setHotCollections] = useState([]);
    const sliderRef = useRef();


    const handleNext = () => {
        sliderRef.current.slickNext();
    }

    const handlePrev = () => {
        sliderRef.current.slickPrev();
    }

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
            setHotCollections(response.data)
        }

        fetchData()
    }, []);

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
                    <Chevron right onClick={handleNext}/>
                    <Chevron onClick={handlePrev}/>
                    {
                        hotCollections.length > 0 ? (
                                <Slider ref={sliderRef} {...settings}>
                                    {
                                        hotCollections.map((item) => (
                                            <div className=" col-lg-12">
                                                <div className="nft_coll">
                                                    <div className="nft_wrap">
                                                        <Link to="/item-details">
                                                            <img src={item.nftImage} className="lazy img-fluid" alt=""/>
                                                        </Link>
                                                    </div>
                                                    <div className="nft_coll_pp">
                                                        <Link to="/author">
                                                            <img className="lazy pp-coll" src={item.authorImage} alt=""/>
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
                                        ))
                                    }
                                </Slider>

                            )
                            : (
                                <Slider ref={sliderRef} {...settings}>
                                    {
                                        new Array(6).fill(0).map((_,) =>
                                            (<div className=" col-lg-12">
                                                <div className="nft_coll">
                                                    <div className="nft_wrap">
                                                        <Skeleton width="100%" height="100%" borderRadius="0"/>
                                                    </div>
                                                    <div className="nft_coll_pp">
                                                        <Skeleton width="100%" height="60px" borderRadius="50%"/>
                                                        <i className="fa fa-check"></i>
                                                    </div>
                                                    <div className="nft_coll_info">
                                                        <Skeleton width="82px" height="18px" borderRadius="0"/>
                                                    </div>
                                                        <Skeleton width="48px" height="18px" borderRadius="0"/>
                                                </div>
                                            </div>)
                                        )
                                    }
                                </Slider>
                            )
                    }
                </div>

            </div>
        </section>
    );
};

export default HotCollections;
