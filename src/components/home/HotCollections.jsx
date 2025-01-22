import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";
import Aos from 'aos';
import 'aos/dist/aos.css';

const HotCollections = ({ width, height, borderRadius }) => {

  useEffect(() => {
      Aos.init({
        easing: 'ease-in-out',
        duration: 1500,
      });
    }, [])

  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
          setCollections(res.data)
          setIsLoading(false);
        }
        catch (error) {
          console.error('error', error)
          setIsLoading(false);
        }
      };

      const timer = setTimeout(() => {
        setIsLoading(true);
      }, 1000)

      fetchData();

      return () => clearTimeout(timer)
    }, []);

    const options = {
      loop: true,
      margin: 10,
      nav: true,
      dots: false,
      responsive: {
        0: {
          items: 1,
          nav: true,
        },
        600: {
          items: 2,
          nav: true,
        },
        1000: {
          items: 4,
          nav: true,
        },
      },
    };
     

  return (
    <section id="section-collections" className="no-bottom" data-aos = "fade" data-aos-delay = "100" data-aot-duration = "200">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className="owl-theme" {...options}>
          {collections.map((nft, index) => {
  
            return (
              <div className="item" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${nft.nftId}`}>
                  { isLoading ? (
                    <Skeleton width={width} height={'80%'} borderRadius={borderRadius} />
                  ): (
                    <img src={ nft ? nft.nftImage : ''} className="lazy img-fluid" alt="" />
                  )}
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={`/author/${nft.authorId}`}>
                  { isLoading ? (
                    <Skeleton width={width} height={'60px'} borderRadius={'50%'} />
                  ): (
                    <img className="lazy pp-coll" src={nft ? nft.authorImage : ''} alt="" />
                  )}

                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                  { isLoading? (
                    <Skeleton width={'80%'} height={height} borderRadius={borderRadius} /> 
                  ) : (
                    <h4>{nft ? nft.title : 'skeleton-box'}</h4>
                  )}
                  </Link>
                  { isLoading? (
                    <Skeleton width={'40%'} height={height} borderRadius={borderRadius} />
                  ) : (
                    <span className="">ERC-{nft ? nft.code : ''}</span>
                  )}
                </div>
              </div>
            </div>
            )
            })}
           </OwlCarousel> 
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
