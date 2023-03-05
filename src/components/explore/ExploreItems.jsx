import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../re-useable/Cards';
import SkeletonCards from '../re-useable/SkeletonCards';

const ExploreItems = () => {
  const [loading, setLoading] = useState(true);
  const [exploreItems, setExploreItems] = useState([]);

  useEffect(() => {
    const fetchExploreItems = async () => {
      const response = await axios(
        'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore'
      ).then((response) => response.data);
      setExploreItems(response);
      setLoading(false);
    };
    fetchExploreItems();
  }, []);

  const handleSelectChange = async (filter) => {
    setLoading(true);
    const response = await axios(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    ).then((response) => response.data);
    setExploreItems(response);
    setLoading(false);
  };

  return (
    <>
      <div>
        <select
          id='filter-items'
          defaultValue=''
          onChange={(e) => handleSelectChange(e.target.value)}
        >
          <option value=''>Default</option>
          <option value='price_low_to_high'>Price, Low to High</option>
          <option value='price_high_to_low'>Price, High to Low</option>
          <option value='likes_high_to_low'>Most liked</option>
        </select>
      </div>
      {loading ? (
        <SkeletonCards itemsAmount={8} />
      ) : (
        <Cards items={exploreItems} cardType='explore' />
      )}
      <div className='col-md-12 text-center'>
        <Link to='' id='loadmore' className='btn-main lead'>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
