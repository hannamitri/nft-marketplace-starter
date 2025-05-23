import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Timer from "../UI/Timer";
import NewItemsSkeleton from "../UI/NewItemsSkeleton";

const ExploreItems = () => {
    const [isLoading, setLoading] = useState(true)
    const [exploreHTML, setExploreHTML] = useState([])
    const [visibleCount, setVisibleCount] = useState(8)
    const [selectedFilter, setSelectedFilter] = useState("")

    useEffect(() => {
        async function renderExplore() {
            try {
                const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${selectedFilter}`)
                setExploreHTML(data)
            } catch (error) {
                console.log("Error fetching renderExplore", error)
            } finally {
                setLoading(false)
            }
        }
        renderExplore()
    }, [selectedFilter])

    const loadMoreItems = () => {
        setVisibleCount(prevCount => prevCount + 4)
    }

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value)
        setLoading(true)
    }

    return (
        <>
            <div>
                <select id="filter-items" onChange={handleFilterChange} defaultValue="">
                    <option value="">Default</option>
                    <option value="price_low_to_high">Price, Low to High</option>
                    <option value="price_high_to_low">Price, High to Low</option>
                    <option value="likes_high_to_low">Most liked</option>
                </select>
            </div>

            {isLoading ? (

                <NewItemsSkeleton/>

            ) : (
                    exploreHTML.slice(0, visibleCount).map((data) => (
                        <div
                            key={data.id}
                            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                            style={{display: "block", backgroundSize: "cover"}}
                        >
                            <div className="nft__item">
                                <div className="author_list_pp">
                                    <Link
                                        to={`/author/${data.authorId}`}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                    >
                                        <img className="lazy" src={data.authorImage} alt=""/>
                                        <i className="fa fa-check"></i>
                                    </Link>
                                </div>

                                {data.expiryDate && (
                                    <div className="de_countdown"><Timer duration={data.expiryDate}/></div>
                                )}

                                <div className="nft__item_wrap">
                                    <div className="nft__item_extra">
                                        <div className="nft__item_buttons">
                                            <button>Buy Now</button>
                                            <div className="nft__item_share">
                                                <h4>Share</h4>
                                                <a href="" target="_blank" rel="noreferrer">
                                                    <i className="fa fa-facebook fa-lg"></i>
                                                </a>
                                                <a href="" target="_blank" rel="noreferrer">
                                                    <i className="fa fa-twitter fa-lg"></i>
                                                </a>
                                                <a href="">
                                                    <i className="fa fa-envelope fa-lg"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to={`/item-details/${data.nftId}`}>
                                        <img src={data.nftImage} className="lazy nft__item_preview" alt=""/>
                                    </Link>
                                </div>
                                <div className="nft__item_info">
                                    <Link to="/item-details">
                                        <h4>{data.title}</h4>
                                    </Link>
                                    <div className="nft__item_price">{data.price} ETH</div>
                                    <div className="nft__item_like">
                                        <i className="fa fa-heart"></i>
                                        <span>{data.likes}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
            )}

            <div className="col-md-12 text-center">
                <button onClick={loadMoreItems} id="loadmore" className="btn-main lead">
                    Load more
                </button>
            </div>
        </>
    );
};

export default ExploreItems;
