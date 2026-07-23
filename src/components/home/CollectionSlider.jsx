import React, { useRef } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/carousel-arrows.css";

const CollectionSlider = ({array}) => {

    let sliderRef = useRef(null);
    const next = () => sliderRef.slickNext();
    const previous = () => sliderRef.slickPrev();

    let st = {width: "40px", height: "40px", background: "white" , 
              opacity: ".75", zIndex: "2", display: "grid", 
              placeItems: "center", color:"black", 
              border: "2px solid lightgray", borderRadius: "40px"};

    function PrevArrow(props) {
        const {className} = props;
        return (
            <div 
                className={className}
                style={{...st, left: "0"}}
                onClick={previous}                
            />
        )
    }

    function NextArrow(props) {
        const {className, style} = props;
        return (
            <div 
                className={className}
                style={{...st, right: "0"}}
                onClick={next}
            />
        )
    }

    var settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 991.33,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 575.33,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

  return (
    <Slider ref={slider => sliderRef=slider} {...settings}>
        {array?
            array.map((collection) => (
                <div className='slide__wrap' key={collection.id}>
                    <div className="nft_coll">
                        <div className="nft_wrap">
                            <Link to="/item-details">
                            <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                            </Link>
                        </div>
                        <div className="nft_coll_pp">
                            <Link to="/author">
                            <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                            </Link>
                            <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                            <Link to="/explore">
                            <h4>{collection.title}</h4>
                            </Link>
                            <span>`ERC-{collection.code}`</span>
                        </div>
                    </div>
                </div>
            ))
            :
            new Array(4).fill().map((elem, index)=> (
                <div className='slide__wrap' key={index}>
                    <div className="nft_coll skeleton__slide">
                        <div className="nft_wrap skeleton nft__skeleton"></div>
                        <div className="nft_coll_pp img__skeleton--wrapper skeleton">
                            <div className='check__skeleton--wrap'><i className="fa fa-check check__skeleton"></i></div>
                            
                        </div>
                        <div className="skeleton__text--wrap">
                            <div className='skeleton skeleton__text longer-text__skeleton'></div>
                            <div className='skeleton skeleton__text'></div>
                        </div>
                    </div>
                </div>
            ))
        }
      
    </Slider>
  )
}

export default CollectionSlider;