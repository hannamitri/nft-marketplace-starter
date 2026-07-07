import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Skeleton from '../UI/Skeleton'
import axios from 'axios'

const TopSellers = () => {
  const [items, setItems] = useState([])
  const [dataIsLoaded, setDataIsLoaded] = useState(false)

  useEffect(() => {
    axios
      .get(
        'https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers'
      )
      .then(res => {
        setItems(res.data)
        setDataIsLoaded(true)
      })
      .catch(error => {
        console.error('Error fetching new items:', error)
      })
  }, [])

  if (!dataIsLoaded) {
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
                {new Array(12).fill(0).map((_, index) => (
                  <li key={index} className='skeleton-author-item'>
                    <div className='author_list_pp skeleton-avatar'>
                      <Skeleton width='50px' height='50px' borderRadius='50%' />
                    </div>
                    <div className='author_list_info'>
                      <Skeleton
                        width='150px'
                        height='18px'
                        borderRadius='5px'
                        style={{ marginBottom: '8px' }}
                      />
                      <Skeleton
                        width='100px'
                        height='16px'
                        borderRadius='5px'
                      />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id='section-popular' className='pb-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2
                className='wow fadeInUp'
                data-aos='fade-Up'
                style={{ visibility: 'visible', animationDelay: '1s' }}
              >
                Top Sellers
              </h2>
              <div className='small-border bg-color-2'></div>
            </div>
          </div>
          <div className='col-md-12'>
            <ol className='author_list'>
              {items.map(item => (
                <li key={item.id}>
                  <div className='author_list_pp'>
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className='lazy pp-author'
                        src={item.authorImage}
                        alt=''
                      />
                      <i className='fa fa-check'></i>
                    </Link>
                  </div>
                  <div className='author_list_info'>
                    <Link to={`/author/${item.authorId}`}>
                      {item.authorName}
                    </Link>
                    <span>{item.totalVolume} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopSellers
