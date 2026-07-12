import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useParams } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems";
import 'aos/dist/aos.css';

const Author = ({ userId }) => {
 
  const [collections, setCollections] = useState([]);
  const { authorId } = useParams();

  const fetchUserData = async () => {
    try {
      const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
      console.log(data)
      setCollections(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    window.scrollTo(0, 0);
  }, []);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState();

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
        if (isFollowing) {
          setFollowers(followers - 1); 
        } else {
          setFollowers(followers + 1); 
        }
      };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${collections.authorImage}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div data-aos="fade-up" className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div data-aos="fade-up" className="profile_avatar">
                      <img src={collections.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div data-aos="fade-up" className="profile_name">
                        <h4>
                          {collections.creatorName}
                          <span className="profile_username">@{collections.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div data-aos="fade-up" className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div data-aos="fade-up" className="profile_follower">{collections.followers + isFollowing} followers</div>
                      <Link onClick={handleFollowToggle} to="#" className="btn-main">
                      {isFollowing ? 'Unfollow' : 'Follow'}
                      </Link>
                    </div> 
                  </div>
                </div>
              </div>
              <div data-aos="fade-up" className="col-md-12"> 
                <div className="de_tab tab_simple"><AuthorItems collections={collections.nftCollection} authorImage={collections.authorImage} />
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
