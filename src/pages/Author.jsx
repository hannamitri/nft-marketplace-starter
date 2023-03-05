import { useState, useEffect } from 'react';
import AuthorBanner from '../images/author_banner.jpg';
import AuthorItems from '../components/author/AuthorItems';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from '../components/UI/Skeleton';
import SkeletonCards from '../components/re-useable/SkeletonCards';

const Author = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState();
  const { authorId } = useParams();

  useEffect(() => {
    const fetchAuthor = async () => {
      const response = await axios(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      ).then((response) => response.data);
      setAuthor(response);
      setLoading(false);
    };
    fetchAuthor();
  }, [authorId]);

  const authorObj = {
    authorId: author?.authorId,
    authorImage: author?.authorImage,
  };

  const handleFollow = () => {
    isFollowing
      ? setAuthor((existingValues) => ({
          ...existingValues,
          followers: author.followers - 1,
        }))
      : setAuthor((existingValues) => ({
          ...existingValues,
          followers: author.followers + 1,
        }));
    setIsFollowing(!isFollowing);
  };

  return (
    <div id='wrapper'>
      <div className='no-bottom no-top' id='content'>
        <div id='top'></div>
        {loading ? (
          <Skeleton height={'360px'} width={'100vw'} />
        ) : (
          <section
            id='profile_banner'
            aria-label='section'
            className='text-light'
            data-bgimage='url(images/author_banner.jpg) top'
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>
        )}

        <section aria-label='section'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='d_profile de-flex'>
                  <div className='de-flex-col'>
                    <div className='profile_avatar'>
                      {loading ? (
                        <Skeleton
                          width={'150px'}
                          height={'150px'}
                          borderRadius={'50%'}
                        />
                      ) : (
                        <img src={author.authorImage} alt='' />
                      )}

                      <i className='fa fa-check'></i>
                      <div className='profile_name'>
                        <h4>
                          {loading ? (
                            <Skeleton height={'1.5rem'} width={'8rem'} />
                          ) : (
                            author.authorName
                          )}
                          <span className='profile_username'>
                            {loading ? (
                              <Skeleton height={'1rem'} width={'5rem'} />
                            ) : (
                              `@${author.tag}`
                            )}
                          </span>
                          <span id='wallet' className='profile_wallet'>
                            {loading ? (
                              <Skeleton height={'1rem'} width={'10rem'} />
                            ) : (
                              author.address
                            )}
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
                        {loading ? (
                          <Skeleton height={'1rem'} width={'2rem'} />
                        ) : (
                          author.followers
                        )}{' '}
                        followers
                      </div>
                      <Link to='#' className='btn-main' onClick={handleFollow}>
                        {isFollowing ? 'Following' : 'Follow'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-12'>
                <div className='de_tab tab_simple'>
                  {loading ? (
                    <SkeletonCards itemsAmount={1} />
                  ) : (
                    <AuthorItems
                      nftCollection={author.nftCollection.map((nft) =>
                        Object.assign(nft, authorObj)
                      )}
                      loading={loading}
                    />
                  )}
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
