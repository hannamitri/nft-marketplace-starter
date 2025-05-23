import React from 'react';
import NewItemsSkeleton from "./NewItemsSkeleton";
import AuthorItems from "../author/AuthorItems";

const AuthorSkeleton = () => {
    return (
        <section aria-label="section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d_profile de-flex">
                            <div className="de-flex-col">
                                <div className="profile_avatar">
                                    <img className="skeleton" style={{height: 150, width: 150}}/>
                                    <i className="fa fa-check"></i>
                                    <div className="profile_name">
                                        <h4>
                                            <span className="profile_username skeleton skeleton-text" style={{height: 30, width: 150, marginBottom: 5}}></span>
                                            <span className="profile_username skeleton skeleton-text" style={{height: 30, width: 133, marginBottom: 5}}></span>
                                            <span id="wallet" className="profile_wallet skeleton skeleton-text"  style={{height: 30, width: 180, marginBottom: 5}}></span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="profile_follow de-flex">
                                <div className="de-flex-col">
                                    <div className="profile_follower skeleton" style={{height: 26, width: 110}}></div>
                                    <div className="btn-main skeleton" style={{height: 42, width: 123}}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="de_tab tab_simple">
                            <NewItemsSkeleton/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default AuthorSkeleton;