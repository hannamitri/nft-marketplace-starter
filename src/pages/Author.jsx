import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";

const Author = () => {
  const [authorItems, setAuthorItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const webId = useParams();
  useEffect(() => {
    const fetchAuthorItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${webId.id}`,
        );
        if (response.data) {
          setAuthorItems(response.data);
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
                    <div className='profile_avatar'>
                      <img src={authorItems.authorImage} alt='' />

                      <i className='fa fa-check'></i>
                      <div className='profile_name'>
                        <h4>
                          Monica Lucas
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
                  </div>
                  <div className='profile_follow de-flex'>
                    <div className='de-flex-col'>
                      <div className='profile_follower'>
                        {authorItems.followers} followers
                      </div>
                      <Link to='#' className='btn-main'>
                        Follow
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
