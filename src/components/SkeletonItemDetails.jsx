import React from "react";
import Skeleton from "./UI/Skeleton";

const SkeletonItemDetails = () => {
    return (
        <div id="wrapper">
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>
                <section aria-label="container">
                    <div className="row">

                        <div className="col-md-6 text-center">
                            <Skeleton width='100%' height='400px' borderRadius='10px' />
                        </div>

                        <div className="col-md-6">
                            <div className="item_info">
                                <Skeleton width='60%' height='30px' borderRadius='5px' />

                                <div className="item_info_counts" style={{ marginTop: '15px', display: 'flex', gap: '15px' }}>
                                    <Skeleton width='50px' height='20px' borderRadius='5px' />
                                    <Skeleton width='50px' height='20px' borderRadius='5px' />
                                </div>

                                <div style={{ marginTop: '20px'}}>
                                    <Skeleton width='100%' height='80px' borderRadius='10px' />
                                </div>

                                <div className="d-flex flex-row mt-4">
                                    <div className="mr40">
                                        <h6>Owner</h6>
                                        <div className="item_author d-flex align-items-center">
                                            <Skeleton width='50px' height='50px' borderRadius='50%' />
                                            <div style={{ marginLeft: '10px' }}>
                                                <Skeleton width='100px' height='15px' borderRadius='4px' />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="de_tab tab_simple mt-4">
                                    <h6>Creator</h6>
                                    <div className="item_author d-flex align-items-center">
                                        <Skeleton width='50px' height='50px' borderRadius='50%' />
                                        <div style={{ marginLeft: '10px' }}>
                                            <Skeleton width='100px' height='15px' borderRadius='4px' />
                                        </div>
                                    </div>

                                    <div className="spacer-40"></div>

                                    <h6>Price</h6>
                                    <div className="nft-item-price d-flex align-items-center">
                                        <Skeleton width='20px' height='20px' borderRadius='3px' />
                                        <Skeleton width='60px' height='20px' borderRadius='5px' style={{ marginLeft: '10px' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SkeletonItemDetails;