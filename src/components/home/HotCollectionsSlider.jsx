import React, { useEffect, useState } from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' // import from 'keen-slider/react.es' for to get an ES module
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import SkeletonSlide from './SkeletonSlide.jsx'

export default ({ users }) => {
    const [loading, setLoading] = useState(true)

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
        perView: 4,
        spacing: 10,
    },

    breakpoints: {
        "(max-width: 978px)": {
            slides: {
                perView: 3,
            }
        },


        "(max-width: 768px)": {
            slides: {
                perView: 2,
            }
        },

        "(max-width: 575px)": {
            slides: {
                perView: 1,
            }
        }
    }
  })

  useEffect(() => {
    instanceRef.current?.update();
  }, [users, instanceRef]);

  useEffect(() => {
    instanceRef.current?.update();
  }, [loading, users])

  useEffect(() => {
    if (users?.length > 0) {
        setLoading(false)
    }
  }, [users])


  return (
    <div className='slider-wrapper'>
        <button className='arrow arrow-left' onClick={() => instanceRef.current?.prev()}>
        <FontAwesomeIcon icon={faChevronLeft} />
        </button>
    <div ref={sliderRef} className='keen-slider'>
        {loading ? Array.from({ length: 4 }).map((_, index) => {
           return <SkeletonSlide key={index} />
        }): users.map((user) => (
                <div className="keen-slider__slide " key={user.nftId}>
                  <div className="nft_coll">
                    <div className="nft_wrap ">
                      <Link to={`/item-details/${user.nftId}`}>
                        <img src={user.nftImage} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${user.authorId}`}>
                        <img className="lazy pp-coll" src={user.authorImage} alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{user.title}</h4>
                      </Link>
                      <span>{user.code}</span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <button className='arrow arrow-right' onClick={() => instanceRef.current?.next()}>
            <FontAwesomeIcon icon={faChevronRight} />
        </button>
        </div>
    // <div ref={sliderRef} className="keen-slider">
    //   <div className="keen-slider__slide">1</div>
    //   <div className="keen-slider__slide">2</div>
    //   <div className="keen-slider__slide">3</div>
    // </div>
  )
}