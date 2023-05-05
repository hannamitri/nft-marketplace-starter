import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "../UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css"
const TopSellers = () => {

  const [sellers,setSellers] = useState([])
const getSellers = async () => {
  const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
setSellers(data)

}

useEffect(() => {
getSellers()
})

useEffect(() =>{
  AOS.init({duration:1600})
},[])

  return (
    <section id="section-popular" className="pb-5">
      <div className="container" data-aos="fade-right">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">


            { sellers.length >0 ? (sellers.map((seller,index) => (

<li >
  <div className="author_list_pp">
    <Link to={`/author/${seller.authorId}`}>
      <img
        className="lazy pp-author"
        src={seller.authorImage}
        alt=""
      />
      <i className="fa fa-check"></i>
    </Link>
  </div>
  <div className="author_list_info">
    <Link to="/author">{seller.authorName}</Link>
    <span>{seller.price} ETH</span>
  </div>
</li>
)))

              :(<>
             
            { new Array(16).fill(0).map((seller,index) => (

                <li >
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                    <Skeleton width="50px" height="50px" borderRadius="50%" backgroundColor="#ECECEC" />
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Skeleton width="80px" height="17px" backgroundColor="#ECECEC"  />
                    <Skeleton width="40px" height="14px" backgroundColor="#ECECEC" marginTop="12px"  />
                  </div>
                </li>
              ))}
               </>)}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
