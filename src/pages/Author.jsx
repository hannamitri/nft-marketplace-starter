import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AuthorItems from '../components/author/AuthorItems'
import axios from 'axios'
import Skeleton from '../components/UI/Skeleton'
import AuthorBanner from '../images/author_banner.jpg'

const Author = () => {
  const { authorId } = useParams()
  const [items, setItems] = useState([])
  const [dataIsLoaded, setDataIsLoaded] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    axios
      .get(
        'https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=' +
          authorId
      )
      .then(res => {
        setItems(res.data)
        setDataIsLoaded(true)
      })
  }, [authorId])

  const handleFollowClick = e => {
    e.preventDefault()
    if (isFollowing) {
      setItems(prevItems => ({
        ...prevItems,
        followers: prevItems.followers - 1
      }))
    } else {
      setItems(prevItems => ({
        ...prevItems,
        followers: prevItems.followers + 1
      }))
    }
    setIsFollowing(!isFollowing)
  }

  if (!dataIsLoaded) {
    return (
      <div id='wrapper'>
        <div className='no-bottom no-top' id='content'>
          <div id='top'></div>

          <section
            id='profile_banner'
            aria-label='section'
            className='text-light'
          >
            <Skeleton width='100%' height='200px' borderRadius='0' />
          </section>

          <section aria-label='section'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='d_profile de-flex'>
                    <div className='de-flex-col'>
                      <div className='profile_avatar'>
                        <Skeleton
                          width='100px'
                          height='100px'
                          borderRadius='50%'
                        />
                        <div
                          className='profile_name'
                          style={{ marginTop: '15px' }}
                        >
                          <Skeleton
                            width='200px'
                            height='25px'
                            borderRadius='5px'
                          />
                          <div style={{ marginTop: '10px' }}>
                            <Skeleton
                              width='150px'
                              height='18px'
                              borderRadius='5px'
                            />
                          </div>
                          <div style={{ marginTop: '10px' }}>
                            <Skeleton
                              width='300px'
                              height='18px'
                              borderRadius='5px'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='profile_follow de-flex'>
                      <div className='de-flex-col'>
                        <Skeleton
                          width='100px'
                          height='40px'
                          borderRadius='5px'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-md-12'>
                  <div className='de_tab tab_simple'>
                    <div className='row' style={{ marginTop: '40px' }}>
                      {new Array(4).fill(0).map((_, index) => (
                        <div
                          key={index}
                          className='col-lg-3 col-md-6 col-sm-6 col-xs-12'
                        >
                          <div className='nft__item'>
                            <Skeleton
                              width='100%'
                              height='250px'
                              borderRadius='10px'
                            />
                            <div style={{ marginTop: '15px' }}>
                              <Skeleton
                                width='70%'
                                height='20px'
                                borderRadius='5px'
                              />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                              <Skeleton
                                width='50%'
                                height='18px'
                                borderRadius='5px'
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
    <div id='wrapper'>
      <div className='no-bottom no-top' id='content'>
        <div id='top'></div>

        <section
          id='profile_banner'
          aria-label='section'
          className='text-light'
          data-bgimage='url(images/author_banner.jpg) top'
          style={{ backgroundImage: `url(${AuthorBanner})` }}
        ></section>

        <section aria-label='section'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='d_profile de-flex'>
                  <div className='de-flex-col'>
                    <div className='profile_avatar'>
                      <img src={items.authorImage} alt='' />

                      <i className='fa fa-check'></i>
                      <div className='profile_name'>
                        <h4>
                          {items.authorName}
                          <span className='profile_username'>@{items.tag}</span>
                          <span id='wallet' className='profile_wallet'>
                            {items.address}
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
                        {items.followers} followers
                      </div>
                      <Link
                        to='#'
                        className='btn-main'
                        onClick={handleFollowClick}
                      >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-12'>
                <div className='de_tab tab_simple'>
                  <AuthorItems />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Author
