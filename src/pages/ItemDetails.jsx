import React, { useEffect, useState } from 'react';
import EthImage from '../images/ethereum.svg';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from '../components/UI/Skeleton';

const ItemDetails = () => {
  const { itemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      const response = await axios(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`
      ).then((response) => response.data);
      setItem(response);
      setLoading(false);
    };
    fetchItem();
  }, [itemId]);

  console.log(item);

  return (
    <div id='wrapper'>
      <div className='no-bottom no-top' id='content'>
        <div id='top'></div>
        <section aria-label='section' className='mt90 sm-mt-0'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6 text-center'>
                {loading ? (
                  <Skeleton
                    height={'100%'}
                    width={'100%'}
                    borderRadius={'3px'}
                  />
                ) : (
                  <img
                    src={item.nftImage}
                    className='img-fluid img-rounded mb-sm-30 nft-image'
                    alt=''
                  />
                )}
              </div>
              <div className='col-md-6'>
                <div className='item_info'>
                  {loading ? (
                    <Skeleton height={'2.5rem'} width={'20rem'} />
                  ) : (
                    <h2>
                      {item.title} #{item.tag}
                    </h2>
                  )}
                  <div className='item_info_counts'>
                    {loading ? (
                      <Skeleton
                        height={'30px'}
                        width={'80px'}
                        borderRadius={'3px'}
                      />
                    ) : (
                      <div className='item_info_views'>
                        <i className='fa fa-eye'></i>
                        100
                      </div>
                    )}
                    {loading ? (
                      <Skeleton
                        height={'30px'}
                        width={'80px'}
                        borderRadius={'3px'}
                      />
                    ) : (
                      <div className='item_info_like'>
                        <i className='fa fa-heart'></i>
                        74
                      </div>
                    )}
                  </div>
                  {loading ? (
                    <Skeleton height={'80px'} width={'100%'} />
                  ) : (
                    <p>{item.description}</p>
                  )}
                  <div className='d-flex flex-row'>
                    <div className='mr40'>
                      <h6>Owner</h6>
                      <div className='item_author'>
                        <div className='author_list_pp'>
                          {loading ? (
                            <Skeleton
                              height={'50px'}
                              width={'50px'}
                              borderRadius={'50%'}
                            />
                          ) : (
                            <Link to={`/author/${item.ownerId}`}>
                              <img
                                className='lazy'
                                src={item.ownerImage}
                                alt=''
                              />
                              <i className='fa fa-check'></i>
                            </Link>
                          )}
                        </div>
                        <div className='author_list_info'>
                          {loading ? (
                            <Skeleton height={'1rem'} width={'5rem'} />
                          ) : (
                            <Link to={`/author/${item.ownerId}`}>
                              {item.ownerName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className='de_tab tab_simple'>
                    <div className='de_tab_content'>
                      <h6>Creator</h6>
                      <div className='item_author'>
                        <div className='author_list_pp'>
                          {loading ? (
                            <Skeleton
                              height={'50px'}
                              width={'50px'}
                              borderRadius={'50%'}
                            />
                          ) : (
                            <Link to={`/author/${item.creatorId}`}>
                              <img
                                className='lazy'
                                src={item.creatorImage}
                                alt=''
                              />
                              <i className='fa fa-check'></i>
                            </Link>
                          )}
                        </div>
                        <div className='author_list_info'>
                          {loading ? (
                            <Skeleton height={'1rem'} width={'5rem'} />
                          ) : (
                            <Link to={`/author/${item.creatorId}`}>
                              {item.creatorName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='spacer-40'></div>
                    <h6>Price</h6>
                    <div className='nft-item-price'>
                      <img src={EthImage} alt='' />
                      {loading ? (
                        <Skeleton height={'1rem'} width={'3rem'} />
                      ) : (
                        <span>{item.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
