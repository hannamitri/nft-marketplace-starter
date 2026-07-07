import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import {useParams} from "react-router-dom"
import { useState,useEffect } from "react";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
const Author = () => {
  const {authorId}=useParams();
   const [details,SetDetails]= useState({})
    const [followers,setFollowers]=useState(details.followers||0)

 
  const authorDetails=async()=>{
    try{
    const response= await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
SetDetails(response.data)
console.log( "authir response:", response.data)
    }
    catch(error){
      console.error("fetching error")
    }
  }
  useEffect(()=>{
    authorDetails()
  },[authorId])
  useEffect(() => {
      AOS.init({
      duration: 1000,
    })},[]);
  const  followersHandle=()=>{
  {
    setFollowers((prev)=>prev+1);
    }  
  }
    
    return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
            <div data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={details.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {details.authorname}
                          <span className="profile_username">@{details.tag}</span>
                          <span id="wallet" className="profile_wallet">
                      {details.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followers} followers</div>
                      <Link to="#" className="btn-main"onClick={followersHandle} >
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems nfts={details.nftCollection||[]}/>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>
      </div>
    </div>
    
  );
};

export default Author;
