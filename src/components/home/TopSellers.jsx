import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers')
            setData(response.data)
        }
        fetchData()
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
                        <ol className="author_list">
                            {data.map(author => (
                                <li key={author.id}>
                                    <div className="author_list_pp">
                                        <Link to={`/author/${author.authorId}`}>
                                            <img
                                                className="lazy pp-author"
                                                src={author.authorImage}
                                                alt=""
                                            />
                                            <i className="fa fa-check"></i>
                                        </Link>
                                    </div>
                                    <div className="author_list_info">
                                        <Link to={`/author/${author.authorId}`}>{author.authorName}</Link>
                                        <span>{author.price} ETH</span>
                                    </div>
                                </li>
                            ))}
                            {data.length === 0 && Array.from({length: 12}).map((_, idx) => (
                                <li key={idx}>
                                    <div className="author_list_pp">
                                        <Link to='/'>
                                            <div>
                                                <div className='pp-author'>
                                                    <Skeleton width={50} height={50} borderRadius={25}/>
                                                </div>
                                                <i className="fa fa-check"></i>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="author_list_info">
                                        <Link to='/'>
                                            <Skeleton width={100} height={20}/>
                                        </Link>
                                        <span>
                                            <Skeleton width={40} height={16}/>
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopSellers;
