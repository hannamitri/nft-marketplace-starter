import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import AOS from "aos";
import "aos/dist/aos.css"
const AuthorItems = () => {
  const [items,setItems] = useState()
  const {authorId} = useParams()
  const getAuthorItems = async () => {

    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
setItems(data)

  }

  useEffect(() => {
    AOS.init({duration:1600})
    },[])

  useEffect(() => {
getAuthorItems()
  },[])

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
           
        {new Array(4).fill(0).map((_,index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12"  key={index} >
          
<div className="nft__item " style={{height:"450px"}}>
<div className="author_list_pp mb-5">
  <Link to="">
    <img className="lazy" src={items?.authorImage} alt="" />
    <i className="fa fa-check"></i>
  </Link>
</div>
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

  <div className="mt-5">
<Link to={`/item-details/${items?.nftCollection[index].nftId}`}>
    <img
      src={items?.nftCollection[index].nftImage}
      className="lazy nft__item_preview mt-5"
      alt=""
    />
  </Link>

<div className="nft__item_info ">
  <Link to="/item-details">
    <h4 className="mt-3">{items?.nftCollection[index].title}</h4>
  </Link>
  <div className="nft__item_price">{items?.nftCollection[index].price} ETH</div>
  <div className="nft__item_like">
    <i className="fa fa-heart"></i>
    <span>97</span>
  </div>
</div>
</div>


 
</div>

  </div>
 
     
 

 
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
