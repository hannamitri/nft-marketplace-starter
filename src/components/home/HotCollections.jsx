import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HotCollections.css'; 
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init(); // Initialize AOS
    const fetchCollections = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  // Custom Arrow components
  const SamplePrevArrow = ({ className, style, onClick }) => (
    <div
      className={`${className} custom-arrow custom-prev`}
      style={{ ...style, display: "block", left: "-30px" }}
      onClick={onClick}
    >
      &#8592; {/* Left arrow symbol */}
    </div>
  );

  const SampleNextArrow = ({ className, style, onClick }) => (
    <div
      className={`${className} custom-arrow custom-next`}
      style={{ ...style, display: "block", right: "-30px" }}
      onClick={onClick}
    >
      &#8594; {/* Right arrow symbol */}
    </div>
  );

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up">Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <p className="text-center w-100">Loading collections...</p>
          ) : (
            <Slider
              dots={false}
              infinite={true}
              speed={500}
              slidesToShow={4}
              slidesToScroll={1}
              arrows={true}
              prevArrow={<SamplePrevArrow />}
              nextArrow={<SampleNextArrow />}
              responsive={[
                { breakpoint: 1024, settings: { slidesToShow: 3 } },
                { breakpoint: 768, settings: { slidesToShow: 2 } },
                { breakpoint: 480, settings: { slidesToShow: 1 } },
              ]}
            >
              {collections.map((item) => (
                <div key={item.id} data-aos="fade-up">
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt={item.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt={item.title}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>{item.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
