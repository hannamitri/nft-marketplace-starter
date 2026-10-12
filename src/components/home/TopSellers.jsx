
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {

    const [topSellers, setTopsellers] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(function () {
        fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setTimeout(function () {
                    setTopsellers(data);
                    setLoading(false);
                }, 2000);
            });
    }, []);

    return (
        <section id="section-popular" className="pb-5">
            <div className="container">
                <div className="row">

                    <div className="col-lg-12">
                        <div className="text-center">
                            <h2>Top Sellers</h2>
                            <div className="small-border bg-color-2"></div>
                        </div>
                    </div>

                    <div className="col-md-12">

                        {loading ? (
                            <ol className="author_list">
                                {new Array(12).fill(0).map((_, index) => (
                                    <li key={index}>
                                        <div className="author_list_pp">
                                            <Skeleton
                                                width="48px"
                                                height="48px"
                                                borderRadius="50%"
                                            />
                                        </div>

                                        <div className="author_list_info">
                                            <Skeleton
                                                width="120px"
                                                height="14px"
                                                borderRadius="4px"
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ol>

                        ) : (

                            <ol className="author_list">
                                {topSellers.map((seller) => (
                                    <li key={seller.id}>
                                        <div className="author_list_pp">
                                            <Link to={`/author/${seller.authorId}`}>
                                                <img
                                                    className="lazy pp-author"
                                                    src={seller.authorImage}
                                                    alt=""
                                                />
                                                <i className="fa fa-check"></i>
                                            </Link>
                                        </div>

                                        <div className="author_list_info">
                                            <Link to={`/author/${seller.authorId}`}>
                                                {seller.authorName}
                                            </Link>
                                            <span>{seller.price} ETH</span>
                                        </div>
                                    </li>
                                ))}
                            </ol>

                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopSellers;
