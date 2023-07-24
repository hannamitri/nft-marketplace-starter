import React, {useEffect, useState} from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import {Link, useParams} from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
    const [data, setData] = useState(null)
    const {authorId} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
            setData(response.data)
        }
        fetchData()
    }, [])
    return (
        <div id="wrapper">
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>

                {data ? <section
                    id="profile_banner"
                    aria-label="section"
                    className="text-light"
                    data-bgimage="url(images/author_banner.jpg) top"
                    style={{background: `url(${data.nftCollection[0].nftImage}) top`}}
                /> : <Skeleton width='100%' height={360}/>}

                <section aria-label="section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d_profile de-flex">
                                    <div className="de-flex-col">
                                        <div className="profile_avatar">
                                            {data ? <img src={data?.authorImage} alt=""/> : <Skeleton width={150} height={150} borderRadius={75}/>}

                                            <i className="fa fa-check"></i>
                                            <div className="profile_name">
                                                <h4>
                                                    {data?.authorName || <Skeleton height={30} width={140}/>}
                                                    <span className="profile_username">@{data?.tag || <Skeleton width={80} height={20}/>}</span>
                                                    <span id="wallet" className="profile_wallet">{data?.address || <Skeleton width={200} height={30}/>}</span>
                                                    <button id="btn_copy" title="Copy Text">
                                                        Copy
                                                    </button>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile_follow de-flex">
                                        <div className="de-flex-col">
                                            <div className="profile_follower">{data?.followers || <Skeleton height={20} width={40}/>} followers</div>
                                            <Link to="#" className="btn-main">
                                                Follow
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="de_tab tab_simple">
                                    <AuthorItems
                                        data={data?.nftCollection}
                                        authorId={authorId}
                                        authorImage={data?.authorImage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Author;
