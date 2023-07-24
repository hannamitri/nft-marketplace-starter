import React, {useEffect, useState} from "react";
import EthImage from "../images/ethereum.svg";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
    const [data, setData] = useState(null)
    const {nftId} = useParams()
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`)
            setData(response.data)
        }
        fetchData()
    }, []);

    return (
        <div id="wrapper">
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>
                <section aria-label="section" className="mt90 sm-mt-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 text-center">
                                {data ? (
                                    <img
                                        src={data?.nftImage}
                                        className="img-fluid img-rounded mb-sm-30 nft-image"
                                        alt=""
                                    />
                                ) : (
                                    <div className='img-fluid img-rounded mb-sm-30 nft-image'>
                                        <Skeleton width='100%' height='100%' borderRadius={3}/>
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <div className="item_info">
                                    <h2>{data ? (
                                        <>{data?.title} #{data?.id}</>
                                    ) : (
                                        <Skeleton height={40} width={280}/>
                                    )}</h2>

                                    <div className="item_info_counts">
                                        {data ? (
                                            <>
                                                <div className="item_info_views">
                                                    <i className="fa fa-eye"></i>
                                                    {data?.views}
                                                </div>
                                                <div className="item_info_like">
                                                    <i className="fa fa-heart"></i>
                                                    {data?.likes}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Skeleton height={30} width={80}/>
                                                <Skeleton height={30} width={80}/>
                                            </>
                                        )}
                                    </div>
                                    <p>
                                        {data?.description || (
                                            <>
                                                <Skeleton width='100%' height={16}/>
                                                <Skeleton width='100%' height={16}/>
                                                <Skeleton width='100%' height={16}/>
                                                <Skeleton width='60%' height={16}/>
                                            </>
                                        )}
                                    </p>
                                    <div className="d-flex flex-row">
                                        <div className="mr40">
                                            <h6>Owner</h6>
                                            <div className="item_author">
                                                <div className="author_list_pp">
                                                    {data ? (
                                                        <Link to={`/author/${data?.ownerId}`}>
                                                            <img className="lazy" src={data?.ownerImage} alt=""/>
                                                            <i className="fa fa-check"></i>
                                                        </Link>
                                                    ) : (
                                                        <div>
                                                            <Skeleton width={50} height={50} borderRadius={25}/>
                                                            <i className="fa fa-check"></i>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="author_list_info">
                                                    {data ? (
                                                        <Link to={`/author/${data?.ownerId}`}>{data?.ownerName}</Link>
                                                    ) : (
                                                        <span><Skeleton width={110} height={20}/></span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div></div>
                                    </div>
                                    <div className="de_tab tab_simple">
                                        <div className="de_tab_content">
                                            <h6>Creator</h6>
                                            <div className="item_author">
                                                <div className="author_list_pp">
                                                    {data ? (
                                                        <Link to={`/author/${data?.creatorId}`}>
                                                            <img className="lazy" src={data?.creatorImage} alt=""/>
                                                            <i className="fa fa-check"></i>
                                                        </Link>
                                                    ) : (
                                                        <div>
                                                            <Skeleton width={50} height={50} borderRadius={25}/>
                                                            <i className="fa fa-check"></i>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="author_list_info">
                                                    {data ? (
                                                        <Link
                                                            to={`/author/${data?.creatorId}`}>{data?.creatorName}</Link>
                                                    ) : (
                                                        <span><Skeleton width={110} height={20}/></span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="spacer-40"></div>
                                        <h6>Price</h6>
                                        <div className="nft-item-price">
                                            <img src={EthImage} alt=""/>
                                            <span>{data?.price || <Skeleton height={30} width={70}/>}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
        ;
};

export default ItemDetails;
