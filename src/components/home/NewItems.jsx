import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../timer";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import { Box, Skeleton, Stack } from "@mui/material";

const NewItems = () => {

const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(() => {

const fetchUsers = async() => {
setLoading(true);

const response = await axios.get('/newItems')
setUsers(response.data)
setLoading(false);
}

fetchUsers();
}, [])

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
          slideToScroll: 1,
          
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slideToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slideToScroll: 1,
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

{loading 
?         
new Array(4).fill(0).map((_, index) => (
  <Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Skeleton variant="rectangular" animation="wave" width={200} height={100} />
          <Skeleton variant="rectangular" animation="wave" width={200} height={100} />
          <Skeleton variant="rectangular" animation="wave" width={200} height={100} />
          <Skeleton variant="rectangular" animation="wave" width={200} height={100} />
        </Box>


))
: (
  <Slider {...settings}>

{users.map((user) => (
  
  <div key={user.id}>
<div className="nft__item">
  <Countdown deadline={user.expiryDate}/>
<div className="author_list_pp">
<Link
to={`/author/${user.id}`}
data-bs-toggle="tooltip"
data-bs-placement="top"
title="Creator: Monica Lucas"
>
<img className="lazy" src={user.authorImage} alt="" />
<i className="fa fa-check"></i>
</Link>
</div>

<div className="nft__item_wrap" >
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
          
      
      <Link to={`/item-details/${user.id}`}>
          <img
          src={user.nftImage}
          className="lazy nft__item_preview"
          alt="" 
          />
      </Link>
      </div>
      <div className="nft__item_info" >
      <Link to="/item-details">
      <h4>{user.title}</h4>
      </Link>
    <div className="nft__item_price" >{user.price} ETH</div>
  <div className="nft__item_like">
  <i className="fa fa-heart"></i>
    <span>{user.likes}</span>
  </div>
  </div>
  </div>
  </div>
))
}
  </Slider>

)}

</div>
</div>
</section>
);
};

export default NewItems;
