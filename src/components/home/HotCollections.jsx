import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Chevron from "./Chevron";
import Skeleton from "../UI/Skeleton";
import {settings} from "../sliderSettings";

const HotCollections = () => {
    const [data, setData] = useState([])
    const sliderRef = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
            setData(response.data)
        }

        fetchData()
    }, [])

    const handleNext = () => {
        sliderRef.current.slickNext();
    }

    const handlePrev = () => {
        sliderRef.current.slickPrev();
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
                    <div className='relative'>
                        <Chevron onClick={handlePrev}/>
                        <Chevron right onClick={handleNext}/>
                        {data.length > 0 ? (
                            <Slider {...settings} ref={sliderRef}>
                                {data.map(item => (
                                    <div className="col-12" key={item.id}>
                                        <div className="nft_coll">
                                            <div className="nft_wrap">
                                                <Link to={`/item-details/${item.nftId}`}>
                                                    <img src={item.nftImage} className="lazy img-fluid" alt=""/>
                                                </Link>
                                            </div>
                                            <div className="nft_coll_pp">
                                                <Link to={`/author/${item.authorId}`}>
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
                                ))}
                            </Slider>
                        ) : (
                            <Slider {...settings} ref={sliderRef}>
                                {Array.from({length: 6}).map((_, idx) => (
                                    <div className="col-12" key={idx}>
                                        <div className="nft_coll">
                                            <div className="nft_wrap">
                                                <Link to={`/item-details/`}>
                                                    <Skeleton height='100%' width='100%'/>
                                                </Link>
                                            </div>
                                            <div className="nft_coll_pp">
                                                <Link to={`/author/`}>
                                                    <Skeleton height={60} width={60} borderRadius={30}/>
                                                </Link>
                                                <i className="fa fa-check"></i>
                                            </div>
                                            <div className="nft_coll_info">
                                                <Link to="/explore">
                                                    <h4>
                                                        <Skeleton height={20} width={80}/>
                                                    </h4>
                                                </Link>
                                                <span>
                                                    <Skeleton height={20} width={60}/>
                                                </span>
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
    )
}

export default HotCollections;
