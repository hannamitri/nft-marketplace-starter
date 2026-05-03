import React from "react";
import Skeleton from "./Skeleton";

const ItemDetailsSkeleton = () => {
    return (
        <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center mb-sm-30">
                        <Skeleton width="100%" height="480px" borderRadius="8px" />
                    </div>
                    <div className="col-md-6">
                        <div className="item_info">
                            <Skeleton width="300px" height="40px" borderRadius="6px" />
                            <div className="item_info_counts">
                                <Skeleton width="80px" height="30px" borderRadius="6px" />
                                <Skeleton width="80px" height="30px" borderRadius="6px" />
                            </div>
                            <Skeleton width="100%" height="80px" borderRadius="6px" />

                            <div className="d-flex flex-row">
                                <div className="mr40">
                                    <h6>Owner</h6>
                                    <div className="item_author">
                                        <div className="author_list_pp">
                                            <Skeleton
                                                width="50px"
                                                height="50px"
                                                borderRadius="50%"
                                            />
                                        </div>
                                        <div className="author_list_info">
                                            <Skeleton width="125px" height="20px" borderRadius="6px" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="de_tab tab_simple">
                                <div className="de_tab_content">
                                    <h6>Creator</h6>
                                    <div className="item_author">
                                        <div className="author_list_pp">
                                            <Skeleton
                                                width="50px"
                                                height="50px"
                                                borderRadius="50%"
                                            />
                                        </div>
                                        <div className="author_list_info">
                                            <Skeleton width="125px" height="20px" borderRadius="6px" />
                                        </div>
                                    </div>
                                </div>
                                <div className="spacer-40"></div>
                                <h6>Price</h6>
                                <div className="nft-item-price">
                                    <Skeleton width="75px" height="20px" borderRadius="6px" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ItemDetailsSkeleton;