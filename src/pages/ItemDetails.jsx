import React, { useEffect, useContext } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import { DataContext } from "../components/context/DataContext";
import "../css/styles/skeleton.css";

const ItemDetails = () => {
    const { itemDetail, setSelectedAuthor, loading } = useContext(DataContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Show skeleton while loading (including first load after refresh)
    if (loading) {
        return (
            <div id="wrapper">
                <div className="no-bottom no-top" id="content">
                    <div id="top"></div>
                    <section aria-label="section" className="mt90 sm-mt-0">
                        <div className="container">
                            <div className="row">
                                <div className="skeleton col-md-6 text-center">
                                    <img
                                        className="img-fluid img-rounded mb-sm-30 nft-image"
                                        alt=""
                                    />
                                </div>
                                <div className="col-md-6">
                                    <div className="item_info">
                                        <h2 className="skeleton">
                                            Fetching Item Details
                                        </h2>
                                        <div className="item_info_counts">
                                            <div className="item_info_views">
                                                <i className="skeleton fa fa-eye"></i>
                                            </div>
                                            <div className="item_info_like">
                                                <i className="skeleton fa fa-heart"></i>
                                            </div>
                                        </div>
                                        <p className="skeleton">
                                            <br></br>
                                        </p>
                                        <div className="d-flex flex-row">
                                            <div className="mr40">
                                                <h6>Owner</h6>
                                                <div className="item_author">
                                                    <div className="skeleton author_list_info">
                                                        <i className="skeleton fa fa-check"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div></div>
                                        </div>
                                        <div className="d-flex flex-row">
                                            <div className="mr40">
                                                <h6>Creator</h6>
                                                <div className="item_author">
                                                    <div className="skeleton author_list_info">
                                                        <i className="skeleton fa fa-check"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="spacer-40"></div>
                                        <h6>Price</h6>
                                        <div className="nft-item-price">
                                            <img src={EthImage} alt="" />
                                            <span className="skeleton"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    if (!itemDetail) return <p>Item not found.</p>;

    return (
        <div id="wrapper">
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>
                <section aria-label="section" className="mt90 sm-mt-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 text-center">
                                <img
                                    src={itemDetail.nftImage}
                                    className="img-fluid img-rounded mb-sm-30 nft-image"
                                    alt=""
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="item_info">
                                    <h2>
                                        {itemDetail.title} #{itemDetail.tag}
                                    </h2>
                                    <div className="item_info_counts">
                                        <div className="item_info_views">
                                            <i className="fa fa-eye"></i>
                                            {itemDetail.views}
                                        </div>
                                        <div className="item_info_like">
                                            <i className="fa fa-heart"></i>
                                            {itemDetail.likes}
                                        </div>
                                    </div>
                                    <p>{itemDetail.description}</p>
                                    <div className="d-flex flex-row">
                                        <div className="mr40">
                                            <h6>Owner</h6>
                                            <div className="item_author">
                                                <div className="author_list_pp">
                                                    <Link
                                                        to={`/author/${itemDetail.ownerId}`}
                                                    >
                                                        <img
                                                            className="lazy"
                                                            src={
                                                                itemDetail.ownerImage
                                                            }
                                                            alt=""
                                                            onClick={() =>
                                                                setSelectedAuthor(
                                                                    itemDetail.ownerId,
                                                                )
                                                            }
                                                        />
                                                        <i className="fa fa-check"></i>
                                                    </Link>
                                                </div>
                                                <div className="author_list_info">
                                                    <Link
                                                        to={`/author/${itemDetail.ownerId}`}
                                                        onClick={() =>
                                                            setSelectedAuthor(
                                                                itemDetail.ownerId,
                                                            )
                                                        }
                                                    >
                                                        {itemDetail.ownerName}
                                                    </Link>
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
                                                    <Link
                                                        to={`/author/${itemDetail.creatorId}`}
                                                    >
                                                        {" "}
                                                        <img
                                                            className="lazy"
                                                            src={
                                                                itemDetail.creatorImage
                                                            }
                                                            alt=""
                                                            onClick={() =>
                                                                setSelectedAuthor(
                                                                    itemDetail.creatorId,
                                                                )
                                                            }
                                                        />
                                                        <i className="fa fa-check"></i>
                                                    </Link>
                                                </div>

                                                <div className="author_list_info">
                                                    <Link
                                                        to={`/author/${itemDetail.creatorId}`}
                                                        onClick={() =>
                                                            setSelectedAuthor(
                                                                itemDetail.creatorId,
                                                            )
                                                        }
                                                    >
                                                        {itemDetail.creatorName}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="spacer-40"></div>
                                        <h6>Price</h6>
                                        <div className="nft-item-price">
                                            <img src={EthImage} alt="" />
                                            <span>{itemDetail.price}</span>
                                        </div>
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

export default ItemDetails;
