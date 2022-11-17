import React, {useState, useEffect, Component} from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import LoadingPlaceHolder from './LoadingPlaceHolder'
import { width } from "@mui/system";

const HotCollections = (props) => {

  const [collection, setCollection] = useState([])
  const [loading, setLoading] = useState()

  async function getHotCollection() {
   
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    console.log(data)
    setCollection(data)
    console.log(collection)
    setLoading(true);
  }
  
  useEffect(() => {
    getHotCollection();
  }, [])


  const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      prevArrow: 
        <NavigateBeforeIcon/>  
      ,
      nextArrow: <NavigateNextSharpIcon/>,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 979,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
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
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              
              <div className="small-border bg-color-2"></div>
            </div>
          </div>


          

          <div className="">
          <Slider {...settings}>

          {
            !loading 
            
            ? new Array(4).fill(0).map((_, index) => (

              <div key={index}>
              
              <div className="nft_coll" key={index}>
                <div className="nft_wrap">
                  <Link to="/item-details">
                    {<LoadingPlaceHolder extraStyles={{height:'100%'}}/>}
                    
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                  {<LoadingPlaceHolder extraStyles={{height:'50px', width:'50px', borderRadius:'50%'}}/>}
                  </Link> 
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                  {<LoadingPlaceHolder extraStyles={{height:'15px', width:'100px', marginBottom: '16px', marginTop: '50px', borderRadius: '10px', marginLeft:'auto',  marginRight:'auto' }}/>}
                  </Link>
                  {<LoadingPlaceHolder extraStyles={{height:'15px', width:'80px', marginBottom: '16px', marginTop: '10px', borderRadius: '10px', marginLeft:'auto',  marginRight:'auto' }}/>}
                  </div>
              </div>
              
            </div>
      
        )):

        collection.map((collections) => (
               
          <div key={collections.id}>
            
            <div className="nft_coll" key={collections.id}>
              <div className="nft_wrap">
                <Link to="/item-details">
                  <img src={collections.nftImage} className="lazy img-fluid" alt="" />
                </Link>
              </div>
              <div className="nft_coll_pp">
                <Link to="/author">
                  {<img className="lazy pp-coll" src={collections.authorImage} alt="" />}
                </Link> 
                <i className="fa fa-check"></i>
              </div>
              <div className="nft_coll_info">
                <Link to="/explore">
                  <h4>{collections.title}</h4>
                </Link>
                <span>ERC-192</span>
                </div>
            </div>
            
          </div>
        ))}

          



            
      
          
          </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HotCollections;
