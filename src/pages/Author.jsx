import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {


  const [ follow , setFollowed] = useState(false)
  




  const toggleFollow = () => {

    if (follow)  
    {
      setFollowed(false)
    }
    else
    {
      setFollowed(true)
    }
  


  }





    const {authorId} = useParams()



    const [author , setAuthor] = useState()

    async function fetchData(){
      await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`).then((data)=>{
        setAuthor(data.data)
      })



    }

    useEffect(()=>{
      fetchData()


    },[])

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
                      <img src={author?.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author?.authorName}
                          <span className="profile_username">@{author?.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author?.address}
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
                      <div className="profile_follower">{ follow  ? author?.followers + 1  : author?.followers } followers </div>
                      <Link to="#" className="btn-main" onClick={() => {setFollowed(!follow)}} >
                        { follow ? 'Unfollow' : 'Follow' }
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author}/>
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
