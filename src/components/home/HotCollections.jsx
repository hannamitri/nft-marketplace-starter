import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../css/slider/hotCollections-slick.css';
import '../../css/styles/style.css';

const HotCollections = ({collections, loading}) => {
  
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {breakpoint: 1024, settings: {slidesToShow: 3, slidesToScroll: 1, infinite: true}},
        {breakpoint: 992, settings: {slidesToShow: 2, slidesToScroll: 1, infinite: true}},
        {breakpoint: 576, settings: {slidesToShow: 1, slidesToScroll: 1, infinite: true}}
      ]
    }
  

    const skeletonItems = Array(4).fill(0);

    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            {loading ? (
              <Slider {...settings}>
                {skeletonItems.map((_, idx) => (
                  <div className="px-1" key={idx}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <div className="skeleton-box" style={{ width: '100%', height: '200px' }}></div>
                      </div>
                      <div className="nft_coll_pp">
                        <div className="skeleton-box" style={{ width: '60px', height: '60px', borderRadius: '50%', margin: '0 auto', marginTop: '-30px' }}></div>
                      </div>
                      <div className="nft_coll_info">
                        <div className="skeleton-box" style={{ width: '80%', height: '20px', margin: '10px auto 5px' }}></div>
                        <div className="skeleton-box" style={{ width: '60%', height: '16px', margin: '5px auto' }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider {...settings}>
                {collections.map((item) => (
                  <div className="px-1" key={item.nftId} data-aos="fade-up" data-aos-duration="1000">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
                          <img src={item.nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img className="lazy pp-coll" src={item.authorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{item.title}</h4>
                        </Link>
                        <span>ERC-{item.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </section>
    );
};

export default HotCollections;
