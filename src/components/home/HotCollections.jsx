import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Import Slider from react-slick
import "slick-carousel/slick/slick.css"; // Import slick-carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick-carousel theme CSS
import './HotCollections.css'; // Import the CSS file


const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <p className="text-center w-100">Loading collections...</p>
          ) : (
            <Slider
              dots={false} // Disable dots navigation
              infinite={true} // Infinite scroll
              speed={500} // Animation speed
              slidesToShow={4} // Show 4 cards at a time
              slidesToScroll={1} // Scroll 1 card at a time
              arrows={true} // Enable arrows navigation
              prevArrow={<SamplePrevArrow />} // Custom previous arrow
              nextArrow={<SampleNextArrow />} // Custom next arrow
              responsive={[
                {
                  breakpoint: 1024,
                  settings: { slidesToShow: 3 }, // 3 cards on medium screens
                },
                {
                  breakpoint: 768,
                  settings: { slidesToShow: 2 }, // 2 cards on small screens
                },
                {
                  breakpoint: 480,
                  settings: { slidesToShow: 1 }, // 1 card on extra small screens
                },
              ]}
            >
              {collections.map((item) => (
                <div key={item.id}>
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
