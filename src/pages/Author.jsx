import React, {useEffect, useState} from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState([])
  const [followState, setFollowState] = useState(false)


  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
      );
      setData(data);
      setLoading(false);
      setFollowers(data.followers)
    }
    fetchData();
  }, []);
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
              {
                loading
                ?
                (<div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <Skeleton width='150px' height='150px' borderRadius='50%'/>
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          <Skeleton width='200px'/>
                          <span className="profile_username">
                          <Skeleton width='100px'/>
                          </span>
                          <span id="wallet" className="profile_wallet">
                            <Skeleton width='250px'/>
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        <Skeleton width='150px' height='40px'/>
                      </div>
                    </div>
                  </div>
                </div>
                </div>)
                :

              (<div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={data.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {data.authorName}
                          <span className="profile_username">@{data.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {data.address}
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
                        {
                          followState 
                          ?
                          <Link to="#" className="btn-main" onClick={() => {setFollowers((prev) => prev - 1); setFollowState(false)}}>Unfollow</Link>
                          :
                          <Link to="#" className="btn-main" onClick={() => {setFollowers((prev) => prev + 1); setFollowState(true)}}>Follow</Link>
                      }
                    </div>
                  </div>
                </div>
              </div>)
              }

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems data={data} loading={loading}/>
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
