import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import Skeleton from '../components/UI/Skeleton'
import axios from "axios";


const Author = () => {
  const {authorId} = useParams();
  const [data, setData] = useState();
  const [addfollower, setAddfollower] = useState(false);


  useEffect(() => {
   
    async function fetchAuthor() {
      try {
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
        setData(response.data)
       
      } catch(error) {
        if (error.response) {
          console.log('Error response:' + error.response.data)
        } else if (error.request) {
          console.error("Error Request: " + error.request);
        } else {
          console.error(error.message);
        }
      }
    }


    fetchAuthor();
  }, []);


  if (data === undefined) {
    return  (
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
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <div className="profile_avatar">
                    <Skeleton width="150px" height='150px' borderRadius='50%'/>


                    <i className="fa fa-check"></i>
                    <div className="profile_name">
                      <h4>
                      <Skeleton width="80%" height='20px'/>
                        <span className="profile_username"> <Skeleton width="40%" height='20px'/></span>
                        <span id="wallet" className="profile_wallet">
                        <Skeleton width="200px" height='20px'/>
                        </span>
                   
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="profile_follow de-flex">
                  <div className="de-flex-col">
                  <Skeleton width="100px" height='24px'/>
                    <div className="profile_follower"> </div>
                   
                   
                    <Skeleton width="100px" height='24px'/>
                   
                   
                  </div>
                </div>
              </div>
            </div>


            <div className="col-md-12">
              <div className="de_tab tab_simple">
                <AuthorItems authorData={data} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  )
  } else


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
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={data.authorImage} alt="" />


                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {data.authorName}
                          <span className="profile_username">@{data.authorName}</span>
                          <span id="wallet" className="profile_wallet">
                            {data.address}
                          </span>
                          <button id="btn_copy" title="Copy Text"
                          onClick={() =>  {
                             navigator.clipboard.writeText(data.address)
                             alert('Link Copied to Clipboard!')
                            }
                          }
                          >
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{data.followers + addfollower } followers</div>
                     
                      <Link to="#" className="btn-main" onClick={() => setAddfollower((prev) => !prev)}>
                      {!addfollower ? ('Follow') : ('Following')}
                      </Link>
                     
                    </div>
                  </div>
                </div>
              </div>


              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorData={data} />
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
