import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./style.css";
import CollectionItem from '../CollectionItem';
import { HotCollectionSkeleton } from '../UI/Skeleton';
import NewItemcard from '../NewItem.card';
import { NewItemSkeleton } from '../UI/Skeleton';



const Slider = ({ loading, data, from }) => {
    let array = from === "hotCollections" ? 6 : 7;

    return (
        <>
            <div className='custom-swiper-wrapper'>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    loop={false}
                    // slidesPerGroup={1}

                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    breakpoints={{


                        // when window width is >= 640px
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        750: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        950: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        1000: {
                            slidesPerView: 4,
                            spaceBetween: 10
                        }

                    }}
                    modules={[Pagination, Navigation]}
                    className="Swiper"
                >

                    {
                        loading ?
                            new Array(array).fill(0).map((_, index) => (
                                <SwiperSlide key={index}>
                                    {from === 'hotCollections' ? <HotCollectionSkeleton /> : <NewItemSkeleton />}
                                </SwiperSlide>
                            ))
                            :
                            data.map((item, index) => (
                                <SwiperSlide key={index}>
                                    {from === 'hotCollections' ? <CollectionItem collection={item} /> : <NewItemcard item={item} index={index} />}
                                </SwiperSlide>
                            ))
                    }


                    <div className="swiper-button-next swiper-custom-nav"></div>
                    <div className="swiper-button-prev swiper-custom-nav"></div>
                </Swiper>
            </div>
        </>
    );
}



export default Slider
