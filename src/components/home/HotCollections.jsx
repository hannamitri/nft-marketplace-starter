import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import AOS from 'aos';

const HotCollections = () => {
  const [collections, setCollections] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
    AOS.init();
  }, []);

  return (
    <section id="section-collections" className="no-bottom" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="250">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
            {loading ? (
              <>
                <div className="skeleton-container">
                  {/* Display multiple skeletons */}
                  {Array(10)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        width="100%"
                        height="150px"
                        borderRadius="8px"
                      />
                    ))}
                </div>
              </>
            ) : (
              <Slider
                className="owl-theme"
                loop
                nav
                key={loading}
                dots={false}
                margin={8}
                navText={["<", ">"]}
                responsive={{
                  0: { items: 1 },
                  572: { items: 2 },
                  992: { items: 3 },
                  1200: { items: 4 },
                }}
              >
                {collections.map((item) => (
                  <div
                    key={item.id}
                    style={{ width: "100%", maxWidth: "100%", padding: "0" }}
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={item.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <span>ERC-{item.code}</span>
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
