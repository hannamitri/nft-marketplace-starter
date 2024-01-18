import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./style.css";
import React from 'react'
import CollectionItem from '../CollectionItem';

const Slider = ({ data }) => {

    return (
        <>
            <div className='custom-swiper-wrapper'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    loop={true}

                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 0
                        },
                        // when window width is >= 480px
                        480: {
                            slidesPerView: 1,
                            spaceBetween: 0
                        },
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        750: {
                            slidesPerView: 4,
                            spaceBetween: 20
                        },

                    }}
                    modules={[Pagination, Navigation]}
                    className="Swiper"
                >
                    {data.map((collection, index) => (
                        <SwiperSlide key={index} >
                            <CollectionItem collection={collection} />
                        </SwiperSlide>
                    ))}

                    <div className="swiper-button-next swiper-custom-nav"></div>
                    <div className="swiper-button-prev swiper-custom-nav"></div>
                </Swiper >
            </div>
        </>
    );

}

export default Slider
