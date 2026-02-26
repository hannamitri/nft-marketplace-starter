import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from 'jquery';
import jQuery from 'jquery';
import OwlCarousel from 'react-owl-carousel';
import '../../css/styles/owl.carousel.css';
import '../../css/styles/owl.theme.css';
import '../../css/styles/owl.transitions.css';
if (typeof window !== 'undefined') {
  if (!window.$) window.$ = $;
  if (!window.jQuery) window.jQuery = jQuery;
}

const HotCollections = () => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

const options = {
    items: 4,
    loop: true,
    margin: 30,
    nav: true,
    dots: true,
    responsive: {
      0: { items: 1, nav: false },
      576: { items: 2, nav: false },
      768: { items: 3, nav: false },
      1200: { items: 4, nav: true }
    },
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>'
    ]
  };
  
  async function fetchData() {
      setIsLoading(true);
      const fetchHotCollections = "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      try{
        const {data} = await axios.get(fetchHotCollections);
        setNfts(data);
      }
      catch(error){
        console.log('Error fetching', error);
      }finally{
        setIsLoading(false);
      }
      
  }


  
  useEffect(()=>{
    fetchData();
  }, [])

  
  



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

          {isLoading ?  (
            // using   key={isLoading ? "loading" : "loaded"} will treat it as a component and will re-render
            <OwlCarousel className='owl-theme' {...options}   key={isLoading ? "loading" : "loaded"}>
              {[...Array(6)].map((_, index) => (
                <div className='item' key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <a href="/">
                        <div className="skeleton-box" style={{width: "100%", height: "200px"}}></div>
                      </a>
                    </div>
                    <div className="nft_coll_pp">
                      <a href="/">
                        <div className="skeleton-box" style={{width: "50px", height: "50px", borderRadius: "50%"}}></div>
                      </a>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <a href="/">
                        <div className="skeleton-box" style={{width: "100px", height: "20px"}}></div>
                      </a>
                      <br />
                      <div className="skeleton-box" style={{width: "60px", height: "20px"}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ):
          // using   key={isLoading ? "loading" : "loaded"} will treat it as a component and will re-render
            (<OwlCarousel className='owl-theme' {...options}  key={isLoading ? "loading" : "loaded"}>
            
            {nfts.map((nft, index) => (
              <div className='item' key={nft.authorId}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img src={nft.nftImage} className="lazy img-fluid" alt="" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img className="lazy pp-coll" src={nft.authorImage} alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{nft.title}</h4>
                    </Link>
                    <span>{`ERC-${nft.code || 'N/A'}`}</span>
                  </div>
                </div>
              </div>
            ))}

          </OwlCarousel>)
        }

          
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
