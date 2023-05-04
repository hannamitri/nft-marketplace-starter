import React, {useState,useEffect} from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
const Author = () => {

  const [author,setAuthor] = useState([])
  const [followed,setFollowed] = useState(false)
const {authorId} = useParams()
  const fetchAuthors = async ( ) => {
const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
setAuthor(data)
console.log(data)
  }

  useEffect(() => {
   fetchAuthors()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

useEffect(() => {

})

function Follow () {
 
  setFollowed(true)

  const followersCount = author.followers

  setAuthor({...author, followers: followersCount + 1})

}

function UnFollow () {

setFollowed(false)

const followersCount = author.followers
setAuthor({...author, followers: followersCount - 1})

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
          style={{ background: `url(${AuthorBanner
          }) top` }}
        ></section>

           {/*Skelton starrt */}

     { Object.keys(author).length > 0 ?  (
<>
            <div className="col-md-12">
            <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">

                      <img src={author.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                         {author.authorName}
                          <span className="profile_username">@{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
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
                      {!followed ? (
                        <>
                        <div
                        className="profile_follower">{author.followers}</div>
                        <button to="#" 
                        onClick={() => Follow()}
                        className="btn-main">
                          Follow
                        </button >
                        </>
                      ) : (
                        <>
                        <div
                        className="profile_follower">{author.followers}</div>
                        <button to="#" 
                        onClick={() => UnFollow()}
                        className="btn-main">
                           Unfollow
                        </button >
                        </>
                      ) 
                       }
                    
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
              </>
           )
: (<>
           <div className="d-flex mt-3 ml-5">
     
                    <Skeleton width="120px" height="120px" borderRadius="50%" backgroundColor="#ECECEC" />                
                   
                   <div className="d-flex flex-column ml-5">
                   <Skeleton width="180px" height="24px"  backgroundColor="#ECECEC" marginTop="12px"  />
                    
    <Skeleton width="120px" height="15px"  backgroundColor="#ECECEC"  marginTop="14px"/>
                  
               
    <Skeleton width="120px" height="12px"  backgroundColor="#ECECEC"  marginTop="14px"/>

                   </div>
                    
                        
                          
                   
                   <div className="mr-5 mt-2 ml-sm-auto ">
                   <Skeleton width="130px" height="45px" borderRadius="6px"  backgroundColor="#ECECEC" />  
                    </div>   
                   
                 
            
      </div>
      <div  className="d-flex mt-5 justify-content-center" >
                    {new Array(4).fill(0).map((_,index) => (

                      <div className="mt-5 ml-2" key={index}>
<Skeleton width="270px" height="300px" borderRadius="6px"  backgroundColor="#ECECEC"/>
                      </div>
                    ))}
                   </div>
                   </>)
                   }
    </div>
    </div>
  );
};

export default Author;
