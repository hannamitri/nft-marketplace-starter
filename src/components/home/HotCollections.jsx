import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [collections, setCollections] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );

        const data = response.data?.data || response.data || [];
        

        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };
  const skeletonItems = Array(4).fill(0);
 
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
            <Slider {...settings}>
              {loading
                ? skeletonItems.map((_, index) => (
                  <div key={index} style={{ padding: "10px" }}>
                    <div className="nft_coll">


                      <div className="skeleton-image"></div>


                      <div className="skeleton-row">
                        <div className="skeleton-avatar"></div>
                      </div>


                      <div className="skeleton-text title"></div>
                      <div className="skeleton-text subtitle"></div>

                    </div>
                  </div>
                ))
                :
                (collections || []).map((collection, index) => (
                  <div key={index} style={{ padding: "10px" }}>
                    <div className="nft_coll">

                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={collection.nftImage}
                            className="img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="pp-coll"
                            src={collection.authorImage}
                            alt=""
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
                ))
              }
            </Slider>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HotCollections;