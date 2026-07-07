import React from 'react'

const LandingIntro = () => {
  return (
    <section id='section-intro' className='no-top no-bottom'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 col-md-6 mb-sm-30'>
            <div className='feature-box f-boxed style-3'>
              <i
                className='wow fadeInUp bg-color-2 i-boxed icon_wallet'
                style={{ visibility: 'visible', animationDelay: '1.25s' }}
                data-aos='fade-Up'
              ></i>
              <div className='text'>
                <h4
                  className='wow fadeInUp'
                  data-aos='fade-Up'
                  style={{ visibility: 'visible', animationDelay: '1.25s' }}
                >
                  Set up your wallet
                </h4>
                <p
                  className='wow fadeInUp'
                  data-aos='fade-Up'
                  style={{ visibility: 'visible', animationDelay: '0.25s' }}
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem. lorem
                </p>
              </div>
              <i className='wm icon_wallet'></i>
            </div>
          </div>
          <div className='col-lg-4 col-md-6 mb-sm-30'>
            <div className='feature-box f-boxed style-3'>
              <i
                className='wow fadeInUp bg-color-2 i-boxed icon_wallet'
                style={{ visibility: 'visible', animationDelay: '1.25s' }}
                data-aos='fade-Up'
              ></i>
              <div className='text'>
                <h4
                  className='wow fadeInUp'
                  data-aos='fade-Up'
                  style={{ visibility: 'visible', animationDelay: '1.25s' }}
                >
                  Add your NFT's
                </h4>
                <p
                  className='wow fadeInUp'
                  data-aos='fade-Up'
                  style={{ visibility: 'visible', animationDelay: '0.25s' }}
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem. lorem
                </p>
              </div>
              <i className='wm icon_cloud-upload_alt'></i>
            </div>
          </div>
          <div className='col-lg-4 col-md-6 mb-sm-30'>
            <div className='feature-box f-boxed style-3'>
              <i
                className='wow fadeInUp bg-color-2 i-boxed icon_wallet'
                style={{ visibility: 'visible', animationDelay: '1.25s' }}
                data-aos='fade-Up'
              ></i>
              <div className='text'>
                <h4
                  className='wow fadeInUp'
                  data-aos='fade-Up'
                  style={{ visibility: 'visible', animationDelay: '1.25s' }}
                >
                  Sell your NFT's
                </h4>
                <p
                  className='wow fadeInUp'
                  data-aos='fade-Up'
                  style={{ visibility: 'visible', animationDelay: '0.25s' }}
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem. lorem
                </p>
              </div>
              <i className='wm icon_tags_alt'></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingIntro
