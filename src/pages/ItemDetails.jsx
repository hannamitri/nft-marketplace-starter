import React, { useEffect, useContext } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import { DataContext } from "../components/context/DataContext";
import "../css/styles/skeleton.css";

const ItemDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { selectedItemId, hotCollections, newItems } =
        useContext(DataContext);

    if (!selectedItemId) return <p>Please select an item to see details.</p>;

    // Combine arrays to find the chosen object by ID
    const allItems = [...hotCollections, ...newItems];
    const item = allItems.find((i) => i.nftId === selectedItemId);

    if (!item) return <p>Item not found.</p>;

    return (
        <div id="wrapper">
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>
                <section aria-label="section" className="mt90 sm-mt-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 text-center">
                                <img
                                    src={item.nftImage}
                                    className="img-fluid img-rounded mb-sm-30 nft-image"
                                    alt=""
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="item_info">
                                    <h2>{item.title}</h2>

                                    <div className="item_info_counts">
                                        <div className="item_info_views">
                                            <i className="fa fa-eye"></i>
                                            100
                                        </div>
                                        <div className="item_info_like">
                                            <i className="fa fa-heart"></i>
                                            {item.likes}
                                        </div>
                                    </div>
                                    <p>
                                        doloremque laudantium, totam rem
                                        aperiam, eaque ipsa quae ab illo
                                        inventore veritatis et quasi architecto
                                        beatae vitae dicta sunt explicabo.
                                    </p>
                                    <div className="d-flex flex-row">
                                        <div className="mr40">
                                            <h6>Owner</h6>
                                            <div className="item_author">
                                                <div className="author_list_pp">
                                                    <Link
                                                        to={`/author/${item.authorId}`}
                                                    >
                                                        <img
                                                            className="lazy"
                                                            src={
                                                                item.authorImage
                                                            }
                                                            alt=""
                                                        />
                                                        <i className="fa fa-check"></i>
                                                    </Link>
                                                </div>
                                                <div className="author_list_info">
                                                    <Link
                                                        to={`/author/${item.authorId}`}
                                                    >
                                                        Monica Lucas
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
                                                        to={`/author/${item.authorId}`}
                                                    >
                                                        <img
                                                            className="lazy"
                                                            src={
                                                                item.authorImage
                                                            }
                                                            alt=""
                                                        />
                                                        <i className="fa fa-check"></i>
                                                    </Link>
                                                </div>
                                                <div className="author_list_info">
                                                    <Link
                                                        to={`/author/${item.authorId}`}
                                                    >
                                                        Monica Lucas
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="spacer-40"></div>
                                        <h6>Price</h6>
                                        <div className="nft-item-price">
                                            <img src={EthImage} alt="" />
                                            <span>1.85</span>
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
