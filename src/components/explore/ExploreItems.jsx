import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import {useState,useEffect} from "react";
import "../../index.css";
import Internship from  "../Internship";
import AOS from 'aos';
import 'aos/dist/aos.css';
const ExploreItems = () => {
  const [getexplore, setGetexplore] =useState([])
  const [loading, setLoading]= useState(true)
  const [visibleItems,setVisibleItems]= useState(8);
  const [sortType,setSortType]= useState("")
  const explore = async () => {
    try{
    const response=  await axios.get ("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
    setGetexplore(response.data)
    console.log(response.data)
    }
     catch(error){
      console.error("error")
     }
     finally{
      setTimeout(() => {
        setLoading(false)
      }, 2000);
     }
     
  }
    useEffect(()=>{
    explore()
    
     },[])
     useEffect(() => {
         AOS.init({
         duration: 1000,
         })},[]);
     const sortedItems=[...getexplore];
     if (sortType==="price_low_to_high"){
      sortedItems.sort((a,b)=>a.price-b.price);
     }
          if (sortType==="price_high_to_low"){
      sortedItems.sort((a,b)=>b.price-a.price);
     }
          if (sortType==="likes_high_to_low"){
      sortedItems.sort((a,b)=>b.likes-a.likes);
     }
console.log("loading=",loading)

  return (
    <>
    
      <div>
        <select id="filter-items" value={sortType}
        onChange={(e)=>setSortType(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      
      { loading ? (
       
        <div className="row">
                       {new Array(4).fill(0).map((_, index)=>(
            <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className=" nft__item ">
                <div className="author_list_pp">
<div className="skeleton skeleton-author"></div>
                </div>
               
                  <div className="skeleton skeleton-count"> 
                    
</div>
                <div className="nft__item_wrap">
<div className="skeleton skeleton-image"></div>
                </div>
                <div className="nft__item_info">
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-price"></div>
                   <div className="skeleton skeleton-likes"></div>
                  </div>
                           
</div>
</div>
                            ))}
                            </div>
) :(
    sortedItems.slice(0,visibleItems).map((item, index) => (
         
        <div 
          className ="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          key={item.nftId||index}
          data-aos="fade-up"
          style={{display:"block",
            backgroundSize:"cover"
          }}>
        <Internship 
          item={item}
          index={index}
          authorId={item.authorId}
          />
      </div>
    
      ))
    )}
      {visibleItems < getexplore.length&&(
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead"
        onClick={(e)=>{
          e.preventDefault();
          setVisibleItems((prev)=>prev + 4);
        }}>
          Load more
        </Link>
      </div>
      )}
      
</>
  );
};

export default ExploreItems;
