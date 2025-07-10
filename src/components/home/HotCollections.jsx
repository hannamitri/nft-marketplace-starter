import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios"
import Skeleton from "../UI/Skeleton"


const HotCollections = () => {
  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchItemDetails() {
      try{
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
      );
      setItemDetails(data);
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
    }
    fetchItemDetails();
  }, []);

  if (loading) {
    return <Skeleton />
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
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
     <Slider {...settings}>
           {itemDetails.map((item, index) => (
              <div key={item.id} className="px-2">
              <div className="nft_coll">
               <div className="nft_wrap">
                <Link to={`/item-details/${item.nftId}`}>
                  <img
                   src={item.nftImage}
                    className="lazy img-fluid"
                     alt={item.title}
                      />
                         </Link>
                         </div>
                         <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                         <img
                        className="lazy pp-coll"
                         src={item.authorImage}
                            alt="Author"
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
          </div>
        </div>
    </section>

  );
};

export default HotCollections;
