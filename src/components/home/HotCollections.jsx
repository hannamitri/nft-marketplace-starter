import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios"
import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css"
import Slider from "react-slick";
import "../../css/styles/Skeleton.css"
import Skeleton from "../UI/Skeleton";
const HotCollections = () => {
  useEffect(() =>{
    AOS.init({duration:1600})
  },[])
  const [items,setItems] = useState([])
const [loading,setLoading] = useState(true);
const {nftId} = useParams()
  const fetchData = async () => {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    setItems(data)
  }
  
  useEffect(() => {
 fetchData() 
  },[items])

  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style ,display: "block", background: "#CECECE", borderRadius:"60%", right: "1%",width:"30px", height:"30px", textAlign:"center" ,paddingTop:"6px"}}
        onClick={onClick}
      />
    );
  }


  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container " data-aos="fade-up">
        <div className="row">
          <div className="col-lg-12  ">
            <div className="text-center">
              <h2>Hot Collections</h2>
              
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {  items.length >0 ? 
          ( <Slider {...settings}>

           {items.map((item,index) => (
           
<div className="d-flex"   >

  <div className="nft_coll ml-3" key={index}>
    <div className="nft_wrap w-100 ">
      <Link to={`/item-details/${item.nftId}`}>
        <img src={item.nftImage   }  className="lazy nftImage img-fluid" alt="" key={item?.id} />
      </Link>
    </div>
    <div className="nft_coll_pp">
      <Link  to={`/author/${item.authorId}`}>
        <img className="lazy pp-coll" src={item.authorImage} alt="" />
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

)

      :   ( <>
         <Slider {...settings}>
  {  new Array(4).fill(0).map((_, index) => (
    <div className=""   >

    <div className="nft_coll ml-3"   key={index}>
      <div className="nft_wrap  ">
        <Link to={``}>
         <Skeleton width="500px" height="200px" backgroundColor="#ECECEC" borderRadius={10}/>
        </Link>
      </div>
      <div className="nft_coll_pp">
       
<Skeleton width="50px" height="50px" backgroundColor="#ECECEC" borderRadius="50%" />
      
      </div>
      <div className="nft_coll_info">
      <div className="d-flex flex-col justify-content-center flex-column align-items-center">
     
      <Skeleton width="80px"  height="15px" backgroundColor="#ECECEC" />
      
        <Skeleton width="100px"  height="20px" backgroundColor="#ECECEC" marginTop="15px"/>

        </div>

      </div>
  
    </div>
  
  </div>
 
      ))}
  </Slider>

  </>)}



        
      
</div>

        </div>
    
    </section>
  );
};

export default HotCollections;
