import React from "react";
import Skeleton from "./UI/Skeleton";

const SkeletonNewItems = () => {
    return (
        <div className="nft__item">
            <div className="author_list_pp">
                <Skeleton width='50px' height='50px' borderRadius='50%' />
            </div>

            <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
                <Skeleton width='120px' height='35px' borderRadius='20px' />
            </div>

            <div className="nft__item_wrap">
                <Skeleton width='100%' height='200px' borderRadius='10px' />
            </div>

            <div className="nft__item_info mt-2">
                <Skeleton width='70%' height='20px' borderRadius='5px' style={{ marginBottom: '8px' }} />
                <Skeleton width='40%' height='15px' borderRadius='5px' />
            </div>

            <div className="nft__item_like mt-2">
                <Skeleton width='40px' height='15px' borderRadius='4px' />
            </div>
        </div>
    )
}

export default SkeletonNewItems