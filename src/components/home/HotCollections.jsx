import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Skeleton from '../UI/Skeleton'
import axios from 'axios'

const HotCollections = () => {
  const sliderRef = React.useRef(null)
  const [items, setItems] = useState([])
  const [dataIsLoaded, setDataIsLoaded] = useState(false)

  useEffect(() => {
    axios
      .get(
        'https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections'
      )
      .then(res => {
        setItems(res.data)
        setDataIsLoaded(true)
      })
      .catch(error => {
        console.error('Error fetching new items:', error)
      })
  }, [])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  if (!dataIsLoaded) {
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
    <section id='section-collections' className='no-bottom'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>Hot Collections</h2>
              <div className='small-border bg-color-2'></div>
            </div>
          </div>
        </div>
        <div className='slider-container'>
          <Slider {...settings} ref={sliderRef}>
            {items.map(item => (
              <div key={item.id}>
                <div className='nft_coll'>
                  <div className='nft_wrap'>
                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className='lazy img-fluid'
                        alt=''
                      />
                    </Link>
                  </div>
                  <div className='nft_coll_pp'>
                    <Link to='/author'>
                      <img
                        className='lazy pp-coll'
                        src={item.authorImage}
                        alt=''
                      />
                    </Link>
                    <i className='fa fa-check'></i>
                  </div>
                  <div className='nft_coll_info'>
                    <Link to='/explore'>
                      <h4>{item.title}</h4>
                    </Link>
                    <span>{`ERC-${item.code}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default HotCollections
