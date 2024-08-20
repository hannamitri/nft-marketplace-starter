import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Skeleton from '../UI/Skeleton';
import 'aos/dist/aos.css';
import Aos from 'aos';
import Author from '../../pages/Author';

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(33.33);

  async function fetchHotCollections() {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setLoading(false);
      setHotCollections(response.data);
      console.log(response.data)
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);
      setLoading(false);
    }
  }


  useEffect(() => {
    Aos.init();
    fetchHotCollections();

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCenterSlidePercentage(100);
      } else {
        setCenterSlidePercentage(33.33);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (error) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div>
            <div className="text-center">
              <h2 data-aos="fade-in">Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div>
            <Carousel
              showArrows={true}
              showThumbs={false}
              infiniteLoop={true}
              autoPlay={true}
              centerMode={true}
              centerSlidePercentage={centerSlidePercentage}
              showStatus={false}
            >
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="nft-box">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton width={100} height={100} />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton width={50} height={50} borderRadius={99} />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <h4>
                          <Skeleton height={20} width="60%" />
                        </h4>
                        <span>
                          <Skeleton height={20} width="40%" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                hotCollections.map((item, index) => (
                  <div className="p-2" key={index}>
                    <div className="nft_coll" data-aos="fade-in">
                      <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className=" h-[100px] w-[100px]lazy img-fluid"
                          alt=""
                        />
                      </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={item.authorImage}
                            alt=""
                          />
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
                ))
              )}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
