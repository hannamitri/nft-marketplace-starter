import React from 'react'

const LandingIntroCard = ({ icon, title, description, bgImage }) => {
  return (
    <div className="col-lg-4 col-md-6 mb-sm-30">
        <div className="feature-box f-boxed style-3">
            <i 
                data-aos="fade-up" 
                data-aos-duration="500"
                data-aos-offset="10" 
                className={icon} >
            </i>
            <div className="text">
                <h4 
                    data-aos="fade-in" 
                    data-aos-delay="50" 
                    className="">
                        {title}
                </h4>
                <p 
                    data-aos="fade-up" 
                    data-aos-duration="750" 
                    data-aos-offset="-110" >
                        {description}
                </p>
            </div>
            <i className={bgImage}></i>
        </div>
    </div>
  )
}

export default LandingIntroCard