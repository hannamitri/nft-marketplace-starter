import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Aos from "aos";

const Author = () => {
  const [items, setItems] = useState([]);
  const [authorCollection, setAthorCollection] = useState([]);
  const {authorId} = useParams();
  const [loading, setloading] = useState(true);
 

  async function getData() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
    setItems(data)
    setAthorCollection(data.nftCollection)
    
  }
  function updateFollowers() {
    if(document.querySelector(".follow-btn").innerHTML === "Follow") {
      items.followers += 1;
      document.querySelector(".follow-btn").innerHTML = "Unfollow"
    }else {
      items.followers -= 1;
      document.querySelector(".follow-btn").innerHTML = "Follow"
    }
   
  }
  
  useEffect(() => {
    setTimeout(() => {
      setloading(false)
    }, 3000);
    getData();
    Aos.init();
  }, [])




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
              <div className="col-md-12" data-aos="fade-up"
    data-aos-duration="1000" data-aos-delay="500">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={items?.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {items?.authorName}
                          <span className="profile_username">@{items?.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {items?.address}
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
                      <div className="profile_follower">{items?.followers} followers</div>
                      <Link to="#" className="btn-main follow-btn" onClick={updateFollowers}>
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorCollections={authorCollection} items={items} loading={loading} />
                  
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
