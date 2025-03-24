import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import hotCollectionsService from 'services/hotCollectionsService';
import SkeletonCard from 'components/common/SkeletonCard';
import '../../css/customSlider.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import NavButton from '../common/NavButton';


const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sliderRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await hotCollectionsService.getHotCollections();
        setHotCollections(response.data);
      } catch (err) {
        setError("Something went wrong while fetching collections.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
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
  
        {/* Slider wrapper */}
        <div className="col-lg-12 relative">
  {/* Arrows positioned absolutely over slider */}
  <NavButton
    direction="left"
    onClick={() => sliderRef.current.slickPrev()}
    onHold={() => sliderRef.current.slickPrev()}
    bgColor="bg-purple-600"
    shape="rounded-xl"
    offset="10px"
    iconSize={24}
  />
  <NavButton
    direction="right"
    onClick={() => sliderRef.current.slickNext()}
    onHold={() => sliderRef.current.slickNext()}
    bgColor="bg-purple-600"
    shape="rounded-xl"
    offset="10px"
    iconSize={24}
  />
  
          {/* Slider */}
          {loading ? (
            <Slider ref={sliderRef} {...sliderSettings}>
              {new Array(4).fill(0).map((_, index) => (
                <div key={index}>
                  <SkeletonCard />
                </div>
              ))}
            </Slider>
          ) : (
            <Slider ref={sliderRef} {...sliderSettings}>
              {hotCollections.map((collection) => (
                <div key={collection.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                    <Link to={`/item/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt={collection.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt={collection.title}
                        />
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
