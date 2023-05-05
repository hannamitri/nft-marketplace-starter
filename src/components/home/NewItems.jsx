import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Countdown from "./Countdown";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"
import Skeleton from "../UI/Skeleton";
const NewItems = ({item}) => {
const [items,setItems] = useState([])
 const getItems = async () => {
  const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
 setItems(data)

}



useEffect(() => {
  getItems()
  
},[])

useEffect(() =>{
  AOS.init({duration:1600})
},[])


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
    <section id="section-items" className="no-bottom">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>



           { items.length > 0? 
         ( <Slider {...settings} >
       
         { items.map((item, index) => (
            <div className="" key={item.nftId} >
              <div className="nft__item ml-3">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
              {item?.expiryDate && <Countdown item={item} /> }
    
  



                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                     
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
))}
</Slider>

) :(

  <>
  <Slider {...settings} >
               {  new Array(4).fill(0).map((_, index) => (
                 <div className=""   >
             
                 <div className="nft_coll ml-3"   key={index}>
                   <div className="nft_wrap " style={{height:"350px" }}>
                   <div className="nft_coll_pp ml-5">
                     <Link  to="/author">
             <Skeleton width="50px" height="50px" backgroundColor="#ECECEC" borderRadius="50%"  marginTop="40px"/>
                     </Link>
                   
                     <i className="fa fa-check"></i>
                   </div>

                     <Link to={``}>
                      <Skeleton width="460px" height="730px" backgroundColor="#ECECEC" borderRadius={5}/>
                     </Link>
                   </div>
                   
                   <div className="nft_coll_info">
          <div className="d-flex flex-column justify-content-center align-items-center">
 <Skeleton width="80px"  height="16px" backgroundColor="#ECECEC" marginTop="22px"/>
                    
                    <Skeleton width="100px"  height="12px" marginTop="10px" backgroundColor="#ECECEC"/>
        </div>
               
             
               
                   </div>
               
                 </div>
               
               </div>
              
                   ) )}
               </Slider>
 </>

)

         }

        </div>
        </div>
        
    </section>
  );
};

export default NewItems;

