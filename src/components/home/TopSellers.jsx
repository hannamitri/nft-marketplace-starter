import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import {useState, useEffect} from "react";
import axios from "axios";
const TopSellers = () => {

  const [top, SetTop]=useState([])
  const [loading,setLoading]= useState(true)
const fetchTop=async()=>{
try {
  const response= await axios.get ("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
  SetTop(response.data)
  console.log(response.data)
  setLoading(false)
}
catch (error){
console.error("Error fecting topsellers")
}
}
  useEffect(()=>{
    setTimeout(() => {
      fetchTop();

    }, 9000);
  },[])
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
             { loading ? (
              
            <ol className="author_list">
              { new Array(12).fill(0).map((_, id) => (
                <li key={id}>
                  <div className="author_list_pp">
                    <div className="skeleton">
                      <div className="skeleton skeleton-top-authorimage"></div>
                      <i className="fa fa-check"></i>
                    </div>
                  </div>
                  <div className="author_list_info">
                    <div className="skeleton skeleton-top-aouthorName"></div>
                    <div className="skeleton skeleton-top-price">
                    <span className="skeleton skeleton-top-eth"></span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          
  ) : (
           <ol className="author_list">
              {top.map((item, id) => (
                <li key={item.id|| id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{item.authorName}</Link>
                    <span>{item.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
  )}
          </div>
          
        </div>
      </div>
    </section>
            
)};

export default TopSellers;
