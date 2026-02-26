import React, { useEffect, useState, useRef } from "react";
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


const TopSellers = () => {
    const [sellers, setSellers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [countdowns, setCountdowns] = useState({});
    const timerRefs = useRef({});

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
          const fetchTopSellers = "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
          try{
            const {data} = await axios.get(fetchTopSellers);
            setSellers(data);
            console.log(data);
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
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {isLoading ? (
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <a href="/">
                        <div 
                          className="skeleton-box" 
                          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                        ></div>
                        <i className="fa fa-check"></i>
                      </a>
                    </div>
                    <div className="author_list_info">
                      <a href="/">
                        <div 
                          className="skeleton-box" 
                          style={{ width: "100px", height: "20px" }}
                        ></div>
                      </a>
                      <span>
                        <div 
                          className="skeleton-box" 
                          style={{ width: "40px", height: "20px" }}
                        ></div>
                      </span>
                    </div>
                  </li>
                ))
                
              ) : (
                sellers.map((seller, index) => (
                  <li key={seller.authorId}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
