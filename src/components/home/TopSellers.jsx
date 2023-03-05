import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '../UI/Skeleton';

const TopSellers = () => {
  const [loading, setLoading] = useState(true);
  const [topSellers, setTopSellers] = useState([]);

  useEffect(() => {
    const fetchTopSellers = async () => {
      const response = await fetch(
        'https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers'
      ).then((response) => response.json());
      setTopSellers(response);
      setLoading(false);
    };
    fetchTopSellers();
  }, []);

  console.log(topSellers);

  return (
    <section id='section-popular' className='pb-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>Top Sellers</h2>
              <div className='small-border bg-color-2'></div>
            </div>
          </div>
          <div className='col-md-12'>
            <ol className='author_list'>
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className='author_list_pp'>
                        <Skeleton
                          height={'50px'}
                          width={'50px'}
                          borderRadius={'50%'}
                        />
                      </div>
                      <div className='author_list_info'>
                        <Skeleton height={'1rem'} width={'6rem'} />
                        <span>
                          <Skeleton height={'1rem'} width={'3rem'} />
                        </span>
                      </div>
                    </li>
                  ))
                : topSellers.map((seller, index) => (
                    <li key={index}>
                      <div className='author_list_pp'>
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className='lazy pp-author'
                            src={seller.authorImage}
                            alt=''
                          />
                          <i className='fa fa-check'></i>
                        </Link>
                      </div>
                      <div className='author_list_info'>
                        <Link to={`/author/${seller.authorId}`}>
                          {seller.authorName}
                        </Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
