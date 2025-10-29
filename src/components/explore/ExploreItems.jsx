import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../css/styles/HotCollection.css';
import NewItemCard, { NewItemCardSkeleton } from '../home/NewItemCard';

const ExploreItems = () => {
    const [allItemData, setAllItemData] = useState([]);
    const [displayedItems, setDisplayedItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState(8);
    const [loading, setLoading] = useState(true);
    const [filterValue, setFilterValue] = useState("");
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const BASE_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
    
    
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
        const fetchPromise = async () => {
            
            const url = filterValue
            ? `${BASE_URL}?filter=${filterValue}`
            : BASE_URL;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
                return response.json();
        };

        const delayPromise = new Promise(resolve => setTimeout(resolve, 1500)); 
            try {
                const dataResult = await fetchPromise();
                await delayPromise; 
                setAllItemData(dataResult);
                const initialVisibleCount = 8;
                setVisibleItems(initialVisibleCount);
                setDisplayedItems(dataResult.slice(0, initialVisibleCount));
               

            } catch (error) {
                console.error("Error fetching data:", error);
                setAllItemData([]); 
                setDisplayedItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [filterValue]);
    
    useEffect(() => {
        setDisplayedItems(allItemData.slice(0, visibleItems));
    }, [allItemData, visibleItems]);

    
    const loadMore = () => {
    setIsLoadingMore(true);
    const nextVisibleItems = Math.min(visibleItems + 4, 16);
    setTimeout(() => {
        setVisibleItems(nextVisibleItems);
        setIsLoadingMore(false);
    }, 500); 

};
    
    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    const FilterDropdown = ({ value, onChange }) => (
        <select id="filter-items" value={value} onChange={onChange}>
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
        </select>
    );
    
    


    return (
        <>
            <div className="row">
                <div className="col-12 mb-4">
                    <FilterDropdown value={filterValue} onChange={handleFilterChange} />
                </div>
            </div>
           
            <div className="row">
                {loading ? (
                    new Array(8).fill(0).map((_, index) => (
                        <NewItemCardSkeleton
                            key={index}
                            className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                        />
                    ))
                ) : (
                   new Array(Math.min(allItemData.length, 16)).fill(0).map((_, index) => {
                        const isVisible = index < visibleItems;
                        const isNewSpotLoading = index >= displayedItems.length && isLoadingMore;

                        if (isNewSpotLoading) {
                            return (
                                <NewItemCardSkeleton
                                    key={index}
                                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                />
                            );
                        } else if (isVisible && displayedItems[index]) {
                                return (
                                <NewItemCard
                                    key={index} 
                                    itemData={displayedItems[index]}
                                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12" 
                                />
                            );
                        }
                        return null;
                    })
                )}
            </div>

            <div className="row">
                {visibleItems < allItemData.length && visibleItems < 16 && !isLoadingMore && (
                    <div className="col-md-12 text-center">
                        <Link to="#" id="loadmore" className="btn-main lead" onClick={loadMore}>
                            Load more
                        </Link>
                    </div>
                )}
                
            </div>
        </>
    );
};

export default ExploreItems;