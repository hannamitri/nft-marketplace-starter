import React from 'react';
import Skeleton from './UI/Skeleton';
const SkeletonExplore = () => {
    return (
        <div className='d-item col-lg-3 col-md-6 col-sm-6 col-xs-12' style={{ display: 'block', backgroundSize: 'cover' }}>
            <div className='nft_item'>
                <div className='author_list_pp'>
                    <Skeleton width='50px' height='50px' borderRadius='50%' />
                    <i className='fa fa-check'></i>
                </div>
                <Skeleton width='100%' height='20px' />

                <div className='nft__item_wrap'>
                    <div className='nft__item_extra'>
                        <div className='nft__item_buttons'>
                            <Skeleton width='80px' height='40px' borderRadius='5px' />
                            <div className='nft__item_share'>
                                <h4>Share</h4>
                                <Skeleton width='20px' height='20px' borderRadius='50%' />
                                <Skeleton width='20px' height='20px' borderRadius='50%' />
                                <Skeleton width='20px' height='20px' borderRadius='50%' />
                            </div>
                        </div>
                    </div>
                    <Skeleton width='100%' height='200px' />
                </div>
                <div nft__item_info>
                    <Skeleton width='100%' height='20px' />
                    <Skeleton width='50%' height='20px' />
                    <div className='nft__item_like'>
                        <Skeleton width='20px' height='20px' borderRadius='50%' />
                        <Skeleton width='30%' height='20px' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonExplore;