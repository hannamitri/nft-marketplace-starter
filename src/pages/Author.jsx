import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {

   const [loading, setLoading] = useState()
  const [api, setApi] = useState([]);
  const {id} = useParams(api.authorId)
  const [follow, setFollow] = useState(false)


function handleFollow(){
setFollow(true)

}


 useEffect(() => {
        fetchApi();
    }, []);
    

    async function fetchApi() {
    setLoading(true)
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setApi(data);
    
    setLoading(false)
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
                      <img src={api.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {api.authorName}
                          <span className="profile_username">{api.tag}</span>
                          <span id="wallet" className="profile_wallet">
                           {api.address}
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
                      {follow? <div className="profile_follower">{api.followers +1} followers</div>
                      :
                      <div className="profile_follower">{api.followers} followers</div>}
                     { follow ?
                      <button className="btn-main">
                        Unfollow
                      </button>
                     :
                     <button onClick={()=> handleFollow()} className="btn-main">
                        Follow
                      </button>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
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
