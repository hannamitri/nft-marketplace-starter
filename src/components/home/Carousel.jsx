import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function StyledNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#32de84", borderRadius: "20px"}}
      onClick={onClick}
    />
  );
}

function StyledPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#32de84", borderRadius: "20px"}}
      onClick={onClick}
    />
  );
}

// export default class SimpleSlider extends Component {
  const Carousel = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      async function fetchData () {
        console.log("run or no")
        await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
        .then(response => {
          // Handle the successful response
          console.log(`victory`)
          setData(response.data)
          setLoading(false);
        })
        .catch(error => {
          // Handle the error
          console.error(`the error is ${error}`);
        });
      }
      fetchData();
    }, [])
    
    // if (!data.length) {
    //   return (
    //     new Array.fill(0).map((element, index) => (
    //       <div key={index}>
    //         <div className="nft_coll">
    //           <div className="nft_wrap">
    //             <Link to={`/item-details/${element.nftId}`}>
    //               <img src={element.nftImage} className="lazy img-fluid" alt="" />
    //             </Link>
    //           </div>
    //           <div className="nft_coll_pp">
    //             <Link to="/author">
    //               <img className="lazy pp-coll" src={element.authorImage} alt="" />
    //             </Link>
    //             <i className="fa fa-check"></i>
    //           </div>
    //           <div className="nft_coll_info">
    //             <Link to="/explore">
    //               <h4>{element.title}</h4>
    //             </Link>
    //             <span>ERC-{element.code}</span>
    //           </div>
    //         </div>
    //       </div>
    //     ))
    //   )
    // }
    // if (!data.length) {
    //   return (
    //     <>
    //       {/* Show the Skeleton loading state */}
    //       {new Array(4).fill(0).map((_, index) => (
    //         <div key={index}>
    //           <div className="nft_coll">
    //             <div className="nft_wrap">
    //               <Skeleton width="100%" height="200px" />
    //             </div>
    //             <div className="nft_coll_pp">
    //               <Skeleton circle={true} width={40} height={40} />
    //               <i className="fa fa-check"></i>
    //             </div>
    //             <div className="nft_coll_info">
    //               <Skeleton width="80%" />
    //               <Skeleton width="60%" />
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </>
    //   );
    // }
    
    const slidesToShow = 4;
    const slideWidth = 100 / slidesToShow + "%";

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      nextArrow: <StyledNextArrow />,
      prevArrow: <StyledPrevArrow />,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          },
        },
        {
          breakpoint: 750,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
            infinite: true,
            
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          },
        },
      ],
    };

    return (
      <div>
        <Slider {...settings}>
          {loading ? ( // Check if loading is true, render skeleton loading component
            new Array(4).fill(0).map((element, index) => (
              <div key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${element.nftId}`}>
                      <img src={element.nftImage} className="lazy img-fluid" alt="" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img className="lazy pp-coll" src={element.authorImage} alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{element.title}</h4>
                    </Link>
                    <span>ERC-{element.code}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Data has loaded, render the actual content
            data.map((element, index) => (
              <div key={index} >
              <div className="nft_coll" style={{
              tabindex: "1",
              marginLeft: "10px"
              }}>
                <div className="nft_wrap">
                  <Link to={`/item-details/${element.nftId}`}>
                    <img src={element.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={element.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{element.title}</h4>
                  </Link>
                  <span>ERC-{element.code}</span>
                </div>
              </div>
            </div>
            ))
          )}
        </Slider>
      </div>
    );
  };
//     return (
//       <div>
//         {/* <h2> Single Item</h2> */}
//         <Slider {...settings}>
//         {loading}
//         {data.map((element, index) => (
//             // <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
//             // we want to change nftcoll
//             <div key={index} >
//               <div className="nft_coll" style={{
//               tabindex: "1",
//               marginLeft: "10px"
//               }}>
//                 <div className="nft_wrap">
//                   <Link to={`/item-details/${element.nftId}`}>
//                     <img src={element.nftImage} className="lazy img-fluid" alt="" />
//                   </Link>
//                 </div>
//                 <div className="nft_coll_pp">
//                   <Link to="/author">
//                     <img className="lazy pp-coll" src={element.authorImage} alt="" />
//                   </Link>
//                   <i className="fa fa-check"></i>
//                 </div>
//                 <div className="nft_coll_info">
//                   <Link to="/explore">
//                     <h4>{element.title}</h4>
//                   </Link>
//                   <span>ERC-{element.code}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     );
// }

export default Carousel

// /**
  

