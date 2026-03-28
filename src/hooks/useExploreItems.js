import { useState, useEffect } from 'react';
import { fetchExploreItems } from '../services/nftApi';


export const useExploreItems = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchExploreItems();
        setItems(data);
        setFilteredItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  const filterItems = (filterType) => {
    let sorted = [...items];
    
    switch(filterType) {
      case 'price_low_to_high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_high_to_low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'likes_high_to_low':
        sorted.sort((a, b) => b.likes - a.likes);
        break;
      default:
        sorted = items;
    }
    
    setFilteredItems(sorted);
    setVisibleCount(8); // Reset to show first 8 items
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return { 
    items: filteredItems.slice(0, visibleCount),
    loading, 
    error,
    filterItems,
    loadMore,
    hasMore: visibleCount < filteredItems.length
  };
};








































