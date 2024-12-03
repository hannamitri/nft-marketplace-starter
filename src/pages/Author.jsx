import React, { useEffect,useState} from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {

  const [getdata,setGetData] = useState([])
  const [Follow,setFollow] = useState(false)
  const [number,Setnumber] = useState(0)
  const [profile,setProfile] = useState()
  const [loading,setLoading] = useState(true)
  const { id } = useParams();
  
  useEffect(()=>{
     async function GetData(id){
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
    setGetData(data)
    setProfile(data.authorImage)
    setLoading(false)
  }
  GetData(id)
},[id])

function Followed(){
  setFollow(true)
  Setnumber(1)
}

function NotFollowed(){
  setFollow(false)
  Setnumber(0)
}

console.log(getdata)

if(loading){
  return(
    <div id="wrapper">
    <div className="no-bottom no-top" id="content">
      <div id="top"></div>

      <section
        id="profile_banner"
        aria-label="section"
        className="text-light"
        data-bgimage="url(images/author_banner.jpg) top"
        style={{ background:"gray"}}
      ></section>

      <section aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <div className="profile_avatar">
                  <div className="gray" style={{height:"6rem",width:"6rem",borderRadius:"50%"}}></div>

                    <div className="profile_name">
                      <h4>
                      <div className="gray-background-nameauthor" style={{ marginBottom: "1rem",width:"10rem" }}></div>

                      <div className="gray-background-nameauthor" style={{ marginBottom: "1rem",width:"8rem" }}></div>
                      <div className="gray-background-nameauthor" style={{ marginBottom: "1rem",width:"14rem" }}></div>

                        <button id="btn_copy" title="Copy Text">
                          Copy
                        </button>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="profile_follow de-flex">
                  <div className="de-flex-col">
                  <div className="gray-background-nameauthor" style={{width:"8rem",marginRight:"1rem" }}></div>
                    
                    
                  <div className="gray-background-nameauthor" style={{width:"7rem",height:"3rem",marginRight:"1rem" }}></div>
                    
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="de_tab tab_simple">
                <AuthorItems profile={profile}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  )
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
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={getdata.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                        {getdata.authorName}
                          <span className="profile_username">@{getdata.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {getdata.address}
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
                      <div className="profile_follower">{getdata.followers + number} followers</div>
                      
                      
                       {Follow ? <button onClick={NotFollowed} className="btn-main">Unfollow</button> : <button onClick={Followed} className="btn-main" >Follow</button>} 
                      
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems profile={profile}/>
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
