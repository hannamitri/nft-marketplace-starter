import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/Slider.css";

const HotCollections = () => {
	const [userData, setUserData] = useState([]);
	const [isTablet, setIsTablet] = useState(window.innerWidth <= 768);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
	const [loading, setLoading] = useState(true);
	const variableValue = isMobile ? 1 : isTablet ? 2 : 4;

	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,

		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					dots: true,
					slidesToShow: 1,
				},
			},
		],
	};

	async function fetchData() {
		try {
			const response = await axios.get(
				"https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
			);
			setUserData(response.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchData();

		const handleResize = () => {
			setIsMobile(window.innerWidth <= 480);
			setIsTablet(window.innerWidth <= 768);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

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
					{!loading ? (
						<Slider {...settings}>
							{userData.map((item, index) => (
								<div className="nft" key={index}>
									<div className="nft_coll">
										<div className="nft_wrap">
											<Link to="/item-details">
												<img
													src={item.nftImage}
													className="lazy img-fluid"
													alt=""
												/>
											</Link>
										</div>
										<div className="nft_coll_pp">
											<Link to="/author">
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
							))}
						</Slider>
					) : (
						<div
							className="skeleton_container"
							style={{ minHeight: "200px" }}
						>
							{new Array(variableValue).fill(0).map((_, index) => (
								<div className="nft skeleton_nft" key={index}>
									<div className="nft_coll skeleton-card">
										<div className="nft_wrap">
											<div className="skeleton skeleton-img"></div>
										</div>
										<div className="nft_coll_pp">
											<div className="skeleton skeleton-avatar"></div>
										</div>
										<div className="nft_coll_info">
											<div className="skeleton skeleton-title"></div>
											<div className="skeleton skeleton-subtitle"></div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default HotCollections;
