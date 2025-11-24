import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const CollectionSkeleton = ()=>{
  return (
    <div className="nft_coll">
      <div className="nft_wrap">
        <Skeleton height={200} />
      </div>
      <div className="nft_coll_pp">
        <Skeleton circle width={50} height={50} />
      </div>
      <div className="nft_coll_info">
        <Skeleton width={150} height={20} style={{marginBottom: '8px'}} />
        <Skeleton width={100} height={15} />
      </div>
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div 
      className="custom-arrow custom-next" 
      onClick={onClick}
      style={{
        position: 'absolute',
        right: '-40px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 10,
        fontSize: '20px',
        color: '#333'
      }}
    >
      <i className="fa fa-chevron-right"></i>
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div 
      className="custom-arrow custom-prev" 
      onClick={onClick}
      style={{
        position: 'absolute',
        left: '-40px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 10,
        fontSize: '20px',
        color: '#020202ff'
      }}
    >
      <i className="fa fa-chevron-left"></i>
    </div>
  );
};

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections'
        );
        setCollections(response.data);
      } catch (error) {
        console.error('Error fetching collections:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

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
            {loading ? (
              <Slider {...settings}>
                {new Array(8).fill(0).map((_, index) => (
                  <div key={index} className="px-2">
                    <CollectionSkeleton />
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider {...settings}>
                {collections.map((collection, index) => (
                  <div key={index} className="px-2">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img 
                            src={collection.nftImage || nftImage} 
                            className="lazy img-fluid" 
                            alt={collection.title || "NFT"} 
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img 
                            className="lazy pp-coll" 
                            src={collection.authorImage || AuthorImage} 
                            alt={collection.authorName || "Author"} 
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title || "Pinky Ocean"}</h4>
                        </Link>
                        <span>{collection.code || "ERC-192"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
