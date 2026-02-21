import { useEffect, useState } from 'react';
import { fetchHotCollections } from '../services/nftApi';


export const useHotCollections = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCollections = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchHotCollections();
                setCollections(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }

        };
        loadCollections();
    }, []);

    return { collections, loading, error };
};