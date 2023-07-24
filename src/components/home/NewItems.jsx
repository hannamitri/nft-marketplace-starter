import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Chevron from "./Chevron";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
import {settings} from "../sliderSettings";
import Countdown from "./Countdown";
import Card from "../UI/Card";

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
                                        <Card
                                            expiryDate={item.expiryDate}
                                            authorId={item.authorId}
                                            authorImage={item.authorImage}
                                            nftId={item.nftId}
                                            nftImage={item.nftImage}
                                            title={item.title}
                                            price={item.price}
                                            likes={item.likes}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <Slider {...settings} ref={sliderRef}>
                                {Array.from({length: 6}).map((_, idx) => (
                                    <div className="col-12" key={idx}>
                                        <Card skeleton/>
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
