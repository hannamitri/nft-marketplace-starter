import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import TopSellersSkeleton from "../UI/TopSellersSkeleton";

const TopSellers = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [topSellerHTML, setTopSellerHTML] = useState([])

    useEffect(() => {
        async function renderTopSellers() {
            try {
                const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`)
                setTopSellerHTML(data)
            } catch (error) {
                console.log("Error fetching topSellers", error)
            } finally {
                setIsLoading(false)
            }
        }

        renderTopSellers()
    }, [])

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

                        {isLoading ? (

                            <TopSellersSkeleton/>

                        ) : (

                            <ol className="author_list">
                                {topSellerHTML.map((data) => (
                                    <li key={data.id}>
                                        <div className="author_list_pp">
                                            <Link to={`/author/${data.authorId}`}>
                                                <img
                                                    className="lazy pp-author"
                                                    src={data.authorImage}
                                                    alt=""
                                                />
                                                <i className="fa fa-check"></i>
                                            </Link>
                                        </div>
                                        <div className="author_list_info">
                                            <Link to={`author/${data.authorId}`}>{data.authorName}</Link>
                                            <span>{data.price} ETH</span>
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
