import React, { useState, useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [detailItems, setDetailItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const webId = useParams();

  useEffect(() => {
    const fetchDetailItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${webId.id}`,
        );
        if (response.data) {
          setDetailItems(response.data);
        } else {
          setDetailItems([]);
        }
      } catch (error) {
        console.error("Error fetching Author items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetailItems();
  }, [webId.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id='wrapper'>
      <div className='no-bottom no-top' id='content'>
        <div id='top'></div>
        <section aria-label='section' className='mt90 sm-mt-0'>
          <div className='container'>
            {loading ? (
              <>
                <div className='row'>
                  <div className='col-md-6 text-center'>
                    <Skeleton width='100%' height='100%'/>
                  </div>
                  <div className='col-md-6'>
                    <div className='item_info'>
                      <Skeleton width='100%' height='30px'/>

                      <div className='item_info_counts'>
                        <div className='item_info_views'>
                          <i className='fa fa-eye'></i>
                          <Skeleton width='100%' height='50%'/>
                        </div>
                        <div className='item_info_like'>
                          <i className='fa fa-heart'></i>
                          <Skeleton width='100%' height='50%'/>
                        </div>
                      </div>
                      <Skeleton width='100%' height='100px'/>
                      <div className='d-flex flex-row'>
                        <div className='mr40'>
                          <h6>Owner</h6>
                          <div className='item_author'>
                            <div className='author_list_pp'>
                              <Link to="/author/">
                                <Skeleton width='50px' height='50px' borderRadius='50%' />
                                <i className='fa fa-check'></i>
                              </Link>
                            </div>
                            <div className='author_list_info'>
                              <Link to="/author/">
                                <Skeleton width='150px' height='25px' />
                              </Link>
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
                              <Link to="/author/">
                                <Skeleton width='50px' height='50px' borderRadius='50%' />
                                <i className='fa fa-check'></i>
                              </Link>
                            </div>
                            <div className='author_list_info'>
                              <Link to="/author/">
                                <Skeleton width='150px' height='25px' />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className='spacer-40'></div>
                        <h6>Price</h6>
                        <div className='nft-item-price'>
                          <img src={EthImage} alt='' />
                          <Skeleton width='50px' height='25px' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className='row'>
                <div className='col-md-6 text-center'>
                  <img
                    src={detailItems.nftImage}
                    className='img-fluid img-rounded mb-sm-30 nft-image'
                    alt=''
                  />
                </div>
                <div className='col-md-6'>
                  <div className='item_info'>
                    <h2>{detailItems.title}</h2>

                    <div className='item_info_counts'>
                      <div className='item_info_views'>
                        <i className='fa fa-eye'></i>
                        {detailItems.views}
                      </div>
                      <div className='item_info_like'>
                        <i className='fa fa-heart'></i>
                        {detailItems.likes}
                      </div>
                    </div>
                    <p>{detailItems.description}</p>
                    <div className='d-flex flex-row'>
                      <div className='mr40'>
                        <h6>Owner</h6>
                        <div className='item_author'>
                          <div className='author_list_pp'>
                            <Link to={`/author/${detailItems.ownerId}`}>
                              <img
                                className='lazy'
                                src={detailItems.ownerImage}
                                alt=''
                              />
                              <i className='fa fa-check'></i>
                            </Link>
                          </div>
                          <div className='author_list_info'>
                            <Link to={`/author/${detailItems.ownerId}`}>
                              {detailItems.ownerName}
                            </Link>
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
                            <Link to={`/author/${detailItems.creatorId}`}>
                              <img
                                className='lazy'
                                src={detailItems.creatorImage}
                                alt=''
                              />
                              <i className='fa fa-check'></i>
                            </Link>
                          </div>
                          <div className='author_list_info'>
                            <Link to={`/author/${detailItems.creatorId}`}>
                              {detailItems.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className='spacer-40'></div>
                      <h6>Price</h6>
                      <div className='nft-item-price'>
                        <img src={EthImage} alt='' />
                        <span>{detailItems.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
