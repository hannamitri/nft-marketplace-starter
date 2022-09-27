/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const HotCollections = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get(
				"https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
			)
			.then((response) => {
				setData([...response.data]);
        console.log("this is what is displayed in the useEffect hook")
			});
	}, []);

	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
	
			<section id='section-collections' className='no-bottom'>
				<div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
		  <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
          <Slider {...settings}>
          {data.map((data, index) => ( 
            <div className="mx-2" key={index}>
              <div className="nft_coll mx-4">
                <div></div>
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={ data.nftImage ||<Skeleton count={3} />} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={data.authorImage || <Skeleton />} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{data.title || <Skeleton />}</h4>
                  </Link>
                  <span>{data.code || <Skeleton />}</span>
                </div>
              </div>
            </div>
            
          ))}
          </Slider>
		  </SkeletonTheme>        
        </div>
      </div>
	</section>

	);
};

export default HotCollections;
