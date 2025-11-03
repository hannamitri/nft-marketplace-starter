import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css"
import AOS from 'aos';
import 'aos/dist/aos.css';

const HotCollections = ({ cards }) => {
  useEffect(() => {
    AOS.init()
  }, [])

  const responsive = {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div data-aos="fade-up" className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          { cards.length ? (
          <OwlCarousel
            className="owl-theme"
            loop
            margin={10}
            nav
            dots={false}
            items={4}
            responsive={responsive}>
            {cards.map((card) => (
              <div className="item" key={card.id}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${card.nftId}`}>
                      <img src={card?.nftImage} className="lazy img-fluid" alt="" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${card.authorId}`}>
                      <img className="lazy pp-coll" src={card.authorImage} alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{card.title}</h4>
                    </Link>
                    <span>ERC-{card.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
          ) : (
            <div>
              <div className="skeleton-wrapper1">
                <div className="skeleton skeleton-explore"></div>
                <div className="skeleton skeleton-explore"></div>
                <div className="skeleton skeleton-explore"></div>
                <div className="skeleton skeleton-explore"></div>
              </div>
            </div>
          ) }
          
        </div>
      </div>
    </section>
  )
};

export default HotCollections;
