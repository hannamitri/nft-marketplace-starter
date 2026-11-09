import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";

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
  }, []);

  if (loading) {
    return (
      <div className="skeleton-container">
        {/* Display multiple skeletons */}
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              width="100px"
              height="150px"
              borderRadius="8px"
            />
          ))}
      </div>
    );
  }

  // Slick Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Show 6 items per slide
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {collections.map((item) => (
        <div className="nft_coll" key={item.id}>
          <Link to={`/item-details/${item.nftId}`}>
            <img
              src={item.nftImage}
              className="lazy img-fluid"
              alt={item.title}
            />
          </Link>
          <div className="nft_coll_info">
            <Link to={`/author/${item.authorId}`}>
              <img
                className="lazy pp-coll"
                src={item.authorImage}
                alt={item.title}
              />
            </Link>
            <h4>{item.title}</h4>
            <span>{item.code}</span>
          </div>
        </div>
      ))}
    </Slider>
  );
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
        {collections.map((collection, index) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
            <div className="nft_coll">
              <div className="nft_wrap">
                <Link to={`/item-details/${collection.nftId}`}>
                  <img
                    src={collection.image}
                    className="lazy img-fluid"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft_coll_pp">
                <Link to={`/author/${collection.authorId}`}>
                  <img className="lazy pp-coll" src={AuthorImage} alt="" />
                </Link>
                <i className="fa fa-check"></i>
              </div>
              <div className="nft_coll_info">
                <Link to={`/collection/${collection.nftId}`}>
                  <h4>{collection.name}</h4>
                </Link>
                <span>ERC-192</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HotCollections;
