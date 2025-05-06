import React from "react";
import Skeleton from "./UI/Skeleton";

const SkeletonAuthor = () => {
    return (
        <div id='wrapper'>
            <div className="no-botton no-top" id="content">
                <div id="top"></div>

                <section
                    id="profile_banner"
                    aria-label="section"
                    className="text-light"
                    >
                        <Skeleton height='100%' width='100%' />
                    </section>

                    <section aria-label="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d_profile de-flex align-items-center">
                                        <div className="de-flex-col">
                                            <div className="profile_avatar">
                                                <Skeleton width='100px' height='100px' borderRadius='50%' />
                                                <div className="profile_name mt-3">
                                                    <h4>
                                                        <Skeleton width='150px' height='20px' />
                                                        <span className="profile_username">
                                                            <Skeleton width='100px' height='15px' />
                                                        </span>
                                                        <span className="profile_wallet">
                                                            <Skeleton width='200px' height='15px' />
                                                        </span>
                                                        <Skeleton width='60px' height='30px' />
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="profile_follow de-flex">
                                            <div className="de-flex-col">
                                                <div className="profile_follower">
                                                    <Skeleton width='100px' height='20px' />
                                                </div>
                                                <Skeleton width='100px' height='40px' />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 mt-4">
                                    <div className="de_tab tab_simple">
                                        <div className="row">
                                            {new Array(8).fill(0).map((_, i) => (
                                                <div className="col-lg-3 col-md-6 col-sm-6" key={i}>
                                                    <div className="nft__item">
                                                        <Skeleton width='100%' height='200px' />
                                                        <div className="nft__item_info mt-3">
                                                            <Skeleton width='80%' height='20px' />
                                                            <Skeleton width='50%' height='20px' />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            </div>
        </div>
    )
}

export default SkeletonAuthor;