import {useState, useEffect } from 'react';
import { fetchNewItems } from '../services/nftApi';

export const useNewItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadItems = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchNewItems();
                setItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadItems();
    }, []);

    return { items, loading, error };
};