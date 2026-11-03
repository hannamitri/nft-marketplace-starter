import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom'
import axios from 'axios'
import Skeleton from './Skeleton';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey"}}
      onClick={onClick}
    />
  );
}

export default function SimpleSlider () {
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slidesToShow = windowWidth <= 576 ? 1 : windowWidth <= 990 ? 2 : 4;

  const settings = {
    className: "slider",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  
  const [hotData, setHotData] = useState([])
  const [loading, setLoading] = useState(true)
  
  async function hotCollectionsData() {
    const { data } = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
    setHotData(data)
    setLoading(false)
  }

  useEffect(() => {
    hotCollectionsData()
  }, [])

  let counter = 0
  return (
    <div key={counter++} className='slider--container'>
      <Slider key={loading ? 'loading' : 'loaded'} {...settings}>
        {loading
        ?        
        new Array(6).fill(0).map((_, index) => (
          <div className="card" key={index}>
            <div className="nft_coll">
              <div className="nft_wrap">
                <Skeleton width="100%" height="200px" borderRadius="10px" />
              </div>
              <div className="nft_coll_pp">
                <Link to="/author">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </Link>
                <i className="fa fa-check"></i>
              </div>
              <div className="nft_coll_info">
                <Link to="/explore">
                  <Skeleton width="100px" height="20px" borderRadius="5px" />
                </Link>
                <span><Skeleton width="100px" height="20px" borderRadius="5px"/></span>
              </div>
            </div>
          </div>
        ))       
        :
        hotData.map((data) => (
          <div className="card" key={data.id}>
            <div className="nft_coll">
              <div className="nft_wrap">
                <Link to={`/item-details/${data.nftId}`}>
                  <img src={data.nftImage} className="lazy img-fluid" alt="" />
                </Link>
              </div>
              <div className="nft_coll_pp">
                <Link to={`/author/${data.authorId}`}>
                  <img className="lazy pp-coll" src={data.authorImage} alt="" />
                </Link>
                <i className="fa fa-check"></i>
              </div>
              <div className="nft_coll_info">
                <Link to={`/explore`}>
                  <h4>{data.title}</h4>
                </Link>
                <span>ERC-{data.code}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )  
}