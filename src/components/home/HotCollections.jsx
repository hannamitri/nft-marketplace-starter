import React from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useHotCollections } from "../../hooks/useHotCollections";

const HotCollections = () => {
  const { collections, loading, error } = useHotCollections();

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 3, spacing: 15 },
      },
      "(max-width: 768px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 480px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
  });

  if (loading) {
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
          </div>
          <div className="row">
            {[...Array(4)].map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item" style={{ opacity: 0.5 }}>
                  <div className="author_list_pp">
                    <div style={{ width: '50px', height: '50px', background: '#f0f0f0', borderRadius: '50%' }}></div>
                  </div>
                  <div className="nft__item_wrap">
                    <div style={{ width: '100%', height: '200px', background: '#f0f0f0' }}></div>
                  </div>
                  <div className="nft__item_info">
                    <h4>Loading...</h4>
                    <div className="nft__item_price">-</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
                <p style={{ marginTop: '40px' }}>Error loading collections</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
        </div>
        
        {/* Carousel with navigation arrows */}
        <div style={{ position: 'relative', marginTop: '40px' }}>
          <button
            onClick={() => instanceRef.current?.prev()}
            style={{
              position: 'absolute',
              left: '-25px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: '#fff',
              border: '2px solid #ddd',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              fontSize: '20px'
            }}
          >
            &#8249;
          </button>

          <div ref={sliderRef} className="keen-slider">
            {collections.map((collection) => (
              <div className="keen-slider__slide" key={collection.id}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${collection.authorId}`}>
                      <img 
                        className="lazy" 
                        src={collection.authorImage} 
                        alt={`Author ${collection.authorId}`} 
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to={`/author/${collection.authorId}`}>
                      <img
                        src={collection.nftImage}
                        className="lazy nft__item_preview"
                        alt={collection.title}
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/author/${collection.authorId}`}>
                      <h4>{collection.title}</h4>
                    </Link>
                    <div className="nft__item_price">ERC-{collection.code}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => instanceRef.current?.next()}
            style={{
              position: 'absolute',
              right: '-25px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: '#fff',
              border: '2px solid #ddd',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              fontSize: '20px'
            }}
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;