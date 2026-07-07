import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Timer from '../UI/Timer'
import Skeleton from '../UI/Skeleton'

const ExploreItems = () => {
  const [items, setItems] = useState([])
  const [dataIsLoaded, setDataIsLoaded] = useState(false)
  const [visibleCount, setVisibleCount] = useState(8)
  const [filterValue, setFilterValue] = useState('')

  const getFilterUrl = () => {
    const baseUrl =
      'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?'

    if (filterValue !== 'Default') {
      return baseUrl + `filter=${filterValue}`
    }
    return baseUrl
  }

  useEffect(() => {
    const url = getFilterUrl()
    axios
      .get(url)
      .then(res => {
        setItems(res.data)
        setDataIsLoaded(true)
      })
      .catch(error => {
        console.error('error', error)
      })
  }, [filterValue])

  const loadMore = event => {
    event.preventDefault()
    setVisibleCount(prevCount => Math.min(prevCount + 4, items.length))
  }

  const displayedItems = items.slice(0, visibleCount)

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
    <>
      <div>
        <select
          id='filter-items'
          value={filterValue}
          onChange={e => {
            setFilterValue(e.target.value)
          }}
        >
          <option value='Default'>Default</option>
          <option value='price_low_to_high'>Price, Low to High</option>
          <option value='price_high_to_low'>Price, High to Low</option>
          <option value='likes_high_to_low'>Most liked</option>
        </select>
      </div>
      {displayedItems.map(item => (
        <div
          key={item.id}
          className='d-item col-lg-3 col-md-6 col-sm-6 col-xs-12'
          style={{ display: 'block', backgroundSize: 'cover' }}
        >
          <div className='nft__item'>
            <div className='author_list_pp'>
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle='tooltip'
                data-bs-placement='top'
              >
                <img className='lazy' src={item.authorImage} alt='' />
                <i className='fa fa-check'></i>
              </Link>
            </div>
            <Timer expiryDate={item.expiryDate} />
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
      {visibleCount < items.length && (
        <div className='col-md-12 text-center'>
          <Link
            to='#'
            onClick={loadMore}
            id='loadmore'
            className='btn-main lead'
          >
            Load more
          </Link>
        </div>
      )}
    </>
  )
}

export default ExploreItems
