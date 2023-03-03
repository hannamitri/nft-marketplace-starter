import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from '../UI/Skeleton';

const HotCollections = () => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollection = async () => {
      const response = await fetch(
        'https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections'
      ).then((response) => response.json());
      setCollections(response);
      setLoading(false);
    };
    fetchCollection();
  }, []);

  return (
    <section id='section-collections' className='no-bottom'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>Hot Collections</h2>
              <div className='small-border bg-color-2'></div>
            </div>
          </div>
          {loading ? (
            new Array(4).fill(0).map((_, index) => (
              <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12' key={index}>
                <div className='nft_coll'>
                  <div className='nft_wrap'>
                    <Link to='/item-details'>
                      <Skeleton height='100%' width='100%' />
                    </Link>
                  </div>
                  <div className='nft_coll_pp'>
                    <Link to='/author'>
                      <Skeleton
                        height='60px'
                        width='60px'
                        borderRadius='50%'
                        border='solid 5px #ffffff'
                      />
                    </Link>
                    <i className='fa fa-check'></i>
                  </div>
                  <div className='nft_coll_info'>
                    <Link to='/explore'>
                      <h4>
                        <Skeleton height='1rem' width='6rem' />
                      </h4>
                    </Link>
                    <span>
                      <Skeleton height='1rem' width='3rem' />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <OwlCarousel
              className='owl-theme'
              items={1}
              nav
              loop
              dots={false}
              margin={16}
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
              {collections.map((collection, index) => (
                <div key={index}>
                  <div className='nft_coll'>
                    <div className='nft_wrap'>
                      <Link to='/item-details'>
                        <img
                          src={collection.nftImage}
                          className='lazy img-fluid'
                          alt=''
                        />
                      </Link>
                    </div>
                    <div className='nft_coll_pp'>
                      <Link to='/author'>
                        <img
                          className='lazy pp-coll'
                          src={collection.authorImage}
                          alt=''
                        />
                      </Link>
                      <i className='fa fa-check'></i>
                    </div>
                    <div className='nft_coll_info'>
                      <Link to='/explore'>
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
