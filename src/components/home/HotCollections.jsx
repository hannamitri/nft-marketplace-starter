import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HotCollections = () => {
  const [collections, setCollections] = useState();

  useEffect(() => {
    const fetchCollection = async () => {
      const response = await fetch(
        'https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections'
      ).then((response) => response.json());
      setCollections(response);
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
          {collections ? (
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
              }}
            >
              {collections.map((collection, index) => (
                <div className='item' key={index}>
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
          ) : (
            console.log('loading')
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
