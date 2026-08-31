import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [hotCollections, setHotCollections] = useState([]);
    const [newItems, setNewItems] = useState([]);
    const [topSellers, setTopSellers] = useState([]);
    const [explore, setExplore] = useState([]);
    const [sortOption, setSortOption] = useState("");
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 3000));
                const [hotRes, newRes, topRes, expRes] = await Promise.all([
                    axios.get(
                        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
                    ),
                    axios.get(
                        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
                    ),
                    axios.get(
                        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
                    ),
                    axios.get(
                        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${sortOption}`,
                    ),
                ]);
                setHotCollections(hotRes.data);
                setNewItems(newRes.data);
                setTopSellers(topRes.data);
                setExplore(expRes.data);
            } catch (err) {
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sortOption]);

    return (
        <DataContext.Provider
            value={{
                hotCollections,
                newItems,
                topSellers,
                explore,
                sortOption,
                setSortOption,
                selectedItemId,
                setSelectedItemId,
                loading,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
