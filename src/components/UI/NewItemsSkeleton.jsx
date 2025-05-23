import React from 'react'


const NewItemsSkeleton = () => {
    const skeletonItems = Array.from({ length: 4 }, (_, index) => index);

    return (
        <div className="skeleton-container">
            {skeletonItems.map((item) => (
                <div key={item} className="nft__item nft__item__skeleton" style={{ height: "441px" }}>
                    <div className="nft__item_wrap skeleton">
                        <div className="nft__item_extra"></div>
                        <div className="lazy nft__item_preview skeleton" alt="" />
                    </div>
                    <div className="nft__item_info skeleton" style={{ marginTop: "10px", width: "70%" }}>
                        <div className="nft__item_price skeleton-text"></div>
                        <div className="nft__item_price skeleton-text"></div>
                        <div className="nft__item_like">
                            <span className="skeleton-text"></span>
                        </div>
                    </div>
                    <div className="nft__item_info skeleton" style={{ marginTop: "10px", width: "50%", position: "relative" }}>
                        <div className="nft__item_price skeleton-text"></div>
                        <div className="nft__item_price skeleton-text"></div>
                        <span className="skeleton-text"></span>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default NewItemsSkeleton