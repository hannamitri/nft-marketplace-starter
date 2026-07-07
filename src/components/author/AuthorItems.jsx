import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Skeleton from '../UI/Skeleton'

const AuthorItems = () => {
  const { authorId } = useParams()
  const [items, setItems] = useState([])
  const [authorImage, setAuthorImage] = useState('')
  const [dataIsLoaded, setDataIsLoaded] = useState(false)

  useEffect(() => {
    axios
      .get(
        'https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=' +
          authorId
      )
      .then(res => {
        setAuthorImage(res.data.authorImage)
        setItems(res.data.nftCollection || [])
        setDataIsLoaded(true)
      })
  }, [authorId])

  if (!dataIsLoaded) {
    return (
      <section id='section-collections' className='no-bottom'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='text-center'>
                <h2>New Items</h2>
                <div className='small-border bg-color-2'></div>
              </div>
            </div>
          </div>
          <div className='slider-container'>
            <div className='skeleton-slider'>
              {new Array(4).fill(0).map((_, index) => (
                <div key={index} className='skeleton-item'>
                  <Skeleton width='100%' height='250px' borderRadius='10px' />
                  <div style={{ marginTop: '15px' }}>
                    <Skeleton width='70%' height='20px' borderRadius='5px' />
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <Skeleton width='50%' height='18px' borderRadius='5px' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className='de_tab_content'>
      <div className='tab-1'>
        <div className='row'>
          {items.map((item, index) => (
            <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12' key={index}>
              <div className='nft__item'>
                <div className='author_list_pp'>
                  <Link to=''>
                    <img className='lazy' src={authorImage} alt='' />
                    <i className='fa fa-check'></i>
                  </Link>
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
        </div>
      </div>
    </div>
  )
}

export default AuthorItems
