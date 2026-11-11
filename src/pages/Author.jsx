import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [authorItems, setAuthorItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const webId = useParams();
  const [follow, setFollow] = useState(true);
  const [follow1, setFollow1] = useState("Follow");
  const [followCount, setFollowCount] = useState(0);

  const handleClick = (e) => {
    e.preventDefault();
    if (follow === true) {
      setFollow(false);
      setFollow1("Unfollow");
      setFollowCount(followCount + 1);
    } else {
      setFollow(true);
      setFollow1("Follow");
      setFollowCount(followCount - 1);
    }
  };

  useEffect(() => {
    const fetchAuthorItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${webId.id}`,
        );
        if (response.data) {
          setAuthorItems(response.data);
          setFollow1("Follow");
          setFollow(true);
          setFollowCount(response.data.followers || 0);
        } else {
          setAuthorItems([]);
        }
      } catch (error) {
        console.error("Error fetching Author items:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchAuthorItems();
  }, [webId.id]);

  return (
    <div id='wrapper'>
      <div className='no-bottom no-top' id='content'>
        <div id='top'></div>

        <section
          id='profile_banner'
          aria-label='section'
          className='text-light'
          data-bgimage='url(images/author_banner.jpg) top'
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label='section'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='d_profile de-flex'>
                  <div className='de-flex-col'>
                    {loading ? (
                      <>
                        <Skeleton width='150px' height='150px' borderRadius='50%' />
                        <div style={{ marginTop: '15px' }}>
                          <Skeleton width="180px" height="25px" />
                          <Skeleton width="100px" height="20px" style={{ marginTop: '10px' }} />
                          <Skeleton width="100px" height="20px" style={{ marginTop: '10px' }} />
                        </div>
                      </>
                    ) : (
                      <div className='profile_avatar'>
                        <img src={authorItems.authorImage} alt='' />

                        <i className='fa fa-check'></i>
                        <div className='profile_name'>
                          <h4>
                            {authorItems.authorName }
                            <span className='profile_username'>
                              {authorItems.tag}
                            </span>
                            <span id='wallet' className='profile_wallet'>
                              {authorItems.address}
                            </span>
                            <button id='btn_copy' title='Copy Text'>
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='profile_follow de-flex'>
                    <div className='de-flex-col'>
                      <div className='profile_follower'>
                        {followCount} followers
                      </div>
                      <Link
                        to='#'
                        onClick={handleClick}
                        className='btn-main'
                      >
                        {follow1}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-12'>
                <div className='de_tab tab_simple'>
                  <AuthorItems
                    authorImage={authorItems.authorImage}
                    collection={authorItems.nftCollection || []}
                    loading={loading}
                  />
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
