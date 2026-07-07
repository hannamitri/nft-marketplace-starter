import React from 'react'
import NFT from '../../images/nft.png'
import backgroundImage from '../../images/bg-shape-1.jpg'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <section
      id='section-hero'
      aria-label='section'
      className='no-top no-bottom vh-100'
      data-bgimage='url(images/bg-shape-1.jpg) bottom'
      style={{ background: `url(${backgroundImage}) bottom / cover` }}
    >
      <div className='v-center'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-6'>
              <div className='spacer-single'></div>
              <h6
                data-aos='fade-Up'
                className='wow fadeInUp'
                data-wow-delay='.5s'
                style={{ visibility: 'visible', animationDelay: '0.5s' }}
              >
                <span className='text-uppercase id-color-2'>Ultraverse Market</span>
              </h6>
              <div className='spacer-10'></div>
              <h1
                data-aos='fade-in'
                className='wow fadeInUp'
                data-wow-delay='.75s'
                style={{ visibility: 'visible', animationDelay: '0.75s' }}
              >
                Create, sell or collect digital items.
              </h1>
              <p
                data-aos='fade-Up'
                className='wow fadeInUp lead'
                data-wow-delay='1s'
                style={{ visibility: 'visible', animationDelay: '1s' }}
              >
                Unit of data stored on a digital ledger, called a blockchain,
                that certifies a digital asset to be unique and therefore not
                interchangeable
              </p>
              <div className='spacer-10'></div>
              <Link
                className='btn-main wow fadeInUp lead'
                data-wow-delay='1.25s'
                to='/explore'
                style={{ visibility: 'visible', animationDelay: '1.25s' }}
                data-aos='fade-Up'
              >
                Explore
              </Link>
              <div className='mb-sm-30'></div>
            </div>
            <div className='col-md-6 xs-hide'>
              <img
                data-aos='fade'
                src={NFT}
                className='lazy img-fluid wow fadeIn'
                data-wow-delay='1.25s'
                alt=''
                style={{ visibility: 'visible', animationDelay: '1.25s' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
