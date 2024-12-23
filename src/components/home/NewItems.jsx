// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";
// import axios from "axios";
// import Slider from "react-slick";
// import Skeleton from "../UI/Skeleton";

// const NewItems = () => {
//   const [newItems, setNewItems] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   async function fetchNewItems (){
//     const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
//     setNewItems(response.data)
//   }
//   useEffect(()=>{
//     setLoading(false)
//     fetchNewItems()
//   },[])

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         }
//       }
//     ]
//   };


//   return (
//     <section id="section-items" className="no-bottom">
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="text-center">
//               <h2>New Items</h2>
//               <div className="small-border bg-color-2"></div>
//             </div>
//           </div>
//           <div className=" ">
//             <Slider {...settings} >
            
         
//                {newItems.map((item, index)=>
//                (
//                 <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
//                 <div className="nft__item">
//                   <div className="author_list_pp">
//                     <Link
//                       to="/author"
//                       data-bs-toggle="tooltip"
//                       data-bs-placement="top"
//                       title="Creator: Monica Lucas"
//                     >
//                       <img className="lazy" src={item.nftImage} alt="" />
//                       <i className="fa fa-check"></i>
//                     </Link>
//                   </div>
//                   <div className="de_countdown">5h 30m 32s</div>
    
//                   <div className="nft__item_wrap">
//                     <div className="nft__item_extra">
//                       <div className="nft__item_buttons">
//                         <button>Buy Now</button>
//                         <div className="nft__item_share">
//                           <h4>Share</h4>
//                           <a href="" target="_blank" rel="noreferrer">
//                             <i className="fa fa-facebook fa-lg"></i>
//                           </a>
//                           <a href="" target="_blank" rel="noreferrer">
//                             <i className="fa fa-twitter fa-lg"></i>
//                           </a>
//                           <a href="">
//                             <i className="fa fa-envelope fa-lg"></i>
//                           </a>
//                         </div>
//                       </div>
//                     </div>
    
//                     <Link to="/item-details">
//                       <img
//                         src={item.nftImage}
//                         className="lazy nft__item_preview"
//                         alt=""
//                       />
//                     </Link>
//                   </div>
//                   <div className="nft__item_info">
//                     <Link to="/item-details">
//                       <h4>{item.title}</h4>
//                     </Link>
//                     <div className="nft__item_price">{item.price}</div>
//                     <div className="nft__item_like">
//                       <i className="fa fa-heart"></i>
//                       <span>{item.likes}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>))
//     }
//     </Slider>
              
              
//               </div>
         
          
           
            
          
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewItems;


import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {

  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const startTime = Date.now();
  // const nowTime = startTime - response.expiryDate
  //  let response;
  
  async function fetchNewItems (){
    const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
    setNewItems(response.data)
  }
  useEffect(()=>{
    setLoading(false)
    fetchNewItems()
  },[])

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 3,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //       }
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       }
  //     }
  //   ]
  // };
  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray", borderRadius: "50px" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {loading ? ( <div className="p-2">
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton width={282} height={270} />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton width={50} height={50} borderRadius={99} />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <h4>
                      <Skeleton height={20} width="40%" />
                    </h4>
                    <span>
                      <Skeleton height={20} width="20%" />
                    </span>
                  </div>
                </div>
              </div> ): ( 
                newItems.map((item, index)=>(
               
               <div className="px-1 " key={index}>
                 <div className="nft__item">
                   <div className="author_list_pp">
                     <Link
                       to="/author"
                       data-bs-toggle="tooltip"
                       data-bs-placement="top"
                       title="Creator: Monica Lucas"
                     >
                       <img className="lazy" src={item.authorImage} alt="" />
                       <i className="fa fa-check"></i>
                     </Link>
                   </div>
                   <div className="de_countdown">5h 30m 32s</div>
   
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
   
                     <Link to="/item-details">
                       <img
                         src={item.nftImage}
                         className="lazy nft__item_preview"
                         alt=""
                       />
                     </Link>
                   </div>
                   <div className="nft__item_info">
                     <Link to="/item-details">
                       <h4>{item.name}</h4>
                     </Link>
                     <div className="nft__item_price">{item.price}ETH</div>
                     <div className="nft__item_like">
                       <i className="fa fa-heart"></i>
                       <span>{item.like}</span>
                     </div>
                   </div>
                 </div>
               </div>
             )
            ))}
             </Slider>
           </div>
         </div>
         
    </section>
  );
};

export default NewItems;