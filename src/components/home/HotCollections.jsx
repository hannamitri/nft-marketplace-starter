import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [hotCollectionsData, setHotCollectionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate backend data fetching
  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const collectionsData = [
    {
      id: 1,
      title: "Abstraction",
      authorId: 1,
      authorName: "Artist One",
      authorImage: AuthorImage,
      image: nftImage,
      code: "721"
    },
    {
      id: 2,
      title: "Pinky Ocean",
      authorId: 2,
      authorName: "Artist Two",
      authorImage: AuthorImage,
      image: nftImage,
      code: "192"
    },
    {
      id: 3,
      title: "Digital Dreams",
      authorId: 3,
      authorName: "Artist Three",
      authorImage: AuthorImage,
      image: nftImage,
      code: "721"
    },
    {
      id: 4,
      title: "Cosmic Art",
      authorId: 4,
      authorName: "Artist Four",
      authorImage: AuthorImage,
      image: nftImage,
      code: "1155"
    },
    {
      id: 5,
      title: "Neon Waves",
      authorId: 5,
      authorName: "Artist Five",
      authorImage: AuthorImage,
      image: nftImage,
      code: "721"
    },
    {
      id: 6,
      title: "Cyber Punk",
      authorId: 6,
      authorName: "Artist Six",
      authorImage: AuthorImage,
      image: nftImage,
      code: "1155"
    },
    {
      id: 7,
      title: "Galaxy Quest",
      authorId: 7,
      authorName: "Artist Seven",
      authorImage: AuthorImage,
      image: nftImage,
      code: "721"
    },
    {
      id: 8,
      title: "Pixel Art",
      authorId: 8,
      authorName: "Artist Eight",
      authorImage: AuthorImage,
      image: nftImage,
      code: "192"
    },
    {
      id: 9,
      title: "Future Vision",
      authorId: 9,
      authorName: "Artist Nine",
      authorImage: AuthorImage,
      image: nftImage,
      code: "721"
    },
    {
      id: 10,
      title: "Digital Realm",
      authorId: 10,
      authorName: "Artist Ten",
      authorImage: AuthorImage,
      image: nftImage,
      code: "1155"
    },
    {
      id: 11,
      title: "Crypto Dreams",
      authorId: 11,
      authorName: "Artist Eleven",
      authorImage: AuthorImage,
      image: nftImage,
      code: "721"
    },
    {
      id: 12,
      title: "Meta Universe",
      authorId: 12,
      authorName: "Artist Twelve",
      authorImage: AuthorImage,
      image: nftImage,
      code: "192"
    }
      ];
      
      setHotCollectionsData(collectionsData);
      setIsLoading(false);
    };

    fetchCollections();
  }, []);

  // Skeleton loading component
  const SkeletonCard = () => (
    <div className='item'>
      <div className="nft_coll">
        <div className="nft_wrap">
          <div className="skeleton-image" style={{
            width: '100%',
            height: '200px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            animation: 'pulse 1.5s ease-in-out infinite alternate'
          }}></div>
        </div>
        <div className="nft_coll_pp">
          <div className="skeleton-avatar" style={{
            width: '50px',
            height: '50px',
            backgroundColor: '#f0f0f0',
            borderRadius: '50%',
            animation: 'pulse 1.5s ease-in-out infinite alternate'
          }}></div>
        </div>
        <div className="nft_coll_info">
          <div className="skeleton-title" style={{
            width: '80%',
            height: '20px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
            marginBottom: '8px',
            animation: 'pulse 1.5s ease-in-out infinite alternate'
          }}></div>
          <div className="skeleton-category" style={{
            width: '60%',
            height: '16px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
            animation: 'pulse 1.5s ease-in-out infinite alternate'
          }}></div>
        </div>
      </div>
    </div>
  );


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <OwlCarousel 
              className='owl-theme' 
              loop={!isLoading && hotCollectionsData.length > 4} 
              margin={10} 
              nav 
              responsive={{
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 4 }
              }}
              key={isLoading ? 'loading' : 'loaded'}
            >
              {isLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonCard key={`skeleton-${index}`} />
                ))
              ) : (
                hotCollectionsData && hotCollectionsData.length > 0 ? (
                  hotCollectionsData.map((collection, index) => (
                    <div className='item' key={`collection-${index}`}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${collection.id}`}>
                            <img src={collection.image} className="lazy img-fluid" alt={collection.title} />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${collection.authorId}`}>
                            <img className="lazy pp-coll" src={collection.authorImage} alt={collection.authorName} />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{collection.title}</h4>
                          </Link>
                          <span>ERC-{collection.code}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='item'>
                    <div>No collections available</div>
                  </div>
                )
              )}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
