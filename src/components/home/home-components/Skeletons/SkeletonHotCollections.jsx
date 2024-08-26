import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoader = () => {
    const options = {
        items:4,
        loop:true,
        margin:12,
        nav:true,
        dots:false,
        responsive: {
            0: {
                items:1
            },
            480:{
                items:2
            }, 
            900:{
                items:3
            },
            1200:{
                items:4
            }

        }
    }
    return ( 
    <OwlCarousel className='owl-theme' {...options}>
                <div className="nft_coll skeleton__loader">
                    <div className="nft_wrap skeleton__wrap">
                        <Skeleton height={200}/>
                    </div>
                    <div className="nft_coll_pp">
                        <div className="lazy pp-coll skeleton__author--img">
                            <Skeleton circle={true} width={60} height={60}/>
                        </div>
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                        <h4><Skeleton width={100}/></h4>
                        <span><Skeleton width={75}/></span>
                    </div>
                </div>
                <div className="nft_coll skeleton__loader">
                    <div className="nft_wrap skeleton__wrap">
                        <Skeleton height={200}/>
                    </div>
                    <div className="nft_coll_pp">
                        <div className="lazy pp-coll skeleton__author--img">
                            <Skeleton circle={true} width={60} height={60}/>
                        </div>
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                        <h4><Skeleton width={100}/></h4>
                        <span><Skeleton width={75}/></span>
                    </div>
                </div>
                <div className="nft_coll skeleton__loader">
                    <div className="nft_wrap skeleton__wrap">
                        <Skeleton height={200}/>
                    </div>
                    <div className="nft_coll_pp">
                        <div className="lazy pp-coll skeleton__author--img">
                            <Skeleton circle={true} width={60} height={60}/>
                        </div>
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                        <h4><Skeleton width={100}/></h4>
                        <span><Skeleton width={75}/></span>
                    </div>
                </div>
                <div className="nft_coll skeleton__loader">
                    <div className="nft_wrap skeleton__wrap">
                        <Skeleton height={200}/>
                    </div>
                    <div className="nft_coll_pp">
                        <div className="lazy pp-coll skeleton__author--img">
                            <Skeleton circle={true} width={60} height={60}/>
                        </div>
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                        <h4><Skeleton width={100}/></h4>
                        <span><Skeleton width={75}/></span>
                    </div>
                </div>
                <div className="nft_coll skeleton__loader">
                    <div className="nft_wrap skeleton__wrap">
                        <Skeleton height={200}/>
                    </div>
                    <div className="nft_coll_pp">
                        <div className="lazy pp-coll skeleton__author--img">
                            <Skeleton circle={true} width={60} height={60}/>
                        </div>
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                        <h4><Skeleton width={100}/></h4>
                        <span><Skeleton width={75}/></span>
                    </div>
                </div>
                <div className="nft_coll skeleton__loader">
                    <div className="nft_wrap skeleton__wrap">
                        <Skeleton height={200}/>
                    </div>
                    <div className="nft_coll_pp">
                        <div className="lazy pp-coll skeleton__author--img">
                            <Skeleton circle={true} width={60} height={60}/>
                        </div>
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                        <h4><Skeleton width={100}/></h4>
                        <span><Skeleton width={75}/></span>
                    </div>
                </div>
    </OwlCarousel>
    );
}
 
export default SkeletonLoader;