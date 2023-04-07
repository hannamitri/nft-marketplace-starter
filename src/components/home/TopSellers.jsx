import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
const TopSellers = () => {
  const [data, setdata] = useState(null)
  
async function sellerData(){
  await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers')
.then((response)=>{
    
    setdata(response.data)
})}

useEffect(()=>{
sellerData()
},[])

console.log(data)




  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {data ? data?.map((seller)=>{
                return(

                  <li key={seller.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller?.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller?.authorImage}
                        alt=""
                        />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller?.authorId}`}>{seller?.authorName}</Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
            )
            })
          :
          new Array(12).fill(0).map((_, index) => (
            <li key={index}>
           <div className="author_list_pp">
           <Link to="/">
           <Skeleton width={50} height={50} borderRadius={"50%"}></Skeleton>
           <i className="fa fa-check"></i>
           </Link>
           </div>
           <div className="author_list_info">
           <Link to="/">
           <Skeleton width={100} height={20} ></Skeleton>
           </Link>
           <span> <Skeleton width={40} height={20} ></Skeleton></span>
           </div>
           </li>
          ))

          }
          </ol>
          </div>
          </div>
      </div>
    </section>
  );
};

export default TopSellers;
