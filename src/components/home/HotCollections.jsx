import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/hotCollectionsSlider.css";

//Custom Arrows for the slider
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow custom-next" onClick={onClick}>
      <i className="fa fa-angle-right"></i>
    </div>
  );
};
 
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow custom-prev" onClick={onClick}>
      <i className="fa fa-angle-left"></i>
    </div>
  );
};


const HotCollections = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
        const jsonData = response.data;
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
  };
  fetchData();
}, []);

if (loading) {
  return <div>Loading...</div>;
}
if (error) {
  return <div>Error: {error.message}</div>;
}

//  Slider settings with responsive breakpoints
const settings = {
  infinite: true,
  speed: 300, 
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,  
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      } 
    }
  ]
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
          <div className="col-lg-12">
             {loading ? (
              <div className="row">
                {new Array(4).fill(0).map((_, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <div className="skeleton skeleton-img"></div>
                      </div>
                      <div className="nft_coll_pp">
                        <div className="skeleton skeleton-avatar"></div>
                      </div>
                      <div className="nft_coll_info">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-code"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Slider {...settings}>
                {data.map((collection, index) => (
                  <div key={index}>
                    <div className="nft_coll" style={{ margin: '0 10px' }}>
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
                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}; 
 
export default HotCollections; 

               
