import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Card from "../UI/Card";
import axios from "axios";

const ExploreItems = () => {
    const [data, setData] = useState([])
    const [maxIndex, setMaxIndex] = useState(8)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            setData([])
            const response = await axios.get(
                `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${filter ? `?filter=${filter}` : ''}`
            )
            setData(response.data)
        }
        fetchData()
    }, [filter])

    const showMore = () => {
        if (maxIndex < data.length) setMaxIndex(prev => prev + 4)
    }

    return (
        <>
            <div>
                <select id="filter-items" defaultValue="" onChange={e => setFilter(e.target.value)}>
                    <option value="">Default</option>
                    <option value="price_low_to_high">Price, Low to High</option>
                    <option value="price_high_to_low">Price, High to Low</option>
                    <option value="likes_high_to_low">Most liked</option>
                </select>
            </div>
            {data.slice(0, maxIndex).map(item => (
                <div
                    key={item.id}
                    className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    style={{display: "block", backgroundSize: "cover"}}
                >
                    <Card
                        expiryDate={item.expiryDate}
                        authorId={item.authorId}
                        authorImage={item.authorImage}
                        nftId={item.nftId}
                        nftImage={item.nftImage}
                        title={item.title}
                        price={item.price}
                        likes={item.likes}
                    />
                </div>
            ))}
            {data.length === 0 && Array.from({length: 8}).map((_, idx) => (
                <div
                    key={idx}
                    className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    style={{display: "block", backgroundSize: "cover"}}
                >
                    <Card skeleton/>
                </div>
            ))}
            <div className="col-md-12 text-center">
                {maxIndex < data.length && (
                    <Link to="" id="loadmore" className="btn-main lead" onClick={showMore}>
                        Load more
                    </Link>
                )}
            </div>
        </>
    );
};

export default ExploreItems;
