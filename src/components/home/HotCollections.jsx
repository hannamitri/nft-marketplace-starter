import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import { Link, useParams} from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";


const HotCollections = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchHotCollections() {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections?userId=${id}`,
        );
        setPosts(data);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
    }
    fetchHotCollections();
  }, [id]);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      1024: { items: 4 },
    },
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

          {loading ? (
            <>
              
              {new Array(4).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-12"
                  key={`skeleton-${index}`}
                >
                  <div className="nft_coll" style={{ paddingBottom: "20px" }}>
                    <div className="nft_wrap">
                      <div
                        className="skeleton-loading"
                        style={{
                          width: "100%",
                          height: "200px", 
                          borderRadius: "8px",
                          backgroundColor: "#eee",
                        }}
                      ></div>
                    </div>

                    <div className="nft_coll_pp" style={{ zIndex: 2 }}>
                      <div
                        className="skeleton-loading"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          backgroundColor: "#eee",
                          border: "solid 4px #fff",
                        }}
                      ></div>
                    </div>

                    <div
                      className="nft_coll_info"
                      style={{ textAlign: "center", marginTop: "25px" }}
                    >
                      <div
                        className="skeleton-loading"
                        style={{
                          width: "60%",
                          height: "18px",
                          backgroundColor: "#eee",
                          borderRadius: "4px",
                          margin: "0 auto 8px auto",
                        }}
                      ></div>
                      
                      <div
                        className="skeleton-loading"
                        style={{
                          width: "40%",
                          height: "14px",
                          backgroundColor: "#eee",
                          borderRadius: "4px",
                          margin: "0 auto",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="col-lg-12">
              {posts.length > 0 && (
                <OwlCarousel className="owl-theme" {...options}>
                  {posts.map((post, index) => (
                    <div className="nft_coll" key={post.id || index}>
                      <div className="nft_wrap">
                        <Link to={`/item-details/${post.nftId || id}`}>
                          <img
                            src={post.nftImage}
                            className="lazy img-fluid"
                            alt={post.title || "NFT Image"}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${post.authorId || id}`}>
                          <img
                            className="lazy pp-coll"
                            src={post.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{post.title}</h4>
                        </Link>
                        <span>ERC-{post.code || "721"}</span>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;

