import { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Cards from '../re-useable/Cards';
import SkeletonCards from '../re-useable/SkeletonCards';

const NewItems = () => {
  const [loading, setLoading] = useState(true);
  const [newItems, setNewItems] = useState([]);

  useEffect(() => {
    const fetchNewItems = async () => {
      const response = await fetch(
        'https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems'
      ).then((response) => response.json());
      setNewItems(response);
      setLoading(false);
    };
    fetchNewItems();
  }, []);

  return (
    <section id='section-items' className='no-bottom'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>New Items</h2>
              <div className='small-border bg-color-2'></div>
            </div>
          </div>
          {loading ? (
            <SkeletonCards itemsAmount={4} />
          ) : (
            <OwlCarousel
              className='owl-theme'
              items={1}
              nav
              loop
              dots={false}
              margin={24}
              responsive={{
                576: {
                  items: 2,
                },
                992: {
                  items: 3,
                },
                1200: {
                  items: 4,
                },
              }}
            >
              <Cards items={newItems} />
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
