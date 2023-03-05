import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from '../UI/Skeleton';
import CountDown from './CountDown';

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
            new Array(4).fill(0).map((_, index) => (
              <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12' key={index}>
                <div className='nft__item'>
                  <div className='author_list_pp'>
                    <Link
                      to='/author'
                      data-bs-toggle='tooltip'
                      data-bs-placement='top'
                      title='Creator: Monica Lucas'
                    >
                      <Skeleton
                        height={'50px'}
                        width={'50px'}
                        borderRadius={'50%'}
                      />
                      <i className='fa fa-check'></i>
                    </Link>
                  </div>
                  <div className='de_countdown_skeleton'>
                    <Skeleton
                      height={'32px'}
                      width={'110px'}
                      borderRadius={'30px'}
                    />
                  </div>

                  <div className='nft__item_wrap'>
                    <div className='nft__item_extra'>
                      <div className='nft__item_buttons'>
                        <button>Buy Now</button>
                        <div className='nft__item_share'>
                          <h4>Share</h4>
                          <a href='' target='_blank' rel='noreferrer'>
                            <i className='fa fa-facebook fa-lg'></i>
                          </a>
                          <a href='' target='_blank' rel='noreferrer'>
                            <i className='fa fa-twitter fa-lg'></i>
                          </a>
                          <a href=''>
                            <i className='fa fa-envelope fa-lg'></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to='/item-details'>
                      <Skeleton
                        height={'219px'}
                        width={'219px'}
                        borderRadius={'8px'}
                      />
                    </Link>
                  </div>
                  <div className='nft__item_info'>
                    <Link to='/item-details'>
                      <h4>
                        <Skeleton height={'1rem'} width={'5rem'} />
                      </h4>
                    </Link>
                    <div className='nft__item_price'>
                      <Skeleton height={'1rem'} width={'3rem'} />
                    </div>
                    <div className='nft__item_like'>
                      <i className='fa fa-heart'></i>
                      <span>
                        <Skeleton height={'.75rem'} width={'1rem'} />
                      </span>
                    </div>
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
              {newItems.map((item, index) => (
                <div key={index}>
                  <div className='nft__item'>
                    <div className='author_list_pp'>
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle='tooltip'
                        data-bs-placement='top'
                        title='Creator: Monica Lucas'
                      >
                        <img className='lazy' src={item.authorImage} alt='' />
                        <i className='fa fa-check'></i>
                      </Link>
                    </div>
                    {item.expiryDate ? (
                      <CountDown expiryDate={item.expiryDate} />
                    ) : null}

                    <div className='nft__item_wrap'>
                      <div className='nft__item_extra'>
                        <div className='nft__item_buttons'>
                          <button>Buy Now</button>
                          <div className='nft__item_share'>
                            <h4>Share</h4>
                            <a href='' target='_blank' rel='noreferrer'>
                              <i className='fa fa-facebook fa-lg'></i>
                            </a>
                            <a href='' target='_blank' rel='noreferrer'>
                              <i className='fa fa-twitter fa-lg'></i>
                            </a>
                            <a href=''>
                              <i className='fa fa-envelope fa-lg'></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className='lazy nft__item_preview'
                          alt=''
                        />
                      </Link>
                    </div>
                    <div className='nft__item_info'>
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className='nft__item_price'>{item.price} ETH</div>
                      <div className='nft__item_like'>
                        <i className='fa fa-heart'></i>
                        <span>{item.likes}</span>
                      </div>
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

export default NewItems;

{
  /* const hours = Math.floor(
        (countDownTimer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (countDownTimer % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((countDownTimer % (1000 * 60)) / 1000);
      setFormattedTimer(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    console.log(formattedTimer); */
}
