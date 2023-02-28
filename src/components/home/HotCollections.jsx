import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchCollections(id) {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchCollections();
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);

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
          <OwlCarousel
            classID="owl-theme"
            margin={10}
            items={4}
            nav={true}
            dots={false}
            responsive={{
              0: {
                items: 1,
              },
              500: {
                items: 1,
              },
              600: {
                items: 2,
              },
              1000: {
                items: 4,
              },
            }}
          >
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div key={index} className="ml-3 grid md:cols-3 sm:cols-2">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <img className="lazy img-fluid--skeleton" alt="" />
                      </div>
                      <div className="nft_coll_pp">
                        <img className="lazy pp-coll--skeleton" alt="" />
                      </div>
                      <div className="nft_coll_thumbnail--skeleton"></div>
                      <i className="fa fa-check skeleton-check"></i>
                      <div className="nft_coll_title--skeleton"></div>
                      <div className="nft_coll_subTitle--skeleton"></div>
                    </div>
                  </div>
                ))
              : posts.map((posts) => (
                  <div className="ml-3 grid md:cols-3 sm:cols-2" key={posts.id}>
                    <div className="nft_coll">
                      <div
                        className="nft_wrap"
                        onClick={() => navigate(`${posts.id}`)}
                      >
                        <img
                          onClick={() => navigate(`${posts.id}`)}
                          src={posts.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={posts.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check "></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{posts.title}</h4>
                        </Link>
                        <span>ERC-192</span>
                      </div>
                    </div>
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};
export default HotCollections;
